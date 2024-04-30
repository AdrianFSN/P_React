import { useEffect, useState } from "react";
import { login } from "./service";
import Button from "../../components/shared/Button";
import FormField from "../../components/shared/FormField";
import CheckBox from "../../components/shared/CheckBox";

export function LoginPage({ onLogin }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [checkBoxStatus, setCheckBoxStatus] = useState(false);

  useEffect(() => {
    if (!checkBoxStatus) {
      console.log("Debería llamar para que se cierre la sesión");
    } else {
      console.log("Debería llamar para que se GUARDE la sesión");
    }
  }, [checkBoxStatus]);

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
        <FormField
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email here"
        ></FormField>
        <FormField
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Your password here"
        ></FormField>
        <Button type="submit" $variant="primary" disabled={buttonDisabled}>
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
