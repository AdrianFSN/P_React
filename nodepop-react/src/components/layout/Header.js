import clsx from "clsx";
import { ReactComponent as Icon } from "../../assets/logo.svg";
import AuthButton from "../../pages/auth/components/AuthButton";
import "./Header.css";
//import Button from "../shared/Button";
import { Link, NavLink } from "react-router-dom";

export default function Header({ className }) {
  return (
    <header className={clsx("header", className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width={32} height={32} fill="rgb(29, 161, 242)" />
        </div>
      </Link>
      <NavLink to="/v1/adverts" end>
        See adverts
      </NavLink>
      <nav className="header-nav">
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}
