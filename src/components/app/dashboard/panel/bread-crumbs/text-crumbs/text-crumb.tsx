import { FC } from "react";
import { FacetValue } from "../../../../../assets/models/facet";
import {
	BreadCrumbText,
	FilterContext,
} from "../../../../../assets/widgets/types/types";

const TextCrumb: FC<{
	crumb: BreadCrumbText;
	value: { value: FacetValue; index: number };
	key?: number;
}> = (p) => {
	const { value, index } = p.value;
	const { facet_index } = p.crumb;
	return (
		<FilterContext.Consumer>
			{({ facet_ui, updateFacetUi }) => {
				return (
					<button
						key={"text:" + facet_index + "-" + p.key}
						id="crumb-value"
						onClick={() =>
							setTimeout(() => {
								facet_ui[facet_index].selected[index].activated = false;
								updateFacetUi(facet_ui);
							}, 200)
						}
					>
						<p id="text">{value}</p>
						<span>✖</span>
					</button>
				);
			}}
		</FilterContext.Consumer>
	);
};

export default TextCrumb;
