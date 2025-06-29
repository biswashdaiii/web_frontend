import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

   const url =
  state === "Sign up"
    ? "http://localhost:5050/api/auth/register"
    : "http://localhost:5050/api/auth/login";

    const payload =
      state === "Sign up"
        ? {
            name,
            email,
            password,
            gender: "Not Selected",
            dob: "Not selected",
            phone: "0000000000",
            address: { line1: "", line2: "" },
          }
        : { email, password };

    try {
      const res = await axios.post(url, payload);
      console.log("Success:", res.data);

      if (state === "Sign up") {
        toast.success("Account created successfully! Please login.");
        setState("Login");
        setPassword("");
      } else if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token); // ✅ This updates AppContext
        toast.success("Login successful!");
        navigate("/");
      }

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />

      <form onSubmit={onSubmitHandler} className="min-h-[100vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "Sign up" ? "Create Account" : "Login"}
          </p>
          <p>
            Please {state === "Sign up" ? "sign up" : "login"} to book appointment
          </p>

          {state === "Sign up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-base"
          >
            {state === "Sign up" ? "Create Account" : "Login"}
          </button>

          {state === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign up")}
                className="text-primary underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
