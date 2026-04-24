import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBawM0KxcmEWXKsvSHa1eOVYtgDVFRMJbU",
  authDomain: "myra-31cce.firebaseapp.com",
  projectId: "myra-31cce",
  storageBucket: "myra-31cce.firebasestorage.app",
  messagingSenderId: "300225625899",
  appId: "1:300225625899:web:a73573c059d3b23d46cf6e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.querySelector(".login-btn");
  const modal = document.getElementById("loginModal");
  const loginSubmit = document.getElementById("loginSubmit");

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const productList = document.getElementById("productList");

  // LOGIN POPUP
  loginBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // CLOSE MODAL
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // LOGIN LOGIC
  loginSubmit.addEventListener("click", async () => {
    const emailVal = email.value.trim();
    const passVal = password.value.trim();

    if (!emailVal || !passVal) {
      alert("Enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailVal, passVal);
      alert("Login successful");
      modal.style.display = "none";
    } catch (err) {

      if (err.code === "auth/invalid-credential") {
        await createUserWithEmailAndPassword(auth, emailVal, passVal);
        alert("Account created & logged in");
        modal.style.display = "none";
      } else {
        alert(err.message);
      }
    }
  });

  // LOAD PRODUCTS
  async function loadProducts() {
    const snapshot = await getDocs(collection(db, "products"));

    snapshot.forEach(doc => {
      const p = doc.data();

      const img = p.image || "https://via.placeholder.com/300";

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${img}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <div class="price">₹${p.price}</div>
          <button class="btn add-cart" type="button">Add to Cart</button>
        </div>
      `;

      productList.appendChild(card);
    });
  }

  loadProducts();

  // ADD TO CART
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-cart")) {
      alert("Added to cart");
    }
  });

});