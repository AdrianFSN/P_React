import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";

const adverts = [
  {
    id: "4b8506d3-8770-4630-b25e-94228df87dcd",
    createdAt: "2024-04-28T17:41:57.000Z",
    name: "car",
    sale: true,
    price: 20,
    tags: ["lifestyle", "motor"],
    photo: null,
  },
  {
    id: "433578b8-39d3-4438-a23f-4b199487aedc",
    createdAt: "2024-04-29T06:56:31.000Z",
    name: "bike",
    sale: false,
    price: 123,
    tags: ["lifestyle", "work"],
    photo: null,
  },
];

function AdvertsPage() {
  /*   const [adverts, setAdvertsPanel] = useState([]);

  useEffect(() => {
    getLatestAds().then((adverts) => setAdvertsPanel(adverts));
  }, []); */

  function handleTags(tagsList) {
    const tags = tagsList.map((tag) => {
      return `${tag}`;
    });
    return tags.join(" ");
  }

  return (
    <section>
      <ul className={styles.advertsList}>
        {adverts.map((advert) => (
          <ul key={advert.id}>
            <li>
              <h2>{advert.name}</h2>
            </li>
            <li>Price: {advert.price} €</li>
            <li>Type of offer: {advert.sale ? "On sale" : "On search"}</li>
            <li>Category: {handleTags(advert.tags)}</li>
          </ul>
        ))}
      </ul>
    </section>
  );
}

export default AdvertsPage;
