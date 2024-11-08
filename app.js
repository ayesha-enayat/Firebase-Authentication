import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from "./firebase.js";

// Initialize GoogleAuthProvider
const provider = new GoogleAuthProvider();

// Sign-Up Function
let signUp = (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  let cPassword = document.getElementById("confirm_pass").value;

  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (!emailRegex.test(email)) {
      Swal.fire({
          title: "Invalid email format",
          timer: 5000,
          icon: "error",
          showConfirmButton: false
      });
      return;
  }

  if (!passwordRegex.test(password)) {
      Swal.fire({
          title: "Password must be 6-16 characters and include at least one number and one special character",
          timer: 5000,
          icon: "error",
          showConfirmButton: false
      });
      return;
  }

  if (password !== cPassword) {
      Swal.fire({
          title: "Passwords should be identical",
          timer: 3000,
          icon: "error",
          showConfirmButton: false
      });
      return;
  }

  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          // Save email to localStorage for dashboard display
          localStorage.setItem("userEmail", email);

          Swal.fire({
              title: "Account created!",
              timer: 3000,
              icon: "success",
              showConfirmButton: false
          }).then(() => {
              window.location.href = "./dashboard.html";
          });
      })
      .catch((error) => {
          console.log(error.message);
          Swal.fire({
              title: error.message,
              timer: 3000,
              icon: "error",
              showConfirmButton: false
          });
      });
};

// Attach event listener for Sign-Up
if (window.location.pathname.endsWith("index.html")) {
  const signUpBtn = document.getElementById("signUp_btn");
  if (signUpBtn) {
      signUpBtn.addEventListener("click", signUp);
  }
}

// Login Function with SweetAlert
let logIn = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          Swal.fire({
              title: "Login Successful",
              timer: 3000,
              icon: "success",
              showConfirmButton: false
          }).then(() => {
              window.location.href = "./dashboard.html";
          });
      })
      .catch((error) => {
          Swal.fire({
              title: "Invalid email or password",
              timer: 3000,
              icon: "error",
              showConfirmButton: false
          });
      });
};

// Attach event listener for Login
if (window.location.pathname.endsWith("login.html")) {
  let login_btn = document.getElementById("login_btn");
  if (login_btn) {
      login_btn.addEventListener("click", logIn);
  }
}

// Google Signup function with SweetAlert
let googleSignup = () => {
  signInWithPopup(auth, provider)
      .then((result) => {
          const user = result.user;
          console.log(user);

          Swal.fire({
              title: "Google Sign-Up Successful!",
              timer: 3000,
              icon: "success",
              showConfirmButton: false
          }).then(() => {
              window.location.href = "./dashboard.html";
          });
      })
      .catch((error) => {
          console.error("Google sign-up error:", error);
          Swal.fire({
              title: "Error during Google sign-up",
              text: error.message,
              timer: 3000,
              icon: "error",
              showConfirmButton: false
          });
      });
};

// Attach event listener for Google Sign-Up
if (window.location.pathname.endsWith("index.html")) {
  let googleBtn = document.getElementById("googleBtn");
  if (googleBtn) {
      googleBtn.addEventListener("click", googleSignup);
  }
}

// Log Out function with SweetAlert
document.getElementById("logOut")?.addEventListener("click", () => {
  signOut(auth)
      .then(() => {
          Swal.fire({
              title: "Log out successful",
              timer: 3000,
              icon: "success",
              showConfirmButton: false
          }).then(() => {
              window.location.href = "../index.html";
          });
      })
      .catch((error) => {
          Swal.fire({
              title: "Error during logout",
              text: error.message,
              timer: 3000,
              icon: "error",
              showConfirmButton: false
          });
      });
});
