import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import RequireAuth from "./pages/auth/components/RequireAuth";

function App() {
  //return <section>{isLogged ? <AdvertsPage /> : <LoginPage />}</section>;
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route
        path="/v1/adverts"
        element={
          <div className="container">
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          </div>
        }
      >
        <Route index element={<AdvertsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
