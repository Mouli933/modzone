document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const loginBox = document.getElementById("loginBox");

  // Already logged in
  if (localStorage.getItem("loggedIn") === "true") {
    const email = localStorage.getItem("loggedInEmail");
    loginBox.innerHTML = `
      <h2>Welcome</h2>
      <p style="margin-bottom:15px;">${email}</p>
      <button onclick="logout()">Logout</button>
    `;
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const storedUser = localStorage.getItem("user_" + email);

    if (!storedUser) {
      alert("No account found. Please create an account first.");
      return;
    }

    const userData = JSON.parse(storedUser);

    if (userData.password !== password) {
      alert("Incorrect password");
      return;
    }

    // Login success
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedInEmail", email);

    alert("Login successful");
    location.reload();
  });
});

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInEmail");
  location.reload();
}
