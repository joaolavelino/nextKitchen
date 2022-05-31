import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.subDiv}>
        <h5 className={styles.footerTitle}>Created by João Avelino</h5>
        <h6 className={styles.footerSubtitle}>Using Next.js and Sanity</h6>
      </div>
      <div className={styles.subDiv}>
        <a
          href="joaolavelino.netlify.app"
          target="_blank"
          className={styles.button}
        >
          Visit my portfolio for more projects
        </a>
      </div>
    </footer>
  );
}
