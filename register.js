// 🔹 1. Supabase init
const supabaseUrl = "https://nhjrwbfdsorchmggkzkd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oanJ3YmZkc29yY2htZ2dra3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MjI3NjEsImV4cCI6MjA4Njk5ODc2MX0.7o8m61ohZUadrwRUI0uMLn8pitMW88Hegh62IrC12Bw";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);


// 🔹 2. Form elements
const registerBtn = document.querySelector("button");
const inputs = document.querySelectorAll("input");

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const fullName = inputs[0].value;
  const email = inputs[1].value;
  const mobile = inputs[2].value;
  const password = inputs[3].value;
  const confirmPassword = inputs[4].value;

  // 🔸 Basic validation
  if (!fullName || !email || !mobile || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // 🔹 3. Supabase Auth signup
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // 🔹 4. Save extra profile data
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

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="register.js"></script>
</body>
</html>

