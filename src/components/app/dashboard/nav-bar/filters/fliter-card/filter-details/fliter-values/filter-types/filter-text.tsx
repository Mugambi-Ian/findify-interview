import { FC } from "react";
import { FacetValue } from "../../../../../../../../../assets/models/facet";
import { FilterContext } from "../../../../../../../../../assets/widgets/types/types";
import checkSvg from "../../../../../../../../../assets/img/bg-check.svg";
import boxSvg from "../../../../../../../../../assets/img/bg-box.svg";

const TextFilter: FC<{
  facetValue: FacetValue;
  valueIndex: number;
  facetIndex: number;
}> = (props) => {
  const {
    facetValue: { count, value },
    valueIndex,
    facetIndex,
  } = props;

  return (
    <FilterContext.Consumer>
      {({ facet_ui, updateFacetUi }) => (
        <li key={facetIndex + "-" + valueIndex} id="value-item">
          <button
            id="select"
            onClick={() =>
              setTimeout(() => {
                facet_ui[facetIndex].selected[valueIndex].activated =
                  !facet_ui[facetIndex].selected[valueIndex].activated;
                updateFacetUi(facet_ui);
              }, 200)
            }
          >
            <img src={boxSvg} alt="icon" id="box" />
            {facet_ui[facetIndex].selected[valueIndex].activated ? (
              <img src={checkSvg} alt="check-mark" id="check" />
            ) : (
              ""
            )}
          </button>
          <h6>{value}</h6>
          <p>({count})</p>
        </li>
      )}
    </FilterContext.Consumer>
  );
};

export default TextFilter;
