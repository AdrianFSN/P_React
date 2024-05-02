import React, { useEffect, useState } from "react";
import "./Advert.css";
import ImageNotAvailable from "../../../assets/ImageNotAvailable.jpg";

const Advert = ({ id, name, price, sale, tags, photo }) => {
  const backupPhoto = ImageNotAvailable;
  const [pictureToShow, setPictureToShow] = useState(backupPhoto);

  useEffect(() => {
    if (photo) {
      setPictureToShow(photo);
    }
  }, [photo, backupPhoto]);

  return (
    <section className="single-advert">
      <ul key={id}>
        {<img src={pictureToShow} alt="Advert offer" />}
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
