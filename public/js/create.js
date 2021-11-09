// Handles post creations
const createFormHandler = async (event) => {
    event.preventDefault();

    // Get the title and contents of the user input
    const title = document.querySelector("#title-create").value.trim();
    const content = document.querySelector("#content-create").value.trim();

    // If either are empty don't enter
    if (title && content) {
        const response = await fetch("/api/posts/", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            // If response was ok go back to dashboard
            document.location.replace("/dashboard");
        } else {
            alert("Failed to create post");
        }
    }
};

document
    .querySelector(".create-form")
    .addEventListener("submit", createFormHandler);
