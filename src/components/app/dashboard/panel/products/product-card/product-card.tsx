import { FC } from "react";
import rightSvg from "../../../../../../assets/img/bg-rightTop.svg";
import leftSvg from "../../../../../../assets/img/bg-leftTop.svg";
import Product from "../../../../../../assets/models/product";
import "./product-card.scss"

const ProductCard: FC<{
    product: Product;
    key?: number;
}> = (p) => {
    return (
        <li
            id="product-item"
            key={p.key}
            onClick={() =>
                setTimeout(() => {
                    window.open(p.product.product_url, "_blank");
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
                <div id="image">
                    <img alt="logo" src={p.product.image_url} id="logo" />
                    {p.product.compare_at ? (
                        <>
                            <img alt="logo" src={leftSvg} className="left" />
                            <h5 className="left">
                                {(
                                    ((p.product.compare_at - p.product.price) /
                                        p.product.compare_at) *
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
                <h1>{p.product.title}</h1>
                {p.product.compare_at ? (
                    <div id="compare">
                        <h4>${p.product.compare_at}</h4>
                        <h4>${p.product.price}</h4>
                    </div>
                ) : (
                    <h4>${p.product.price}</h4>
                )}
            </div>
        </li>
    );
};

export default ProductCard;
