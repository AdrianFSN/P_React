import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { getLatestAds } from "./service";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";
import EmptyList from "./components/EmptyAdsList";
import FilterCase from "../../components/shared/FilterCase";
import SelectMenu from "../../components/shared/SelectMenu";
import Button from "../../components/shared/Button";
import SliderNodePop from "../../components/shared/Slider";

function AdvertsPage() {
  const [adverts, setAdvertsPanel] = useState([]);
  const [maxPriceAvailable, setMaxPriceAvailable] = useState(0);
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [filterByTag, setFilterByTag] = useState([]);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(maxPriceAvailable);

  console.log("Esto es filterbyMaxproce", filterByMaxPrice);

  const [error, setError] = useState(null);

  const resetError = () => setError(null);

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

  const handleFilterByMaxPrice = (event) => {
    setFilterByMaxPrice(event);
    console.log("Estoy tocando el slider ", event);
  };

  useEffect(() => {
    const calculateMaxPriceAvailable = () => {
      const prices = adverts.map((advert) => advert.price);
      setMaxPriceAvailable(Math.max.apply(null, prices));
    };

    calculateMaxPriceAvailable();
  }, [adverts]);
  console.log("Èsto es mamaxPriceAvailable ", maxPriceAvailable);

  const resetFilters = () => {
    setFilterByName("");
    setFilterByTag([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adverts = await getLatestAds();
        setAdvertsPanel(adverts);
        setFilteredAdverts(adverts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredAds = adverts.filter((advert) => {
      const resultByName = advert.name
        .toLowerCase()
        .includes(filterByName.toLowerCase());

      const resultByTag =
        filterByTag.length === 0 ||
        (filterByTag.every((tag) => advert.tags.includes(tag)) &&
          filterByTag.length === advert.tags.length);

      const resultByMaxPrice = advert.price >= filterByMaxPrice;

      return resultByName && resultByTag && resultByMaxPrice;
    });
    setFilteredAdverts(filteredAds);
  }, [adverts, filterByName, filterByTag, filterByMaxPrice]);

  return (
    <Layout title="List of adverts">
      <section className="AdvertsPage-filters">
        <FilterCase
          value={filterByName}
          onChange={handleFilterByName}
          placeholder="Filter by name"
        />
        <SelectMenu onChange={handleFilterByTag} multiple />
        <SliderNodePop
          max={maxPriceAvailable}
          value={filterByMaxPrice}
          className="SliderNodepop"
          label={`Max Price Range: ${filterByMaxPrice} €`}
          onChange={handleFilterByMaxPrice}
        ></SliderNodePop>
        <Button onClick={resetFilters}>Reset filters</Button>
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
      <div>
        {error && (
          <div
            className="Nodepop-error"
            onClick={resetError}
          >{`${error}. Click this banner to get back`}</div>
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
