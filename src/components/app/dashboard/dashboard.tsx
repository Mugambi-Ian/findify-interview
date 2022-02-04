import React, { useEffect, useReducer, useState } from "react";
import Facet, { FacetType, FacetValue } from "../../../assets/models/facet";
import Dictionary from "../../../assets/utils/dictionary";
import { Color } from "../../../assets/models/colors";
import Product from "../../../assets/models/product";
import {
  BreadCrumb,
  BreadCrumbColor,
  BreadCrumbRange,
  BreadCrumbText,
  FacetUi,
} from "../../../assets/widgets/types/types";
import NavBar from "./nav-bar/nav-bar";
import Panel from "./panel/panel";
import "./dashboard.scss";

const Dashboard: React.FC<{
  products: Product[];
  facets: Facet[];
  colorSchema: Dictionary<Color>;
  loaded: boolean;
}> = (props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [facet_ui, updateFacetUi] = useState<FacetUi[]>(
    props.facets.map((p) => {
      const selected =
        p.type === FacetType.Color || p.type === FacetType.Text
          ? p.values.map((x, i) => {
              return {
                value: x,
                activated: false,
                min_range: -1,
                max_range: -1,
                index: i,
              };
            })
          : [
              {
                value: p.values[0],
                activated: false,
                min_range: -1,
                max_range: -1,
                index: 0,
              },
            ];
      return {
        activated: false,
        display_more: false,
        selected,
        value: p,
      };
    })
  );

  const [crumbs, updateCrumbs] = useState<BreadCrumb>({
    range: [],
    colors: [],
    text: [],
  });

  const resetCrumbs = (facet_ui: FacetUi[]) => {
    const range: BreadCrumbRange[] = [];
    const colors: BreadCrumbColor[] = [];
    const text: BreadCrumbText[] = [];

    facet_ui.forEach((f, i) => {
      switch (f.value.type) {
        case FacetType.Range:
          if (f.selected[0].activated) {
            const { min_range, max_range } = f.selected[0];
            range.push({
              min_range,
              max_range,
              facet_name: f.value.name,
              facet_index: i,
              default_range: f.selected[0].value.value,
            });
          }
          break;
        case FacetType.Color:
          let r = f.selected.filter((x, i) => {
            return x.activated;
          });
          const values = r.map((x) => {
            return {
              color: props.colorSchema.get(x.value.value),
              index: x.index,
            };
          });
          if (values.length !== 0)
            colors.push({
              facet_name: f.value.name,
              values,
              facet_index: i,
            });
          break;
        case FacetType.Text:
          let t = f.selected.filter((x) => {
            return x.activated;
          });
          const _t = t.map((x) => {
            const { value, index } = x;
            return { value, index };
          });
          if (_t.length !== 0)
            text.push({
              facet_name: f.value.name,
              values: _t,
              facet_index: i,
            });
          break;
        default:
          break;
      }
    });
    updateCrumbs({
      colors,
      range,
      text,
    });
  };

  return (
    <main id="dashboard">
      <NavBar
        facet_ui={facet_ui}
        colorSchema={props.colorSchema}
        facets={props.facets}
        updateFacetUi={(x) => {
          updateFacetUi(x);
          resetCrumbs(x);
          forceUpdate();
        }}
      />
      <Panel
        crumbs={crumbs}
        products={props.products}
        facet_ui={facet_ui}
        updateFacetUi={(x) => {
          updateFacetUi(x);
          resetCrumbs(x);
          forceUpdate();
        }}
      />
    </main>
  );
};

export default Dashboard;
