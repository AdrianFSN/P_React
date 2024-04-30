import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";
import { AdvertPage } from "./AdvertPage";
import Button from "../../components/shared/Button";
import { logout } from "../auth/service";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../auth/context";

const EmptyList = () => {
  return (
    <section>
      <p>Nothing to see here... Be the first one and publish your advert!</p>
      <Button $variant="primary">Create advert</Button>
    </section>
  );
};

function AdvertsPage() {
  const { onLogout } = useAuth();
  const [adverts, setAdvertsPanel] = useState([]);

  useEffect(() => {
    getLatestAds().then((adverts) => setAdvertsPanel(adverts));
  }, []);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <Layout title="List of adverts">
      <section>
        {adverts.length ? (
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
        ) : (
          <EmptyList />
        )}
        <AdvertPage />
        <Button onClick={handleLogout}>Logout</Button>
      </section>
    </Layout>
  );
}

export default AdvertsPage;
