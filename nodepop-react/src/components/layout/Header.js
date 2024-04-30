import clsx from "clsx";
import { ReactComponent as Icon } from "../../assets/logo.svg";
/* import AuthButton from "../../pages/auth/components/AuthButton"; */
import "./Header.css";
import Button from "../shared/Button";

export default function Header({ className }) {
  return (
    <header className={clsx("header", className)}>
      <div className="header-logo">
        {/* <img src={logo} alt="twitter-react"></img> */}
        <Icon width={32} height={32} fill="rgb(29, 161, 242)" />
      </div>
      <nav className="header-nav">
        {/* <AuthButton className="header-button" /> */}
        <Button>Mockup login</Button>
      </nav>
    </header>
  );
}
