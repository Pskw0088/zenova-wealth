// Supabase SDK loaded check
console.log("register.js loaded");

document.addEventListener("DOMContentLoaded", () => {

  // 🔹 1. Supabase init
  const supabaseUrl = "https://nhjrwbfdsorchmggkkzd.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oanJ3YmZkc29yY2htZ2dra3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MjI3NjEsImV4cCI6MjA4Njk5ODc2MX0.7o8m61ohZUadrwRUI0uMLn8pitMW88Hegh62IrC12Bw";

  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

  // 🔹 2. Elements
  const registerBtn = document.getElementById("registerBtn");
  const inputs = document.querySelectorAll("input");

  if (!registerBtn) {
    console.error("Register button not found");
    return;
  }

  // 🔹 3. Click handler
  registerBtn.addEventListener("click", async () => {
    console.log("Button clicked");

    const fullName = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const mobile = inputs[2].value.trim();
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;

    // Validation
    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 🔹 4. Supabase signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 🔹 5. Insert profile
    const userId = data.user.id;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          full_name: fullName,
          mobile: mobile,
        },
      ]);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });

});
