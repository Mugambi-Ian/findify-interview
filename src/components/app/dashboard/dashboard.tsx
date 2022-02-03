import React, { useReducer, useState } from "react";
import Facet, { FacetType, FacetValue } from "../../../assets/models/facet";
import Dictionary from "../../../assets/utils/dictionary";
import rightSvg from "../../../assets/img/right-top.svg";
import leftSvg from "../../../assets/img/left-top.svg";
import { Color } from "../../../assets/models/colors";
import Product from "../../../assets/models/product";
import checkSvg from "../../../assets/img/check.svg";
import boxSvg from "../../../assets/img/box.svg";
import "./dashboard.scss";

const Dashboard: React.FC<{
  products: Product[];
  facets: Facet[];
  colorSchema: Dictionary<Color>;
  loaded: boolean;
}> = (props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [activeFacets, switchFacetState] = useState<
    {
      facet: boolean;
      more: boolean;
      selected: { value: FacetValue; active: boolean }[];
    }[]
  >(
    props.facets.map((p) => {
      const selected =
        p.type === FacetType.Color || p.type === FacetType.Text
          ? p.values.map((x) => {
              return { value: x, active: false };
            })
          : [];
      return {
        facet: false,
        more: false,
        selected,
      };
    })
  );

  const facetValues = (
    values: { value: string; count: number }[],
    type: FacetType,
    facetIndex: number
  ): JSX.Element[] => {
    return values.map((v, i) => {
      return (
        <li key={i} id="value-item">
          {facetTypeWidget(v, type, i, facetIndex)}
          <h6>{v.value}</h6>
          <p>({v.count})</p>
        </li>
      );
    });
  };

  const facetTypeWidget = (
    value: { value: string; count: number },
    type: FacetType,
    valueIndex: number,
    facetIndex: number
  ): JSX.Element => {
    switch (type) {
      case FacetType.Text:
        return (
          <button
            id="select"
            onClick={() =>
              setTimeout(() => {
                activeFacets[facetIndex].selected[valueIndex].active =
                  !activeFacets[facetIndex].selected[valueIndex].active;
                switchFacetState(activeFacets);
                forceUpdate();
              }, 200)
            }
          >
            <img src={boxSvg} alt="icon" id="box" />
            {activeFacets[facetIndex].selected[valueIndex].active ? (
              <img src={checkSvg} alt="check-mark" id="check" />
            ) : (
              ""
            )}
          </button>
        );
      case FacetType.Color:
        const color = props.colorSchema.get(value.value);
        return (
          <button
            className="color"
            id="select"
            style={
              color?.isHex
                ? { backgroundColor: color.code }
                : {
                    backgroundImage: `url(${color?.code})`,
                  }
            }
          >
            {activeFacets[facetIndex].selected[valueIndex].active ? (
              <img src={checkSvg} alt="check-mark" id="check" />
            ) : (
              ""
            )}
          </button>
        );
      default:
        return <div />;
    }
  };

  return (
    <section id="dashboard">
      <header id="title">
        <div>
          <img src={"/favicon.ico"} alt="findify" />
          <h1>Search Results</h1>
        </div>
        <span />
      </header>
      <main>
        <nav>
          <header id="filter-title">
            <h2>Filters</h2>
          </header>
          <ul id="facet-list">
            {props.facets.map((facet, i) => {
              return (
                <li id="facet-item">
                  <header>
                    <h3>{facet.name}</h3>
                    <button
                      onClick={() =>
                        setTimeout(() => {
                          activeFacets[i].more = activeFacets[i].facet
                            ? false
                            : activeFacets[i].more;
                          activeFacets[i].facet = !activeFacets[i].facet;
                          switchFacetState(activeFacets);
                          forceUpdate();
                        }, 200)
                      }
                    >
                      <span>{activeFacets[i].facet ? "➖" : "➕"}</span>
                    </button>
                  </header>
                  <div
                    id={activeFacets[i].facet ? "on" : ""}
                    className="facet-content"
                  >
                    <ul
                      id="values-list"
                      style={!activeFacets[i].facet ? { display: "none" } : {}}
                    >
                      {facetValues(
                        !activeFacets[i].more
                          ? facet.values.slice(0, 6)
                          : facet.values,
                        facet.type,
                        i
                      )}
                    </ul>
                    {facet.values.length > 6 && activeFacets[i].facet ? (
                      <button
                        id="more-values"
                        onClick={() =>
                          setTimeout(() => {
                            activeFacets[i].more = !activeFacets[i].more;
                            switchFacetState(activeFacets);
                            forceUpdate();
                          }, 200)
                        }
                      >
                        <span>
                          {activeFacets[i].more ? "Less ➖" : "More ➕"}
                        </span>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <section id="main">
          <header id="filter-title"></header>
          <ul id="product-list">
            {props.products.map((product, i) => {
              return (
                <li
                  id="product-item"
                  key={i}
                  onClick={() =>
                    setTimeout(() => {
                      window.open(product.product_url, "_blank");
                    }, 200)
                  }
                >
                  <div id="image">
                    <img alt="logo" src={product.image_url} />
                    {product.compare_at ? (
                      <>
                        <img alt="logo" src={leftSvg} className="left" />
                        <h5 className="left">
                          {(
                            ((product.compare_at - product.price) /
                              product.compare_at) *
                            100
                          ).toFixed(0)}
                          % Off
                        </h5>
                        <img alt="logo" src={rightSvg} className="right" />
                        <h5 className="right">Sale</h5>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div style={{ flex: 1 }} />
                  <h1>{product.title}</h1>
                  {product.compare_at ? (
                    <div id="compare">
                      <h4>${product.compare_at}</h4>
                      <h4>${product.price}</h4>
                    </div>
                  ) : (
                    <h4>${product.price}</h4>
                  )}
                </li>
              );
            })}
            <div style={{ minWidth: "100%", minHeight: "50px" }} />
          </ul>
        </section>
      </main>
    </section>
  );
};

export default Dashboard;
