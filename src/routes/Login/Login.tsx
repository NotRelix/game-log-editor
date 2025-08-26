import { useState, type FormEvent } from "react";
import type { LoginType } from "../../types";

const emptyLogin: LoginType = {
  username: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState<LoginType>(emptyLogin);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!result.success) {
        console.error("Failed to fetch login");
      } else {
        localStorage.setItem("token", result.token);
      }
      console.log("Successfully logged in");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, username: e.target.value }));
          }}
          value={data.username}
          type="text"
          id="username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, password: e.target.value }));
          }}
          value={data.password}
          type="password"
          id="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
