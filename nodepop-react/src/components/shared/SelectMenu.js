import clsx from "clsx";

const SelectMenu = ({ className, label, optionsArray, ...props }) => {
  return (
    <select className={clsx("select-menu", className)} {...props}>
      {optionsArray.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
