import Link from "next/link";
import classes from "./Button.module.css";

const Button = ({ link, children }) => {
  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
};

export default Button;
