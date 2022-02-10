import { FC } from "react";
import { FilterContext } from "../../../../../../assets/widgets/types/types";
import TextCrumb from "./text-crumb";

const TextCrumbsList: FC = () => {
  return <FilterContext.Consumer>
    {({ crumbs }) => {
      return crumbs.text.length !== 0 ? (
        <>
          {crumbs.text.map((bread_crumb, bc_index) => {
            return (
              <>
                {/*  <p id="crumb-category" key={"text:" + bc_index}>
                  {bread_crumb.facet_name}:{" "}
                </p> */}
                <>
                  {bread_crumb.values.map(
                    (crumb_value, cv_index: number) => {
                      return <TextCrumb crumb={bread_crumb} value={crumb_value} key={cv_index} />
                    }
                  )}
                </>
              </>
            );
          })}
        </>
      ) : (
        ""
      )
    }}
  </FilterContext.Consumer>
}

export default TextCrumbsList;