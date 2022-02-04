import React from "react";
import "./skeleton.scss";

const DashboardSkeleton: React.FC = () => {
  const products = (): JSX.Element => {
    return (
      <li id="product-item">
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            id="skeleton"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              overflow: "hidden",
            }}
          />
        </div>
        <div
          style={{
            background: "#fff",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "120px",
          }}
        >
          <h1> </h1>
          <h4> </h4>
        </div>
      </li>
    );
  };
  return (
    <main id="dashboard" className="skeleton">
      <nav>
        <header id="title">
          <h1>Search Results</h1>
          <img
            onClick={() =>
              window.open("https://github.com/Mugambi-Ian", "_blank")
            }
            src={require("../../../assets/img/ic-github.png")}
            alt="findify"
          />
        </header>
        <header id="filter-title">
          <h2>Filters</h2>
          <img
            src={require("../../../assets/img/ic-filter.png")}
            alt="filter"
          />
        </header>
        <ul id="facet-list">
          <li id="facet-item">
            <header>
              <h3> </h3>
            </header>
          </li>
          <li id="facet-item">
            <header>
              <h3> </h3>
            </header>
          </li>
          <li id="facet-item">
            <header>
              <h3> </h3>
            </header>
          </li>
        </ul>
      </nav>
      <section id="panel">
        <div id="bread-crumbs"></div>
        <ul id="product-list">
          {products()}
          {products()}
          {products()}
          {products()}
          {products()}
          {products()}
          {products()}
        </ul>
      </section>
    </main>
  );
};

export default DashboardSkeleton;
