import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
        const res = await axios.post("http://localhost:4000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
  
      const data = res.data;
      
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",data.user.name);

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#212121]">
      <form
        onSubmit={handleLogin}
        className="bg-[#5e5e5e33] shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#dadada]">
          Login
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md  outline-none bg-[#212121] text-white "
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-md font-light text-white mt-8">Dont have an account?? <Link className="text-[#7ed9a1] font-medium" to={'/register'}> Register</Link></p>
    </div>
  );
};

export default Login;
