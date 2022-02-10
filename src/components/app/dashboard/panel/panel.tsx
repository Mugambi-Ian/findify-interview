import { FC } from "react";
import {
  ApplicationContext,
} from "../../../../assets/widgets/types/types";
import Product from "../../../../assets/models/product";
import CrumbsList from "./bread-crumbs/crumbs-list";
import ProductCard from "./products/product-card/product-card";
import ProductSkeleton from "./products/product-skeleton/product-skeleton";
import "./panel.scss";

const Panel: FC<{
  products: Product[];
}> = (p) => {

  return (
    <ApplicationContext.Consumer>
      {({ loaded }) => {
        return (
          <section id="panel">
            {loaded ? (
              <>
                <CrumbsList />
                <ul id="product-list">
                  {p.products.map((product, i) => {
                    return <ProductCard product={product} key={i} />;
                  })}
                  <div style={{ minWidth: "100%", minHeight: "50px" }} />
                </ul>
              </>
            ) : (
              <>
                <div id="bread-crumbs"></div>
                <ul id="product-list">
                  {[1, 2, 3, 4, 5, 6].map((v) => {
                    return <ProductSkeleton key={v} />;
                  })}
                  <div style={{ minWidth: "100%", minHeight: "50px" }} />
                </ul>
              </>
            )}
          </section>
        );
      }}
    </ApplicationContext.Consumer>
  );
};

export default Panel;
