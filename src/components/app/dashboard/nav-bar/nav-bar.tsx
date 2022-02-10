import { FC } from "react";
import Facet from "../../../../assets/models/facet";
import { ApplicationContext } from "../../../../assets/widgets/types/types";
import FilterCard from "./filters/fliter-card/filter-card";
import FilterSkeleton from "./filters/filter-skeleton/filter-skeleton";
import "./nav-bar.scss";

const NavBar: FC<{
  facets: Facet[];
}> = (props) => {

  return (
    <ApplicationContext.Consumer>
      {({ loaded }) => {
        return (
          <nav>
            <header id="title">
              <h1>Search Results</h1>
              <img
                onClick={() =>
                  window.open("https://github.com/Mugambi-Ian", "_blank")
                }
                src={require("../.../../../../../assets/img/ic-github.png")}
                alt="me"
              />
            </header>
            <header id="filter-title">
              <h2>Filters</h2>
              <img
                src={require("../../../../assets/img/ic-filter.png")}
                alt="filter"
              />
            </header>
            <ul id="filter-list">
              {loaded
                ? props.facets.map((facet, i) => {
                  return <FilterCard facet={facet} facet_index={i} />;
                })
                : [1, 2, 3].map((v) => {
                  return <FilterSkeleton key={v} />;
                })}
            </ul>
          </nav>
        );
      }}
    </ApplicationContext.Consumer>
  );
};

export default NavBar;
