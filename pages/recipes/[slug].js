import IngredientCard from "../../components/IngredientCard";
import { sanityClient, urlFor, usePreviewSubscription } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";

import styles from "../../styles/RecipeDetail.module.css";
import { useState } from "react";
import Link from "next/link";

const recipeQuery = `*[_type=="recipe" && slug.current == $slug][0]{
  _id,
    name,
    slug,
    mainImage,
    chef->{
      name,
      image,
      _id,
      slug
    },
    ingredient[]{
      _key,
      unit,
      wholeNumber,
      fraction,
      ingredient->{
        name, image
      }
    },
    instructions,
    likes
}`;

export default function RecipeDetail({ data, preview }) {
  const [likes, setLikes] = useState(data?.recipe?.likes);
  const [fullHeart, setFullHeart] = useState(false);

  if (!data)
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
        <div className="lds-circle">
          <div></div>
        </div>
      </div>
    );

  const { recipe } = data;

  // const { data: recipe } = usePreviewSubscription(recipeQuery, {
  //   params: { slug: data.recipe?.slug.current },
  //   initialData: data,
  //   enabled: preview,
  // });

  const addLike = async () => {
    const res = await fetch("/api/handle-like/ ", {
      method: "POST",
      body: JSON.stringify({ _id: recipe?._id }),
    }).catch((error) => console.log(error));

    setLikes(likes + 1);
    setFullHeart(true);
  };

  console.log(recipe);
  return (
    <main>
      <article className={styles.recipeDetail}>
        <header className={styles.recipeHeader}>
          <img
            src={urlFor(recipe?.mainImage).url()}
            alt="recipe"
            className={styles.recipeImage}
          />
          <div className="header-right">
            <button
              className={`${styles.likeButton} ${
                fullHeart && styles.likeButtonActive
              }`}
              onClick={addLike}
            >
              ♡<span>{likes}</span>
            </button>
            <div className={styles.titleDiv}>
              <h2 className={styles.title}>{recipe?.name}</h2>
            </div>
            <Link href={`/chefs/${recipe?.chef.slug.current}`}>
              <div className={styles.chefCard}>
                <img src={urlFor(recipe?.chef.image).url()} alt="chef" />
                <h3>
                  A recipe by
                  <br />
                  <span>{recipe?.chef.name}</span>
                </h3>
              </div>
            </Link>
          </div>
        </header>
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Ingredients</h3>
          <ul className={styles.ingredientList}>
            {recipe?.ingredient.map((ingredient) => (
              <IngredientCard key={ingredient._key} ingredient={ingredient} />
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>How to make it</h3>
          <div className={styles.instructions}>
            <PortableText value={recipe?.instructions} />
          </div>
        </section>
      </article>
    </main>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type=="recipe" && defined(slug.current)]{
      "params":{
        "slug": slug.current
      }
    }`
  );
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug });
  return { props: { data: { recipe }, preview: true } };
}
