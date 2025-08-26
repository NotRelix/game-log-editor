import { useState, type FormEvent } from "react";
import type { RegisterType } from "../../types";

const emptyRegister: RegisterType = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [data, setData] = useState<RegisterType>(emptyRegister);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!result.success) {
        console.error(result.messages);
      } else {
        console.log(result.messages);
        setData(emptyRegister);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Register</h1>
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, confirmPassword: e.target.value }));
          }}
          value={data.confirmPassword}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
