import { FC } from "react";
import { FilterContext } from "../../../../../../assets/widgets/types/types";
import ColorCrumb from "./color-crumb";

const ColorCrumbsList: FC = () => {
  return <FilterContext.Consumer>
    {({ crumbs }) => {
      return <>
        {crumbs.color.length !== 0 ? (
          <>
            {crumbs.color.map((bread_crumb, bc_index) => {
              return (
                <>
                  <p id="crumb-category" key={bc_index}>
                    {bread_crumb.facet_name}:
                  </p>
                  {bread_crumb.values.map(
                    (crumb_value, cv_index) => {
                      return <ColorCrumb crumb={bread_crumb} value={crumb_value} key={cv_index} />
                    }
                  )}
                </>
              );
            })}
          </>
        ) : (
          ""
        )}
        {crumbs.color.length !== 0 &&
          (crumbs.range.length !== 0 || crumbs.text.length !== 0) ? (
          <p className="slash">/</p>
        ) : (
          ""
        )}
      </>
    }}
  </FilterContext.Consumer>
}

export default ColorCrumbsList;