import { FC } from "react";
import {
  BreadCrumb,
  Context,
  FacetUi,
} from "../../../../assets/widgets/types/types";
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
  const productSkeleton = (key: number): JSX.Element => {
    return (
      <li id="product-item" key={key}>
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="skeleton"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              overflow: "hidden",
            }}
          />
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
          <h1 className="skeleton"> </h1>
          <h4 className="skeleton"> </h4>
        </div>
      </li>
    );
  };

  const productCard = (
    product: Product,
    key: number,
    skeleton?: boolean
  ): JSX.Element => {
    return (
      <li
        className={skeleton ? "skeleton" : ""}
        id="product-item"
        key={key}
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
  };
  return (
    <Context.Consumer>
      {({ loaded }) => {
        return (
          <section id="panel">
            {loaded ? (
              <>
                <div id="bread-crumbs">
                  {crumbs.colors.length !== 0 ? (
                    <>
                      <>
                        {crumbs.colors.map((bread_crumb, bc_index) => {
                          return (
                            <>
                              <p id="crumb-category" key={bc_index}>
                                {bread_crumb.facet_name}:
                              </p>
                              {bread_crumb.values.map(
                                (crumb_value, cv_index) => {
                                  const { color } = crumb_value;
                                  return (
                                    <button
                                      key={"color:" + bc_index + "-" + cv_index}
                                      id="crumb-value"
                                      onClick={() =>
                                        setTimeout(() => {
                                          facet_ui[
                                            bread_crumb.facet_index
                                          ].selected[
                                            crumb_value.index
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
                                }
                              )}
                            </>
                          );
                        })}
                      </>
                    </>
                  ) : (
                    ""
                  )}
                  {crumbs.colors.length !== 0 &&
                  (crumbs.range.length !== 0 || crumbs.text.length !== 0) ? (
                    <p className="slash">/</p>
                  ) : (
                    ""
                  )}
                  {crumbs.range.length !== 0 ? (
                    <>
                      <>
                        {crumbs.range.map((facet, fc_index) => {
                          return (
                            <>
                              <p id="crumb-category" key={"range:" + fc_index}>
                                {facet.facet_name}:
                              </p>
                              <button
                                key={"range:" + fc_index + "-value"}
                                id="crumb-value"
                                onClick={() =>
                                  setTimeout(() => {
                                    facet_ui[
                                      facet.facet_index
                                    ].selected[0].max_range = parseInt(
                                      facet.default_range.split("_")[1]
                                    );
                                    facet_ui[
                                      facet.facet_index
                                    ].selected[0].min_range = parseInt(
                                      facet.default_range.split("_")[0]
                                    );
                                    facet_ui[
                                      facet.facet_index
                                    ].selected[0].activated = false;
                                    updateFacetUi(facet_ui);
                                  }, 200)
                                }
                              >
                                <p id="text">
                                  ${facet.min_range} - ${facet.max_range}
                                </p>
                                <span id="close">✖</span>
                              </button>
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
                  )}
                  {crumbs.text.length !== 0 ? (
                    <>
                      {crumbs.text.map((bread_crumb, bc_index) => {
                        return (
                          <>
                            <p id="crumb-category" key={"text:" + bc_index}>
                              {bread_crumb.facet_name}:{" "}
                            </p>
                            <>
                              {bread_crumb.values.map(
                                (crumb_value, cv_index: number) => {
                                  const { value } = crumb_value;
                                  return (
                                    <button
                                      key={"text:" + bc_index + "-" + cv_index}
                                      id="crumb-value"
                                      onClick={() =>
                                        setTimeout(() => {
                                          facet_ui[
                                            bread_crumb.facet_index
                                          ].selected[
                                            crumb_value.index
                                          ].activated = false;
                                          updateFacetUi(facet_ui);
                                        }, 200)
                                      }
                                    >
                                      <p id="text">{value.value}</p>
                                      <span>✖</span>
                                    </button>
                                  );
                                }
                              )}
                            </>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <ul id="product-list">
                  {products.map((product, i) => {
                    return productCard(product, i);
                  })}
                  <div style={{ minWidth: "100%", minHeight: "50px" }} />
                </ul>
              </>
            ) : (
              <>
                <div id="bread-crumbs"></div>
                <ul id="product-list">
                  {[1, 2, 3, 4, 5, 6].map((v) => {
                    return productSkeleton(v);
                  })}
                  <div style={{ minWidth: "100%", minHeight: "50px" }} />
                </ul>
              </>
            )}
          </section>
        );
      }}
    </Context.Consumer>
  );
};

export default Panel;
