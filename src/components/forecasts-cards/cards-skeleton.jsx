import React from "react";
import classes from "./forecasts-cards.module.css";

export default function CardsSkeleton() {
  return (
    <div className={classes["skeleton-cards"]}>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className={`animate-pulse ${classes["skeleton-card"]}`}>
      <div className={`skeleton-bg line-skeleton`}></div>
      <div className={`skeleton-bg square-skeleton`}></div>
      <div className={`skeleton-bg line-skeleton`}></div>
    </div>
  );
}
