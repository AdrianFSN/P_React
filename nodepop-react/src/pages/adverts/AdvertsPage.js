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
//import SliderNodePop from "../../components/shared/Slider";
import SliderRange from "../../components/shared/SliderRange";
import RadioButton from "../../components/shared/RadioButton";

function AdvertsPage() {
  const [adverts, setAdvertsPanel] = useState([]);
  const [maxPriceAvailable, setMaxPriceAvailable] = useState(0);
  const [minPriceAvailable, setMinPriceAvailable] = useState(0);
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [filterByTag, setFilterByTag] = useState([]);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(maxPriceAvailable);
  const [filterByMinPrice, setFilterByMinPrice] = useState(minPriceAvailable);
  const [loading, setLoading] = useState(true);
  const [offerFilterValues, setOfferFilterValues] = useState({
    onSale: false,
    onSearch: false,
    all: true,
  });

  useEffect(() => {
    const calculateMaxMinPriceAvailable = () => {
      const prices = adverts.map((advert) => advert.price);
      setMaxPriceAvailable(Math.max.apply(null, prices));
      setMinPriceAvailable(Math.min.apply(null, prices));
      setLoading(false);
    };

    calculateMaxMinPriceAvailable();
  }, [adverts]);

  useEffect(() => {
    if (!loading) {
      setFilterByMaxPrice(maxPriceAvailable);
      setFilterByMinPrice(minPriceAvailable);
    }
  }, [loading, maxPriceAvailable, minPriceAvailable]);

  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  const handleFilterByName = (event) => {
    setFilterByName(event.target.value);
  };

  useEffect(() => {
    if (offerFilterValues.all) {
      setOfferFilterValues(() => ({
        all: true,
        onSale: false,
        onSearch: false,
      }));
    }
  }, [offerFilterValues.all]);

  const handleFilterByTag = (event) => {
    event.preventDefault();
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setFilterByTag(selectedOptions);
  };

  const handleFilterByPriceRange = (event) => {
    setFilterByMinPrice(event[0]);
    setFilterByMaxPrice(event[1]);
  };

  const handleFilterByTypeOfOffer = (event) => {
    setOfferFilterValues((prevValues) => ({
      ...prevValues,
      [event.target.id]: !prevValues[event.target.id],
    }));
    console.log(offerFilterValues);
  };

  const resetFilters = () => {
    setFilterByName("");
    setFilterByTag([]);
    setFilterByMaxPrice(maxPriceAvailable);
    setFilterByMinPrice(minPriceAvailable);
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

      const resultByPriceRange =
        advert.price <= filterByMaxPrice && advert.price >= filterByMinPrice;

      const resultByTypeOfOffer =
        (offerFilterValues.onSearch && !advert.sale) ||
        (offerFilterValues.onSale && advert.sale) ||
        offerFilterValues.all;
      console.log("esto es resultByTypeofOffer ", resultByTypeOfOffer);
      return (
        resultByName && resultByTag && resultByPriceRange && resultByTypeOfOffer
      );
    });

    setFilteredAdverts(filteredAds);
  }, [
    adverts,
    filterByName,
    filterByTag,
    filterByMaxPrice,
    filterByMinPrice,
    offerFilterValues,
  ]);

  return (
    <Layout title="List of adverts">
      <div>{loading && <div className="Nodepop-loading">Loading...</div>}</div>
      <section className="AdvertsPage-filters">
        <div>
          <h3>Filters section</h3>
        </div>
        <FilterCase
          value={filterByName}
          onChange={handleFilterByName}
          placeholder="Filter by name"
        />
        <div>Filter by category</div>
        <SelectMenu onChange={handleFilterByTag} multiple />
        <div>Filter by price</div>
        <SliderRange
          min={minPriceAvailable}
          max={maxPriceAvailable}
          value={[filterByMinPrice, filterByMaxPrice]}
          className="SliderNodepop"
          label={`Min price: ${filterByMinPrice} € - Max price: ${filterByMaxPrice} €`}
          onChange={handleFilterByPriceRange}
          allowCross={false}
        ></SliderRange>
        <RadioButton
          label="On sale"
          name="filterByTypeofOffer"
          id="onSale"
          value={offerFilterValues.onSale}
          onClick={handleFilterByTypeOfOffer}
        />
        <RadioButton
          label="On search"
          name="filterByTypeofOffer"
          id="onSearch"
          value={offerFilterValues.onSearch}
          onClick={handleFilterByTypeOfOffer}
        />
        <RadioButton
          label="All types"
          name="filterByTypeofOffer"
          id="all"
          value={offerFilterValues.all}
          defaultChecked={offerFilterValues}
          onClick={handleFilterByTypeOfOffer}
        />
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
