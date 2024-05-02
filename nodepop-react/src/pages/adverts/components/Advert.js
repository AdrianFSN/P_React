import React from "react";
import "./Advert.css";

const Advert = ({ id, name, price, sale, tags, photo }) => {
  return (
    <section className="single-advert">
      <ul key={id}>
        {photo && <img src={`${photo}`} alt="Advert offer" />}
        <li>
          <h2>{name}</h2>
        </li>
        <li>Price: {price} €</li>
        <li>Type of offer: {sale ? "On sale" : "On search"}</li>
        <li>Category: {tags.join(" | ")}</li>
      </ul>
    </section>
  );
};
export default Advert;
