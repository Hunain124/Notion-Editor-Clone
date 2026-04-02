const authForm = document.querySelector("#auth-form");
const authOverlay = document.querySelector("#auth-overlay");
const appContainer = document.querySelector(".app-container");

// Elements for Toggle
const authTitle = document.querySelector("#auth-title");
const authBtn = document.querySelector("#auth-btn");
const toggleAuthLink = document.querySelector("#toggle-auth");
const toggleMsg = document.querySelector("#toggle-msg");

let isLoginMode = true; // Track if we are in Login or Signup mode

// --- 1. TOGGLE LOGIC (Login <-> Signup) ---
toggleAuthLink.addEventListener("click", (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode; // Mode badlo

    if (isLoginMode) {
        authTitle.innerText = "System Access";
        authBtn.innerText = "Initialize Session";
        toggleMsg.innerText = "Don't have an account?";
        toggleAuthLink.innerText = "Create Identity";
    } else {
        authTitle.innerText = "Create Identity";
        authBtn.innerText = "Register System";
        toggleMsg.innerText = "Already have an account?";
        toggleAuthLink.innerText = "Login Instead";
    }
});

// --- 2. AUTH SUBMIT LOGIC ---
authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Checking Mode:", isLoginMode ? "LOGIN" : "SIGNUP");
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!email || password.length < 6) {
        alert("Enter Right Password min 6 chars!");
        return;
    }

    // Call the backend function
    await handleAuth(isLoginMode, email, password);
});

// --- 3. BACKEND API CALL ---
const handleAuth = async (isLogin, email, password) => {
    const endpoint = isLogin ? "/api/login" : "/api/signup";

    try {
        const res = await fetch(`http://localhost:5000${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            if (!isLogin) {
                alert("Account Created! Login Now");
                window.location.reload(); 
            } else {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userEmail", email);
                window.location.reload(); 
            }
        } else {
            alert(data.message || "Credential error!");
        }
    } catch (err) {
        console.error(err);
        alert("Server is closed connect it first");
    }
};

// --- 4. LOGOUT LOGIC ---
const logoutBtn = document.querySelector("#logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        if (confirm("Finished the Session?")) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");
            window.location.reload();
        }
    });
}