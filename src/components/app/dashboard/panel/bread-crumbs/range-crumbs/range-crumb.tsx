import { FC } from "react";
import {
	BreadCrumbRange,
	FilterContext,
} from "../../../../../../assets/widgets/types/types";

const RangeCrumb: FC<{
	crumb: BreadCrumbRange;
}> = (p) => {
	const { facet_index, default_range, max_range, min_range } = p.crumb;
	return (
		<FilterContext.Consumer>
			{({ facet_ui, updateFacetUi }) => {
				return (
					<button
						key={"range:" + facet_index + "-value"}
						id="crumb-value"
						onClick={() =>
							setTimeout(() => {
								facet_ui[facet_index].selected[0].max_range = parseInt(
									default_range.split("_")[1]
								);
								facet_ui[facet_index].selected[0].min_range = parseInt(
									default_range.split("_")[0]
								);
								facet_ui[facet_index].selected[0].activated = false;
								updateFacetUi(facet_ui);
							}, 200)
						}
					>
						<p id="text">
							${min_range !== -1 ? min_range : default_range.split("0")[0]}- $
							{max_range !== -1 ? max_range : default_range.split("_")[1]}
						</p>
						<span id="close">✖</span>
					</button>
				);
			}}
		</FilterContext.Consumer>
	);
};

export default RangeCrumb;
