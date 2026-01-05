import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import artihcusLogo from "../../../assets/artihcus-logo1.svg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateForm = () => {
    if (!formData.name || !formData.userId || !formData.password) {
      setError("Please fill in all required fields");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || "Sign up failed. Please try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      // Persist auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24 py-12">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Create an account!
            </h2>
            <p className="text-gray-600 mb-8">
              Join Artihcus and streamline your workflow.<br />
              <span className="text-orange-500 font-medium">Get started today.</span>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="User ID"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full bg-gray-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-medium hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
        <div className="relative z-10 text-center">
          {/* Main illustration - person meditating */}
          <div className="relative inline-block mb-8">
            {/* Decorative elements around the person */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-orange-200 rounded-full opacity-60"></div>
            <div className="absolute -top-4 -right-12 w-12 h-12 bg-orange-300 rounded-full opacity-40"></div>
            <div className="absolute -bottom-6 -left-16 w-20 h-20 bg-orange-200 rounded-full opacity-50"></div>
           
            {/* Person illustration placeholder */}
            <div className="w-80 h-80 bg-orange-200 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating avatars */}
            <div className="absolute -top-12 left-12 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
            <div className="absolute top-16 -right-8 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
            <div className="absolute bottom-12 -left-8 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Task card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-xs mx-auto mb-8">
            <div className="flex items-center justify-center h-20">
              <img
                src={artihcusLogo}
                alt="Artihcus Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Make your work easier and organized<br />
              with <span className="text-orange-500">Artihcus</span>
            </h3>
          </div>
        </div>

        {/* Background decorative dots */}
       
      </div>
    </div>
  );
};

export default SignUp;

