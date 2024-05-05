import "./Advert.css";
import Photo from "../../../components/shared/Photo";

const Advert = ({ id, name, price, sale, tags, photo, showImage }) => {
  return (
    <section className="single-advert">
      <ul key={id}>
        {showImage && (
          <Photo
            className="NodepopImage-advert"
            photo={photo}
            alt="Nodepop article"
          ></Photo>
        )}
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
