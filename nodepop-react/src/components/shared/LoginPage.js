import { useState } from "react";
import { login } from "../../pages/auth/service";
import Button from "./Button";

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonDisabled = !email || !password;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await login({
      email,
      password,
    });
    onLogin();
  };
  return (
    <div>
      <h1>Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Your email here"
        ></input>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Your password here"
        ></input>
        <Button type="submit" $variant="primary" disabled={buttonDisabled}>
          Login
        </Button>
      </form>
    </div>
  );
}
