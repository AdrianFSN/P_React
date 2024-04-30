import clsx from "clsx";
import { ReactComponent as Icon } from "../../assets/logo.svg";
/* import { AuthContext } from "../../pages/auth/context";
import { useContext } from "react"; */
import "./Header.css";
import Button from "../shared/Button";

export default function Header({ className }) {
  return (
    <header className={clsx("header", className)}>
      <div className="header-logo">
        <Icon width={32} height={32} fill="rgb(29, 161, 242)" />
      </div>
      <nav className="header-nav">
        {/* <AuthButton className="header-button" /> */}
        <Button>Mockup login</Button>
      </nav>
    </header>
  );
}
