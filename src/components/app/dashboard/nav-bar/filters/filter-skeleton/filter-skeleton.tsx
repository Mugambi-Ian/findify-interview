import { FC } from "react";
import "./filter-skeleton.scss"

const FilterSkeleton: FC<{ key: number }> = (p) => {
  return (
    <li id="filter-item" key={p.key}>
      <header>
        <h3 className="skeleton"> </h3>
      </header>
    </li>
  );
};

export default FilterSkeleton;
