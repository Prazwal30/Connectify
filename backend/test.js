const BASE_URL = "http://localhost:3001";

async function check(name, condition) {
    if (!condition) {
        throw new Error(`${name} failed`);
    }
    console.log(`${name} passed`);
}

const health = await fetch(`${BASE_URL}/api/health`);
const healthData = await health.json();
await check("health route", health.status === 200 && healthData.message === "OK");

const signin = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
});
const signinData = await signin.json();
await check(
    "signin validation",
    signin.status === 400 && signinData.message === "Please provide all required fields",
);

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

const onboarding = await fetch(`${BASE_URL}/api/auth/onboarding`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
});
const onboardingData = await onboarding.json();
await check(
    "onboarding authentication",
    onboarding.status === 401 && onboardingData.message === "Unauthorized: No token provided",
);
