import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  ref,
  set,
  firestore,
  database,
} from "./firebaseConfig.js";

const signUpForm = document.getElementById("sign-up-form");
const registrationMessage = document.getElementById("registrationMessage");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signUpForm);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const gender = formData.get("gender");

  if (!username || !email || !password || !gender) {
    registrationMessage.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = { username, email, password, gender };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    registrationMessage.textContent = "Registration successful!";
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    registrationMessage.textContent = `Error: ${error.message}`;
  }
});

const signInForm = document.getElementById("sign-in-form");
const signInMessage = document.getElementById("signInMessage");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;

  if (!email || !password) {
    signInMessage.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    signInMessage.textContent = "Sign-in successful!";
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    signInMessage.textContent = `Error: ${error.message}`;
  }
});

const googleSignInBtn = document.getElementById("googleSignInBtn");
googleSignInBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const [firstName, lastName] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const userData = {
      firstName,
      lastName,
      email: user.email,
      age: 0,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    registrationMessage.textContent = "Google sign-in successful!";
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    registrationMessage.textContent = `Error: ${error.message}`;
  }
});

const googleSignUpBtn = document.getElementById("googleSignUpBtn");
googleSignUpBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const [firstName, lastName] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const userData = {
      firstName,
      lastName,
      email: user.email,
      age: 0,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    registrationMessage.textContent = "Google sign-up successful!";
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    registrationMessage.textContent = `Error: ${error.message}`;
  }
});

const facebookSignInBtn = document.getElementById("facebookSignInBtn");
facebookSignInBtn.addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userData = {
      firstName: user.displayName.split(" ")[0],
      lastName: user.displayName.split(" ")[1],
      email: user.email,
      age: 0,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    registrationMessage.textContent = "Facebook sign-in successful!";
    setTimeout(() => {
      window.location.href = "/User-Registration";
    }, 1000);
  } catch (error) {
    registrationMessage.textContent = `Error: ${error.message}`;
  }
});

const facebookSignUpBtn = document.getElementById("facebookSignUpBtn");
facebookSignUpBtn.addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userData = {
      firstName: user.displayName.split(" ")[0],
      lastName: user.displayName.split(" ")[1],
      email: user.email,
      age: 0,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    registrationMessage.textContent = "Facebook sign-up successful!";
    setTimeout(() => {
      window.location.href = "/User-Registration";
    }, 1000);
  } catch (error) {
    registrationMessage.textContent = `Error: ${error.message}`;
  }
});

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
