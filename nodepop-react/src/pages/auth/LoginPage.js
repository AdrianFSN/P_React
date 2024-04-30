import { useEffect, useState } from "react";
import { login } from "./service";
import Button from "../../components/shared/Button";
import FormField from "../../components/shared/FormField";
import CheckBox from "../../components/shared/CheckBox";
import "./LoginPage.css";
import storage from "../utils/storage";

export function LoginPage({ onLogin }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const accessToken = storage.get("auth");
  console.log("Esto es accessToken ", accessToken);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);

  const handleCheckboxChange = () => {
    setCheckBoxStatus((prevStatus) => !prevStatus);
  };

  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };
  const { email, password } = formValues;
  const buttonDisabled = !email || !password;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await login(
      {
        email,
        password,
      },
      checkBoxStatus
    );
    onLogin();
  };
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          className="loginForm-field"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email here"
        ></FormField>
        <FormField
          className="loginForm-field"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Your password here"
        ></FormField>
        <Button
          className="loginForm-submit"
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
        >
          Login
        </Button>
        <CheckBox
          label="Clica para mantener abierta tu sesión"
          checked={checkBoxStatus}
          onChange={handleCheckboxChange}
        ></CheckBox>
      </form>
    </div>
  );
}
