import Link from "next/link";
import { sanityClient, urlFor } from "../lib/sanity";
import styles from "../styles/ChefCard.module.css";

export default function ChefCard({ chef }) {
  return (
    <Link href={`/chefs/${chef.slug.current}`}>
      <article className={styles.card}>
        <img src={urlFor(chef.image).url()} alt="chef" />
        <h4>{chef.name}</h4>
        <div className={styles.gradient}></div>
      </article>
    </Link>
  );
}
