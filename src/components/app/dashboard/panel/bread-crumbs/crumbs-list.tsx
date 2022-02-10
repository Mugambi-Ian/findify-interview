import { FC } from "react";
import ColorCrumbsList from "./color-crumbs/color-list";
import RangeCrumbsList from "./range-crumbs/range-list";
import TextCrumbsList from "./text-crumbs/text-list";

const CrumbsList: FC = () => {
  return <div id="bread-crumbs">
    <ColorCrumbsList />
    <RangeCrumbsList />
    <TextCrumbsList />
  </div>
}

export default CrumbsList;