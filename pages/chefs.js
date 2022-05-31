import ChefCard from "../components/ChefCard";
import { sanityClient, urlFor } from "../lib/sanity";
import styles from "../styles/Chefs.module.css";

const chefsQuery = `*[_type == 'chef']{name, _id, slug, image}`;

export default function Chefs({ chefs }) {
  console.log(chefs);

  return (
    <main>
      <div className={styles.title}>
        <h2>Our Creators</h2>
        <h3>These are the creators of the displayed recipes</h3>
      </div>
      <div className={styles.chefList}>
        {chefs?.map((chef) => (
          <ChefCard key={chef._id} chef={chef} />
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const chefs = await sanityClient.fetch(chefsQuery);

  return {
    props: {
      chefs,
    },
  };
}
