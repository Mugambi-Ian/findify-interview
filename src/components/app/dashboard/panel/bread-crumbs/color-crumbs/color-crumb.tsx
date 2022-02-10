import { FC } from "react";
import { Color } from "../../../../../../assets/models/colors";
import {
	BreadCrumbColor,
	FilterContext,
} from "../../../../../../assets/widgets/types/types";

const ColorCrumb: FC<{
	crumb: BreadCrumbColor;
	value: { color: Color | null; index: number };
	key?: number;
}> = (p) => {
	const { color, index } = p.value;
	const { facet_index } = p.crumb;
	return (
		<FilterContext.Consumer>
			{({ facet_ui, updateFacetUi }) => {
				return (
					<button
						key={"color:" + facet_index + "-" + p.key}
						id="crumb-value"
						onClick={() =>
							setTimeout(() => {
								facet_ui[facet_index].selected[index].activated = false;
								updateFacetUi(facet_ui);
							}, 200)
						}
					>
						<div
							style={
								color?.isHex
									? {
										backgroundColor: color?.code,
										border:
											color?.isWhite()
												? "1px solid #939393"
												: "unset",
									}
									: {
										backgroundImage: `url(${color?.code})`,
									}
							}
						/>
						<span id="close">✖</span>
					</button>
				);
			}}
		</FilterContext.Consumer>
	);
};

export default ColorCrumb;
