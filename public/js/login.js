// Handles the login for users
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Get the username and password from the user
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });

        // If response ok go to the homepage
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to log in");
        }
    }
};

document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
