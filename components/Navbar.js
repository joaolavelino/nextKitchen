import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/">
          <h1 className={styles.title}>Next Kitchen</h1>
        </Link>
      </div>

      <ul className={styles.links}>
        <li>
          <Link href="/">Recipes</Link>
          <div />
        </li>
        <li>
          <Link href="/chefs">Creators</Link>
          <div />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
