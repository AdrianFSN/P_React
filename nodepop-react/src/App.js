import "./App.css";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { useAuth } from "./pages/auth/context";

function App() {
  const { isLogged } = useAuth();
  return <section>{isLogged ? <AdvertsPage /> : <LoginPage />}</section>;
}

export default App;
