import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";
import EmptyList from "./components/EmptyAdsList";
import FilterCase from "../../components/shared/FilterCase";
import SelectMenu from "../../components/shared/SelectMenu";

function AdvertsPage() {
  const [adverts, setAdvertsPanel] = useState([]);
  const [filterByName, setFilter] = useState("");

  const handleFilterByName = (event) => {
    setFilter(event.target.value);
  };
  const filteredAds = adverts.filter((advert) =>
    advert.name.toLowerCase().includes(filterByName.toLowerCase())
  );

  useEffect(() => {
    getLatestAds().then((adverts) => setAdvertsPanel(adverts));
  }, []);

  return (
    <Layout title="List of adverts">
      <section className="AdvertsPage-filters">
        <FilterCase
          value={filterByName}
          onChange={handleFilterByName}
          placeholder="Filter by name"
        />
        <SelectMenu multiple />
      </section>
      <section>
        {adverts.length ? (
          <ul className={styles.advertsList}>
            {filteredAds.map(({ id, photo, ...advert }) => (
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
