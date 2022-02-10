import { FC } from "react";
import { FacetValue } from "../../../../../../../../../assets/models/facet";
import {
  ApplicationContext,
  FilterContext,
} from "../../../../../../../../../assets/widgets/types/types";
import checkSvg from "../../../../assets/img/bg-check.svg";

const ColorFilter: FC<{
  facetValue: FacetValue;
  valueIndex: number;
  facetIndex: number;
}> = (p) => {

  return (
    <ApplicationContext.Consumer>
      {({ colorSchema }) => {
        const color = colorSchema.get(p.facetValue.value);
        return (
          <FilterContext.Consumer>
            {({ facet_ui, updateFacetUi }) => (
              <li key={p.facetIndex + "-" + p.valueIndex} id="value-item">
                <button
                  onClick={() =>
                    setTimeout(() => {
                      facet_ui[p.facetIndex].selected[p.valueIndex].activated =
                        !facet_ui[p.facetIndex].selected[p.valueIndex].activated;
                      updateFacetUi(facet_ui);
                    }, 200)
                  }
                  className="color"
                  id="select"
                  style={
                    color?.isHex
                      ? { backgroundColor: color?.code }
                      : {
                        backgroundImage: `url(${color?.code})`,
                      }
                  }
                >
                  {facet_ui[p.facetIndex].selected[p.valueIndex].activated ? (
                    <img src={checkSvg} alt="check-mark" id="check" />
                  ) : (
                    ""
                  )}
                </button>
                <h6>{p.facetValue.value}</h6>
                <p>{p.facetValue.count}</p>
              </li>
            )}
          </FilterContext.Consumer>
        );
      }}
    </ApplicationContext.Consumer>
  );
};

export default ColorFilter;
