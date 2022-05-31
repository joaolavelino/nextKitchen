import styles from "../styles/SmallRecipeCard.module.css";
import { urlFor } from "../lib/sanity";
import Link from "next/link";

const SmallRecipeCard = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe.slug.current}`}>
      <div className={styles.recipeCard}>
        <div className={styles.gradient}></div>
        <h4>{recipe.name}</h4>
        <img src={urlFor(recipe.mainImage).url()} alt="recipe" />
      </div>
    </Link>
  );
};

export default SmallRecipeCard;
