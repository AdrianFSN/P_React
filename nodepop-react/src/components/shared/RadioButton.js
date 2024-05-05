import clsx from "clsx";

const RadioButton = ({ className, label, ...props }) => {
  return (
    <div className={clsx("radioButton", className)}>
      <label className="radioButton-label">
        <input className="radioButton-input" type="radio" {...props} />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default RadioButton;
