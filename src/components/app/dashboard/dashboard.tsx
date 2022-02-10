import { FC, useEffect, useState } from "react";
import Facet from "../../../assets/models/facet";
import Dictionary from "../../../assets/utils/dictionary";
import { Color } from "../../../assets/models/colors";
import Product from "../../../assets/models/product";
import {
  BreadCrumb,
  FilterContext,
  FacetUi,
} from "../../../assets/widgets/types/types";
import NavBar from "./nav-bar/nav-bar";
import Panel from "./panel/panel";
import "./dashboard.scss";
import { resetCrumbs } from "../../../assets/utils/reset-crumbs";
import { loadFacetUI } from "../../../assets/utils/load-filters";


const Dashboard: FC<{
  facets: Facet[];
  colorSchema: Dictionary<Color>;
}> = (props) => {

  const [facet_ui, updateFilters] = useState<FacetUi[]>([]);

  useEffect(() => {
    updateFilters(loadFacetUI(props.facets));
  }, [props.facets]);

  const [crumbs, updateCrumbs] = useState<BreadCrumb>({
    range: [],
    color: [],
    text: [],
  });

  return (
    <FilterContext.Provider
      value={{
        facet_ui,
        crumbs,
        updateFacetUi: (facet_ui) => {
          updateFilters(facet_ui);
          resetCrumbs(facet_ui, props.colorSchema, (x) => updateCrumbs(x));
        },
      }}
    >
      <header id="title">
        <h1>Search Results</h1>
      </header>
      <main id="dashboard">
        <NavBar />
        <Panel />
      </main>
    </FilterContext.Provider>
  );
};

export default Dashboard;
