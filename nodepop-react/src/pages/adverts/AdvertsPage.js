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
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [filterByTag, setFilterByTag] = useState([]);

  const handleFilterByName = (event) => {
    setFilterByName(event.target.value);
  };

  const handleFilterByTag = (event) => {
    event.preventDefault();
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setFilterByTag(selectedOptions);
  };

  useEffect(() => {
    getLatestAds().then((adverts) => {
      setAdvertsPanel(adverts);
      setFilteredAdverts(adverts);
    });
  }, []);

  useEffect(() => {
    const filteredAds = adverts.filter((advert) => {
      const resultByName = advert.name
        .toLowerCase()
        .includes(filterByName.toLowerCase());
      const resultByTag =
        filterByTag.length === 0 ||
        advert.tags.every((tag) => filterByTag.includes(tag));

      return resultByName && resultByTag;
    });
    setFilteredAdverts(filteredAds);
  }, [adverts, filterByName, filterByTag]);

  return (
    <Layout title="List of adverts">
      <section className="AdvertsPage-filters">
        <FilterCase
          value={filterByName}
          onChange={handleFilterByName}
          placeholder="Filter by name"
        />
        <SelectMenu onChange={handleFilterByTag} multiple />
      </section>
      <section>
        {adverts.length ? (
          <ul className={styles.advertsList}>
            {filteredAdverts.map(({ id, photo, ...advert }) => (
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
