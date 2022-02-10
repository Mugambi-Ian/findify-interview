import { FC } from "react";
import { FilterContext } from "../../../../../../assets/widgets/types/types";
import RangeCrumb from "./range-crumb";

const RangeCrumbsList: FC = () => {
  return <FilterContext.Consumer>
    {({ crumbs }) => {
      return <>
        {crumbs.range.length !== 0 ? (
          <>
            <>
              {crumbs.range.map((facet, fc_index) => {
                return (
                  <>
                    <p id="crumb-category" key={"range:" + fc_index}>
                      {facet.facet_name}:
                    </p>
                    <RangeCrumb crumb={facet} />
                  </>
                );
              })}
            </>
          </>
        ) : (
          ""
        )}
        {crumbs.text.length !== 0 && crumbs.range.length ? (
          <p className="slash">/</p>
        ) : (
          ""
        )}</>
    }}
  </FilterContext.Consumer>
}

export default RangeCrumbsList;