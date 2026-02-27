import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center text-white p-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg opacity-80">
            Log in to manage your courses.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/" className="text-indigo-600 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;