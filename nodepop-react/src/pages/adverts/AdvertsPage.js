import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";

function AdvertsPage() {
  const [adverts, setAdvertsPanel] = useState([]);

  useEffect(() => {
    getLatestAds().then((adverts) => setAdvertsPanel(adverts));
  }, []);

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
