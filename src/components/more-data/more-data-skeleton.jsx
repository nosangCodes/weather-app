import React from "react";

export default function MoreDataSkeleton() {
  return (
    <>
      <Card />
      <Card />
      <Card />
      <Card />
    </>
  );
}

function Card() {
  return (
    <div
      style={{ width: "100%" }}
      className="skeleton-bg animate-pulse square-skeleton"
    ></div>
  );
}
