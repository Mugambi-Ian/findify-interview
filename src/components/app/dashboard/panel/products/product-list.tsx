import { FC } from "react";
import { ApplicationContext } from "../../../../../assets/widgets/types/types";
import Product from "../../../../../assets/models/product";
import "./panel.scss";
import ProductSkeleton from "./product-skeleton/product-skeleton";
import ProductCard from "./product-card/product-card";

const Panel: FC<{
    products: Product[];
}> = (props) => {
    return (
        <ApplicationContext.Consumer>
            {({ loaded }) => {
                return (
                    <ul id="product-list">
                        {loaded
                            ? props.products.map((product, i) => {
                                return <ProductCard key={i} product={product} />;
                            })
                            : [1, 2, 3, 4, 5, 6].map((v) => {
                                return <ProductSkeleton key={v} />;
                            })}
                        <div style={{ minWidth: "100%", minHeight: "50px" }} />
                    </ul>
                );
            }}
        </ApplicationContext.Consumer>
    );
};

export default Panel;
