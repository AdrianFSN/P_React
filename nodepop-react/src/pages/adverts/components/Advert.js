import React from "react";

const Advert = ({ id, name, price, sale, tags, photo }) => {
  return (
    <section>
      <ul key={id}>
        {photo && <img src={`/${photo}`} alt="Advert offer" />}
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
