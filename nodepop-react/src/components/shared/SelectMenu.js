import clsx from "clsx";
import "./SelectMenu.css";
import { useEffect, useState } from "react";
import { getTags } from "../../pages/adverts/service";

const SelectMenu = ({ className, label, optionsArray, ...props }) => {
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    if (optionsArray) {
      setAvailableTags(optionsArray);
    } else {
      const getTagsFromApi = async () => {
        try {
          const response = await getTags();
          setAvailableTags(response);
        } catch (error) {
          console.log(error.message);
        }
      };
      getTagsFromApi();
    }
  }, [optionsArray]);

  return (
    <select className={clsx("select-menu", className)} {...props}>
      {availableTags.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
