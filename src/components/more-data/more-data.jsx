import React from "react";
import classes from "./more-data.module.css";
import { Thermometer, ThermometerSun, Wind } from "lucide-react";

const details = [
  {
    icon: <Thermometer color="#fafafaa0" size={35} />,
    name: "Real feel",
  },
  {
    icon: <Wind color="#fafafaa0" size={35} />,
    name: "Wind",
  },
  {
    icon: <ThermometerSun color="#fafafaa0" size={35} />,
    name: "Temp high",
  },
];

export default function MoreData() {
  return (
    <div className={`${classes.container} card`}>
      <h4 className="card-heading">Details</h4>
      <div className={classes.cards}>
        {details?.map((item) => (
          <DetailsCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

function DetailsCard({ name, icon }) {
  return (
    <div className={classes["details-card"]}>
      <div>{icon}</div>
      <div>
        <h5>{name}</h5>
        <h4>67</h4>
      </div>
    </div>
  );
}
