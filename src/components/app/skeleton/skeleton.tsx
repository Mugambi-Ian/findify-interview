import React, { useState } from "react";
import "./skeleton.css";

const DashboardSkeleton: React.FC = () => {
  return (
    <section id="dashboard" className="skeleton">
      <title></title>
      <main>
        <nav>
          <header>
            <h1> </h1>
          </header>
        </nav>
        <section id="main-content">
          <header>
            <h1> </h1>
          </header>
          <ul className="product-list">
            <li className="product-item">
              <img alt="logo" />
              <h1> </h1>
              <h4> </h4>
            </li>
            <li className="product-item">
              <img alt="logo" />
              <h1> </h1>
              <h4> </h4>
            </li>
            <li className="product-item">
              <img alt="logo" />
              <h1> </h1>
              <h4> </h4>
            </li>
          </ul>
        </section>
      </main>
    </section>
  );
};

export default DashboardSkeleton;
