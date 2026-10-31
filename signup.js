document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if user already exists
    const existingUser = localStorage.getItem("user_" + email);
    if (existingUser) {
      alert("Account already exists. Please login.");
      window.location.href = "index.html";
      return;
    }

    // Save user
    const userData = {
      name,
      email,
      password,
    };

    localStorage.setItem("user_" + email, JSON.stringify(userData));

    alert("Account created successfully. Please login.");
    window.location.href = "index.html";
  });
});
