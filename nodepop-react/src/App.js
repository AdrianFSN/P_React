import logo from "./logo.svg";
import "./App.css";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import { useState } from "react";
import { LoginPage } from "./components/shared/LoginPage";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => setIsLogged(true);
  return (
    <section>
      {isLogged ? <AdvertsPage /> : <LoginPage onLogin={handleLogin} />}
    </section>
  );
}

export default App;
