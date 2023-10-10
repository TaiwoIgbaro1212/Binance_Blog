// Get DOM elements
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
// Event listeners for toggling between sign-up and sign-in panels
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Function to handle user sign-up
async function signupHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    try {
      if (password.length < 8) {
        swal("Password must be at least 8 characters long.");
        return;
      }
      if (name.length < 3) {
        swal("Name must be at least 3 characters long.");
        return;
      }
      if (!email.includes("@")) {
        swal("Please enter a valid email address.");
        return;
      }
      if(!email.includes(".com")) {
        swal("Please enter a valid email address.");
        return;
      }
      const response = await fetch("http://localhost:4010/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Sign-up successful");
        window.location.href = "/home/index.html";
      } else {
        const json = await response.json();
        console.log("Sign-up error:", json);
        swal("Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      swal("An error occurred. Please try again later.");
    }
  } else {
    swal("Please fill in all the fields.");
  }
}

// Function to handle user sign-in
async function signinHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    try {
      const response = await fetch("http://localhost:4010/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Sign-in successful");
        window.location.href = "/home/index.html";
      } else {
        const errorMessage = await response.text();
        console.log("Sign-in error:", errorMessage);
        swal("Sign-in failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      swal("An error occurred. Please try again later.");
    }
  } else {
    swal("Please enter your email and password.");
  }
}

// Replace the form IDs with the actual class names from your HTML
document.querySelector(".sign-up-container form").addEventListener("submit", signupHandler);
document.querySelector(".sign-in-container form").addEventListener("submit", signinHandler);

