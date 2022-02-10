import { FC } from "react";
import Facet from "../../../../../../assets/models/facet";
import { FilterContext } from "../../../../../../assets/widgets/types/types";
import FilterDetails from "./filter-details/filter-details";
import "./filter-card.scss"

const FilterCard: FC<{
  facet: Facet;
  facet_index: number;
}> = (props) => {
  const { facet, facet_index } = props;
  return (
    <FilterContext.Consumer>
      {({ facet_ui, updateFacetUi }) => {
        return (
          <li id="filter-item">
            <header>
              <h3>{facet.name}</h3>
              <button
                onClick={() =>
                  setTimeout(() => {
                    facet_ui[facet_index].display_more = facet_ui[facet_index].activated
                      ? false
                      : facet_ui[facet_index].display_more;
                    facet_ui[facet_index].activated = !facet_ui[facet_index].activated;
                    updateFacetUi(facet_ui);
                  }, 200)
                }
              >
                <span>{facet_ui[facet_index].activated ? "➖" : "➕"}</span>
              </button>
            </header>
            <FilterDetails facet_index={facet_index} facet={facet} />
          </li>
        );
      }}
    </FilterContext.Consumer>
  );
};

export default FilterCard;
