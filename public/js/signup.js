// Handles the users sign up
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Get user name and password from user
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // If something missing don't go in
    if (username && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to sign up");
        }
    }
};

document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
