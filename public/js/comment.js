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

document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);
