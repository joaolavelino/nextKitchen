import { sanityClient, urlFor, usePreviewSubscription } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import SmallRecipeCard from "../../components/SmallRecipeCard";

import styles from "../../styles/ChefDetail.module.css";

const chefQuery = `*[_type=="chef" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  image,
  bio
}`;

const recipeQuery = `*[_type=="recipe"]{
  _id,
  name,
  slug,
  mainImage,
  chef->{
    name,
    slug,
    _id,
  }
}`;

export default function ChefDetails({ chef, recipes }) {
  console.log(chef, recipes);

  if (!chef || !recipes)
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
        <div className="lds-circle">
          <div></div>
        </div>
      </div>
    );

  return (
    <main>
      <article className={styles.chefDetails}>
        <section className={styles.header}>
          <div>
            <img src={urlFor(chef?.image).url()} alt={chef.name} />
          </div>
          <div className={styles.chefInfo}>
            <h2 className={styles.name}>{chef.name}</h2>
            <div className={styles.bio}>
              <PortableText value={chef.bio} />
            </div>
          </div>
        </section>
        <section className={styles.recipes}>
          <h3>Recipes submitted by {chef.name}</h3>
          <div className={styles.recipeList}>
            {recipes.map((recipe) => (
              <SmallRecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type=="chef" && defined(slug.current)]{
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
  const allRecipes = await sanityClient.fetch(recipeQuery);
  const recipesByChef = allRecipes.filter(
    (recipe) => recipe.chef.slug.current === slug
  );
  const chef = await sanityClient.fetch(chefQuery, { slug });
  return { props: { chef: chef, recipes: recipesByChef, preview: true } };
}
