import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";
import EmptyList from "./components/EmptyAdsList";

function AdvertsPage() {
  const [adverts, setAdvertsPanel] = useState([]);

  useEffect(() => {
    getLatestAds().then((adverts) => setAdvertsPanel(adverts));
  }, []);

  return (
    <Layout title="List of adverts">
      <section>
        {adverts.length ? (
          <ul className={styles.advertsList}>
            {adverts.map(({ id, photo, ...advert }) => (
              <li key={id}>
                <Link to={`/v1/adverts/${id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </section>
    </Layout>
  );
}

export default AdvertsPage;
