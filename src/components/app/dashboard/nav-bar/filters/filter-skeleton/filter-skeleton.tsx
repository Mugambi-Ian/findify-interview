import { FC } from "react";

const FilterSkeleton: FC<{ key: number }> = (p) => {
  return (
    <li id="facet-item" key={p.key}>
      <header>
        <h3 className="skeleton"> </h3>
      </header>
    </li>
  );
};

export default FilterSkeleton;
