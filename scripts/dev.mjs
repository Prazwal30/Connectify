import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const repoDir = path.resolve(rootDir, "..");

const commands = [
  { name: "backend", cwd: "backend", args: ["run", "dev"] },
  { name: "frontend", cwd: "forntend", args: ["run", "dev"] },
];

const children = commands.map(({ name, cwd, args }) => {
  const command = process.platform === "win32" ? process.env.ComSpec : "npm";
  const commandArgs =
    process.platform === "win32" ? ["/d", "/s", "/c", "npm", ...args] : args;

  const child = spawn(command, commandArgs, {
    cwd: path.join(repoDir, cwd),
    stdio: "inherit",
    shell: false,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`${name} stopped by ${signal}`);
      return;
    }

    if (code !== 0) {
      console.log(`${name} exited with code ${code}`);
      process.exitCode = code;
      stopAll();
    }
  });

  return child;
});

function stopAll() {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
}

process.on("SIGINT", () => {
  stopAll();
  process.exit();
});

process.on("SIGTERM", () => {
  stopAll();
  process.exit();
});
