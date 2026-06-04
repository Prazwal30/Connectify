const BASE_URL = "http://localhost:3001";

async function check(name, condition) {
    if (!condition) {
        throw new Error(`${name} failed`);
    }
    console.log(`${name} passed`);
}

const signin = await fetch(`${BASE_URL}/api/auth/signin`);
await check("signin route", signin.status === 200 && await signin.text() === "signin route");

const login = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
});
const loginData = await login.json();
await check("login validation", login.status === 400 && loginData.message === "Please provide email and password");

const logout = await fetch(`${BASE_URL}/api/auth/logout`, { method: "POST" });
const logoutData = await logout.json();
await check("logout route", logout.status === 200 && logoutData.message === "Logged out successfully");
