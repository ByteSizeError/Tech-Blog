// Handles post edits
const updateFormHandler = async (event) => {
    event.preventDefault();

    // Get the users input for title and content
    const title =
        document.querySelector("#title-edit").value.trim() ||
        document.querySelector("#title-edit").placeholder.trim();
    const content =
        document.querySelector("#content-edit").value.trim() ||
        document.querySelector("#content-edit").placeholder.trim();

    // Get the post id from the url
    const id = window.location.href.split("/").pop();

    // If either title or content missing stop
    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to update post");
        }
    }
};

// Handles form deletes
const deleteFormHandler = async (event) => {
    event.preventDefault();

    // Get the id of the post from the url
    const id = window.location.href.split("/").pop();

    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        // Response ok go back to dashboard
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete post");
    }
};

document
    .querySelector(".edit-form")
    .addEventListener("submit", updateFormHandler);

document
    .querySelector("#delete-form")
    .addEventListener("click", deleteFormHandler);
