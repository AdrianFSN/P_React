import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";
import { AdvertPage } from "./AdvertPage";

function AdvertsPage() {
  const [adverts, setAdvertsPanel] = useState([]);

  useEffect(() => {
    getLatestAds().then((adverts) => setAdvertsPanel(adverts));
  }, []);

  return (
    <section>
      <ul className={styles.advertsList}>
        {adverts.map(({ id, name, price, sale, tags }) => (
          <ul key={id}>
            <li>
              <h2>{name}</h2>
            </li>
            <li>Price: {price} €</li>
            <li>Type of offer: {sale ? "On sale" : "On search"}</li>
            <li>Category: {tags.join(" | ")}</li>
          </ul>
        ))}
      </ul>
      <AdvertPage />
    </section>
  );
}

export default AdvertsPage;
