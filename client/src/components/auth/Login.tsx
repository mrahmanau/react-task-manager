import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call backend to login
      await loginUser({ email, password });

      toast.success("Login successful!");

      // Redirect to home or dashboard
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Login failed.";
      toast.error(message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Login to Your Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="d-block mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="d-block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-10">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
