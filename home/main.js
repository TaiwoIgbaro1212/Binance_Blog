let myIndex = 0;
carousel();


function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 3000); // Change image every 2 seconds
}

const buttonGroup = `  
            <div class="button-group">
              <span><a href="#" class="btn btn-primary">Read More</a></span>
              <span class="dropdown-menu-xl-end fa-bezier-curve">
                <button
                  class="btn btn-primary  dropdown-toggle hidden-arrow bg-dark"
                  type="button"
                  id="dropdownMenuButton2"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v fa-lg"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li>
                    <a class="dropdown-item" href="addPage.html">
                      <i class="fas fa-edit pe-2"></i>Edit</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <i class="fas fa-delete-left pe-2"></i>Delete</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <i class="fas fa-door-open pe-2"></i>Logout</a
                    >
                  </li>
                </ul>
              </span>
          </div>`;


  const modifiedMessage = (message) =>{
    const firstPeriodIndex = message.indexOf(".");
    if (firstPeriodIndex !== -1) {
      const cutString = message.substring(0, firstPeriodIndex + 1);
      return cutString;
    } else {
      return message;
    }
  }

  const editPosts = (id) => {
    window.location.href = `/home/addPage.html?id=${id}?edit=true`;
  }

  const detailPosts = (id) => {
    window.location.href = `/home/addPage.html?id=${id}?edit=false`;
  }

  // getting all posts from database
  window.addEventListener("DOMContentLoaded", async () => {
    

  try {
    const response = await fetch("http://localhost:4010/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const posts = await response.json();
      posts.forEach((post) => {
        const cardContainer = document.querySelector(".card-group");
        cardContainer.innerHTML += `
          <div class="card">
          <img src="../images/eagle.jpg" alt="Card Image" class="post_img" />
          <h2 class="card-title">${post.title}</h2>
          <p class="card-content">
            ${modifiedMessage(post.message)}
          </p>
          <div class="button-group">
              <span><a class="btn btn-primary" onclick={detailPosts(${post.id})}>Read More</a></span>
              <span class="dropdown-menu-xl-end fa-bezier-curve">
                <button
                  class="btn btn-primary  dropdown-toggle hidden-arrow bg-dark"
                  type="button"
                  id="dropdownMenuButton2"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v fa-lg"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li>
                    <a class="dropdown-item" onclick={editPosts(${post.id})}>
                      <i class="fas fa-edit pe-2"></i>Edit</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <i class="fas fa-delete-left pe-2"></i>Delete</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <i class="fas fa-door-open pe-2"></i>Logout</a
                    >
                  </li>
                </ul>
              </span>
          </div>
          </div>
        `;
      });
    } else {
      const json = await response.json();
      console.log("Post error:", json);
      swal("Post failed. Please try again.");
    }
  } catch (err) {
    console.log(err);
  }
});
