import { FC } from "react";
import Facet from "../../../../../../../assets/models/facet";
import { FilterContext } from "../../../../../../../assets/widgets/types/types";
import FilterValues from "./fliter-values/filter-values";
import "./filter-details.scss"

const FilterDetails: FC<{
  facet: Facet;
  facet_index: number;
}> = (props) => {
  const { facet, facet_index } = props;

  return (
    <FilterContext.Consumer>
      {({ facet_ui, updateFacetUi }) => {
        return (
          <div
            id={facet_ui[facet_index].activated ? "on" : ""}
            className="facet-content"
          >
            <FilterValues facet={facet} facet_index={facet_index} />
            {facet.values.length > 6 && facet_ui[facet_index].activated ? (
              <button
                id="more-values"
                onClick={() =>
                  setTimeout(() => {
                    facet_ui[facet_index].display_more = !facet_ui[facet_index].display_more;
                    updateFacetUi(facet_ui);
                  }, 200)
                }
              >
                <span>
                  {facet_ui[facet_index].display_more ? "Less ➖" : "More ➕"}
                </span>
              </button>
            ) : (
              ""
            )}
          </div>
        );
      }}
    </FilterContext.Consumer>
  );
};

export default FilterDetails;
