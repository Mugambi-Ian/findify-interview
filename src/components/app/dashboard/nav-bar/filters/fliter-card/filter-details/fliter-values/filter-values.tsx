import { FC } from "react";
import Facet, { FacetType } from "../../../../../../../../assets/models/facet";
import { FilterContext } from "../../../../../../../../assets/widgets/types/types";
import ColorFilter from "./filter-types/filter-color";
import RangeFilter from "./filter-types/filter-range";
import TextFilter from "./filter-types/filter-text";

const FacetValueList: FC<{
    facet: Facet;
    facet_index: number;
}> = (props) => {

    const { facet, facet_index } = props;
    return (
        <FilterContext.Consumer>
            {({ facet_ui }) => {
                const values = !facet_ui[facet_index].display_more
                    ? facet.values.slice(0, 6)
                    : facet.values;
                return (
                    <ul
                        id="values-list"
                        style={!facet_ui[facet_index].activated ? { display: "none" } : {}}
                    >
                        {values.map((v, value_index) => {
                            return facet.type === FacetType.Text ? (
                                <TextFilter
                                    facetIndex={facet_index}
                                    valueIndex={value_index}
                                    facetValue={v}
                                />
                            ) : facet.type === FacetType.Color ? (
                                <ColorFilter
                                    facetIndex={facet_index}
                                    valueIndex={value_index}
                                    facetValue={v}
                                />
                            ) : facet.type === FacetType.Range ? (
                                <RangeFilter facetIndex={facet_index} facetValue={v} />
                            ) : (
                                ""
                            );
                        })}
                    </ul>
                );
            }}
        </FilterContext.Consumer>
    );
};

export default FacetValueList;
