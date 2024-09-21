import React from "react";
import classes from "./weather-details.module.css";

export default function LoadingSkeleton() {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div>
          <div className={classes["main-data"]}>
            <div
              style={{ height: "2rem", width: "100%" }}
              className="skeleton-bg animate-pulse"
            ></div>
            <div
              style={{ height: "1rem", width: "100%", marginTop: "0.3rem" }}
              className="skeleton-bg animate-pulse"
            ></div>
          </div>
          <div
            style={{ height: "2.7rem", width: "100%" }}
            className="skeleton-bg animate-pulse"
          ></div>
        </div>
        <div className={`skeleton-bg animate-pulse ${classes.icon}`}></div>
      </div>
    </div>
  );
}
