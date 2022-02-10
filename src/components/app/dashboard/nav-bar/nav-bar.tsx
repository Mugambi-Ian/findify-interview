import { FC } from "react";
import { ApplicationContext } from "../../../../assets/widgets/types/types";
import FilterCard from "./filters/fliter-card/filter-card";
import FilterSkeleton from "./filters/filter-skeleton/filter-skeleton";
import "./nav-bar.scss";

const NavBar: FC<{
}> = (props) => {

  return (
    <ApplicationContext.Consumer>
      {({ loaded, facets }) => {
        return (
          <nav>

            <header id="filter-title">
              <h2>Filters</h2>
            </header>
            <ul id="filter-list">
              {loaded
                ? facets.map((facet, i) => {
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
