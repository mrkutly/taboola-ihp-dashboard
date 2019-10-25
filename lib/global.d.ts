type HOCProps = {
	children: Element & React.ReactPortal & React.ReactNodeArray | React.ReactNode;
};

type Theme = {
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		background: string;
		black: string;
		lightGrey: string;
	};
	maxWidth: string;
};

type SCProps = {
	theme: Theme;
};

type ShortAnalysisDataResponse = {
	MODE: string;
	num_views: number;
	publisher_id: number;
};

type ShortAnalysisData = {
	daterange: string;
	json_response: ShortAnalysisDataResponse[];
};

type ShortAnalysisResult = {
	message: string;
	state: string;
	data: ShortAnalysisData[];
};

type Publisher = {
	id: string;
	name: string;
	description: string;
};

type AllPublishersResponse = {
	data: {
		allPublishers: Publisher[];
	};
};

type SetPublisher = {
	(publisher: Publisher): void;
};

type PublisherContext = {
	publisher: Publisher;
	setPublisher: SetPublisher;
};

type LongAnalysisDataResponse = {
	mode: string;
	num_placements: number;
	num_publishers: number;
	num_views: number;
	placements: string[];
	publishers: string[];
	without_abp: string;
};

type LongAnalysisData = {
	daterange: string;
	json_response: LongAnalysisDataResponse[];
};

type LongAnalysisResult = {
	message: string;
	state: string;
	data: LongAnalysisData[];
};

type Mode = {
	MODE_NAMES: string;
	MODE_TYPE: string;
	count: number;
	number_views: number;
	publisher_id: number;
};

type ModeComparisonData = {
	daterange: string;
	all_modes: Mode[];
	active_modes: string[];
	inactive_modes: string[];
};

type ModeComparisonResponse = {
	message: string;
	state: string;
	data: ModeComparisonData[];
};

type ListModesResponseDatum = {
	json_response: {
		MODE: string;
		mode_date: string;
		mode_id: number;
	};
};

type ListModesResponse = {
	message: string;
	state: string;
	data: ListModesResponseDatum[];
};
