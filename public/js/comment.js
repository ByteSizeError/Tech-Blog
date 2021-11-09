// Handles comment creations
const commentFormHandler = async (event) => {
    event.preventDefault();

    // Gets the value of the comment from the user input field
    const content = document.querySelector("#comment").value.trim();

    // Get the id from the post using the url
    const post_id = window.location.href.split("/").pop();

    // If either is missing don't continue
    if (content && post_id) {
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({ content, post_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace(`/posts/${post_id}`);
        } else {
            alert("Failed to create comment");
        }
    }
};

// Handles comment updates
const updateCommentHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.href.split("/").pop();

    const id = event.target.id.split("-").pop();

    const content = document.querySelector(`#content-${id}`).value.trim();

    if (content) {
        const response = await fetch(`/api/comments/${id}`, {
            method: "PUT",
            body: JSON.stringify({ content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace(`/posts/${postId}`);
        } else {
            alert("Failed to update comment");
        }
    }
};

// Handles comment deletes
const deleteCommentHandler = async (event) => {
    event.preventDefault();

    // Get the post id from the url
    const postId = window.location.href.split("/").pop();

    // Get the id of the comment from the id name
    const id = event.target.id.split("-").pop();

    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        // If the response was ok go back to the post page
        document.location.replace(`/posts/${postId}`);
    } else {
        alert("Failed to delete comment");
    }
};

document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);

// Finds all the update buttons and add event listeners to each
const updates = document.querySelectorAll(".update-comment");
updates.forEach((el) => el.addEventListener("click", updateCommentHandler));

// Finds all the delete buttons and add event listeners to each
const deletes = document.querySelectorAll(".delete-comment");
deletes.forEach((el) => el.addEventListener("click", deleteCommentHandler));
