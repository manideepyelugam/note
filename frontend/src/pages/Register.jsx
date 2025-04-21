import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post(`http://localhost:4000/api/auth/register`,{
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      // console.log(res);
      const data = await res.data;
      localStorage.setItem("token", res.data.token);
      alert("Registration successful!");
      if (!res.ok) throw new Error(data.message || "Registration failed");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setError("");
    
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#212121]">
      <form
        onSubmit={handleRegister}
        className="bg-[#5e5e5e33] shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#dadada]">
          Register
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md outline-none bg-[#212121] text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md outline-none bg-[#212121] text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md outline-none bg-[#212121] text-white"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#75c995] text-white py-2 rounded-md hover:bg-[#7ed9a1] transition duration-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-md font-light text-white mt-8">
        Already have an account?{" "}
        <Link className="text-[#7ed9a1] font-medium" to={"/login"}>
          Login
        </Link>
      </p>

    </div>
  );
};

export default Register;
