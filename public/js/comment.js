const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector("#comment").value.trim();

    const post_id = window.location.href.split("/").pop();

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

const deleteCommentHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.href.split("/").pop();

    const id = event.target.id.split("-").pop();

    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace(`/posts/${postId}`);
    } else {
        alert("Failed to delete comment");
    }
};

document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);

const updates = document.querySelectorAll(".update-comment");
updates.forEach((el) => el.addEventListener("click", updateCommentHandler));

const deletes = document.querySelectorAll(".delete-comment");
deletes.forEach((el) => el.addEventListener("click", deleteCommentHandler));
