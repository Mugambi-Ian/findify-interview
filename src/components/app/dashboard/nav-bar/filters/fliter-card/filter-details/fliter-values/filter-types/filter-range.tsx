import { FC } from "react";
import { FacetValue } from "../../../../../../../../../assets/models/facet";
import { FilterContext } from "../../../../../../../../../assets/widgets/types/types";
import Slider from "../../../../../../../../../assets/widgets/slider/slider";

const RangeFilter: FC<{
  facetValue: FacetValue;
  facetIndex: number;
}> = (props) => {
  const {
    facetValue: { value },
    facetIndex,
  } = props;

  const min_value = parseInt(value.split("_")[0]);
  const max_value = parseInt(value.split("_")[1]);
  return (
    <FilterContext.Consumer>
      {({ facet_ui, updateFacetUi }) => (
        <li key={facetIndex + "-0"} id="value-item">
          <Slider
            currency={true}
            maxValue={max_value}
            minValue={min_value}
            value={{
              max: facet_ui[facetIndex].selected[0].max_range,
              min: facet_ui[facetIndex].selected[0].min_range,
            }}
            onChange={(min, max) =>
              setTimeout(() => {
                facet_ui[facetIndex].selected[0].activated =
                  min !== min_value || max !== max_value;
                if (min) {
                  facet_ui[facetIndex].selected[0].min_range = min;
                  updateFacetUi(facet_ui);
                }
                if (max) {
                  facet_ui[facetIndex].selected[0].max_range = max;
                  updateFacetUi(facet_ui);
                }
              }, 200)
            }
          />
        </li>
      )}
    </FilterContext.Consumer>
  );
};

export default RangeFilter;
