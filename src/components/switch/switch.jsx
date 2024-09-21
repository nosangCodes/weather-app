import React from "react";
import classes from "./switch.module.css";
export default function Switch({
  onLabel = "On",
  offLabel = "Off",
  checked,
  onChange,
}) {
  return (
    <div className={classes.container}>
      <input
        onChange={onChange}
        checked={checked}
        id="toggle"
        type="checkbox"
      />
      <label className={classes.label} htmlFor="toggle">
        <span
          data-on-label={onLabel}
          data-off-label={offLabel}
          className={classes.inner}
        />
        <span className={classes.switch} />
      </label>
    </div>
  );
}
