import Link from "next/link";
import styles from "../styles/PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main>
      <section className={styles.pageNotFound}>
        <h2>404</h2>
        <h3>Page not Found</h3>
        <Link href="/">
          <button>Return to home</button>
        </Link>
      </section>
    </main>
  );
}
