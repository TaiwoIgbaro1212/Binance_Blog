 class Validation {
   constructor() {
     this.errors = [];
   }

   validateName(name) {
     if (name === "" || name.length < 3) {
       this.errors.push("Please enter your name.");
     }
   }

   validateEmail(email) {
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailPattern.test(email)) {
       this.errors.push("Please enter a valid email address.");
     }
   }

   validatePassword(password) {
      if (password === "" || password.length < 8) {
        this.errors.push("Please enter a password with at least 8 characters.");
      } 
   }

   validateTitle(title) {
      if (title === "" || title.length < 3) {
        this.errors.push("Please enter a title with at least 3 characters.");
      }
    }

   validateMessage(message) {
     if (message === "" || message.length < 10) {
       this.errors.push("Please enter your message.");
     }
   }

   getErrors() {
     return this.errors;
   }
 }

 module.exports = Validation;
