import { useState } from "react";
import { useNavigate } from "react-router-dom"; // used to redirect after successful registration
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Register = () => {
  // Form input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // To redirect user after registration

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the service function which sends POST request to backend
      await registerUser({ name, email, password });

      // On success, show success message and redirect to login
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Registration failed.";
      toast.error(message);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="d-block mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            required
          />
        </div>
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
            onChange={(e) => setEmail(e.target.value)} // Update email state
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-10">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
