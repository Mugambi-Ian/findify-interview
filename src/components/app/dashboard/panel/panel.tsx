import { FC } from "react";
import { BreadCrumb, FacetUi } from "../../../../assets/widgets/types/types";
import rightSvg from "../../../../assets/img/bg-rightTop.svg";
import leftSvg from "../../../../assets/img/bg-leftTop.svg";
import Product from "../../../../assets/models/product";
import "./panel.scss";

const Panel: FC<{
  products: Product[];
  crumbs: BreadCrumb;
  facet_ui: FacetUi[];
  updateFacetUi: (facet_ui: FacetUi[]) => void;
}> = (props) => {
  const { crumbs, products, facet_ui, updateFacetUi } = props;
  return (
    <section id="panel">
      <div id="bread-crumbs">
        {crumbs.colors.length !== 0 ? (
          <>
            <ul id="color-crumbs">
              {crumbs.colors.map((x, i) => {
                return (
                  <li id="crumb-category" key={i}>
                    <p>{x.facet_name}: </p>
                    <ul id="crumbs-list">
                      {x.values.map((c, _i) => {
                        const { color } = c;
                        return (
                          <button
                            id="crumb-value"
                            onClick={() =>
                              setTimeout(() => {
                                facet_ui[x.facet_index].selected[
                                  c.index
                                ].activated = false;
                                updateFacetUi(facet_ui);
                              }, 200)
                            }
                          >
                            <div
                              style={
                                color?.isHex
                                  ? { backgroundColor: color?.code }
                                  : {
                                      backgroundImage: `url(${color?.code})`,
                                    }
                              }
                            />
                            <span id="close">✖</span>
                          </button>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          ""
        )}
        {crumbs.range.length !== 0 ? (
          <>
            <ul id="text-crumbs">
              {crumbs.range.map((x, i) => {
                return (
                  <li id="crumb-category" key={i}>
                    <p>{x.facet_name}: </p>
                    <button
                      id="crumb-value"
                      onClick={() =>
                        setTimeout(() => {
                          facet_ui[x.facet_index].selected[0].max_range =
                            parseInt(x.default_range.split("_")[1]);
                          facet_ui[x.facet_index].selected[0].min_range =
                            parseInt(x.default_range.split("_")[0]);
                          facet_ui[x.facet_index].selected[0].activated = false;
                          updateFacetUi(facet_ui);
                        }, 200)
                      }
                    >
                      <p id="text">
                        ${x.min_range} - ${x.max_range}
                      </p>
                      <span id="close">✖</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          ""
        )}
        {crumbs.text.length !== 0 ? (
          <>
            <ul id="text-crumbs">
              {crumbs.text.map((x, i) => {
                return (
                  <li id="crumb-category" key={i}>
                    <p>{x.facet_name}: </p>
                    <ul id="crumbs-list">
                      {x.values.map((c, _i) => {
                        const { value } = c;
                        return (
                          <button
                            id="crumb-value"
                            onClick={() =>
                              setTimeout(() => {
                                facet_ui[x.facet_index].selected[
                                  c.index
                                ].activated = false;
                                updateFacetUi(facet_ui);
                              }, 200)
                            }
                          >
                            <p id="text">{value.value}</p>
                            <span>✖</span>
                          </button>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
      <ul id="product-list">
        {products.map((product, i) => {
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
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(" + product.image_url + ")",
                    filter: "blur(5px) brightness(1)",
                    opacity: 0.5,
                    position: "absolute",
                    overflow: "hidden",
                  }}
                />
                <div id="image">
                  <img alt="logo" src={product.image_url} id="logo" />
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
              </div>
              <div
                style={{
                  background: "#fff",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "120px",
                }}
              >
                <h1>{product.title}</h1>
                {product.compare_at ? (
                  <div id="compare">
                    <h4>${product.compare_at}</h4>
                    <h4>${product.price}</h4>
                  </div>
                ) : (
                  <h4>${product.price}</h4>
                )}
              </div>
            </li>
          );
        })}
        <div style={{ minWidth: "100%", minHeight: "50px" }} />
      </ul>
    </section>
  );
};

export default Panel;
