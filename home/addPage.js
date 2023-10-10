const titleInput = document.querySelector("#title");
const messageInput = document.querySelector("#message");
const imageInput = document.querySelector("#image_input");
const saveBtn = document.querySelector(".save_btn");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const edit = urlParams.get("edit");
let posts;


window.addEventListener("DOMContentLoaded", async () => {
   const response = await fetch("http://localhost:4010/", {
     method: "GET",
     headers: { "Content-Type": "application/json" },
   });
   posts = await response.json();
  if (id && !edit) {
    const response = await fetch(`http://localhost:4010/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const post = await response.json();
      titleInput.value = post.title;
      messageInput.value = post.message;
    } else {
      console.log("Post error:", json);
      swal("Post failed. Please try again.");
    }
  }
  });

// hadnles adding posts
saveBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const message = messageInput.value.trim();

  try{
    if(imageInput.files[0] === undefined){
      swal("Please upload an image for your post.");
      return;
    }
    if(imageInput.files[0].type !== "image/jpeg" && imageInput.files[0].type !== "image/png"){
      swal("Please upload a valid image file.");
      return;
    }
    if (title === "" || title.length < 3) {
      swal("Please enter a title with at least 3 characters");
      return;
    }
    if (message === "" || message.length < 10) {
      swal("Please a longer message.");
      return;
    }
    const imageurl = imageInput.files[0].name.trim();
    if(id && edit){
      const response = await fetch(`http://localhost:4010/editPost/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, message }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const index = posts.findIndex(post => post.id === id);
      posts[index]= data;
      
      if (response.ok) {
        window.location.href = "/home/index.html";
      } else {
        const json = await response.json();
        console.log("Post error:", json);
        swal("Post failed. Please try again.");
      }
      return;
    }
    const response = await fetch("http://localhost:4010/addPost", {
      method: "POST",
      body: JSON.stringify({ title, message, imageurl }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/home/index.html";
    } else {
      const json = await response.json();
      console.log("Post error:", json);
      swal("Post failed. Please try again.");
    }
  } catch(err){
    console.log(err);
  }
  
}
)





