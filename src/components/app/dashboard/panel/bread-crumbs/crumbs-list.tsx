import { FC } from "react";
import { ApplicationContext } from "../../../../../assets/widgets/types/types";
import ColorCrumbsList from "./color-crumbs/color-list";
import RangeCrumbsList from "./range-crumbs/range-list";
import TextCrumbsList from "./text-crumbs/text-list";
import "./crumbs-list.scss"

const CrumbsList: FC = () => {
  return <ApplicationContext.Consumer>
    {({ loaded }) => {
      return loaded ? (<div id="bread-crumbs">
        <ColorCrumbsList />
        <RangeCrumbsList />
        <TextCrumbsList />
      </div>) : <div id="bread-crumbs" />
    }}</ApplicationContext.Consumer>
}

export default CrumbsList;