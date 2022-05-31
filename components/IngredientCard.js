import { urlFor } from "../lib/sanity";
import styles from "../styles/IngredientCard.module.css";

export default function IngredientCard({ ingredient }) {
  return (
    <li className={styles.card}>
      <div className={styles.imageDiv}>
        <img src={urlFor(ingredient.ingredient.image).url()} alt="chef" />
      </div>
      <div className={styles.infoDiv}>
        <h4 className={styles.ingredientName}>{ingredient.ingredient.name}</h4>
        <p>
          {ingredient.wholeNumber} {ingredient.fraction}
          {ingredient.unit}
        </p>
      </div>
    </li>
  );
}
