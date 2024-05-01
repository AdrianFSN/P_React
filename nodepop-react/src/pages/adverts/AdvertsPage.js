import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";
import { AdvertPage } from "./AdvertPage";
import Button from "../../components/shared/Button";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";

const EmptyList = () => {
  return (
    <section>
      <p>Nothing to see here... Be the first one and publish your advert!</p>
      <Button $variant="primary">Create advert</Button>
    </section>
  );
};

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
                <Advert {...advert} />
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
