const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      location.replace("/dashboard");
    } else {
      alert("Invalid Input");
    }
  } else {
    alert("Post title and content cannot leave empty.");
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
