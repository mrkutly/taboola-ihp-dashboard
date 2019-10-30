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

type Data = {
	modePlacement?: LongAnalysisData;
	modeUsage?: ModeComparisonData;
	modeViews?: ShortAnalysisData;
	modeList?: ListModesResponseDatum[];
};

type SetData = {
	(data: Data): void;
};

type DataContext = {
	data: Data;
	setData: SetData;
};

type Authentication = {
	token: string;
	expires: number;
	isAuthorized: boolean;
};

type SetAuthentication = {
	(authentication: Authentication): void;
};

type AuthContext = {
	authentication: Authentication;
	setAuthentication: setAuthentication;
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
	MODE: string;
	mode_date: string;
	mode_id: number;
};

type ListModesResponseDataField = {
	json_response: ListModesResponseDatum[];
};

type ListModesResponse = {
	message: string;
	state: string;
	data: ListModesResponseDataField[];
};

interface NavLink {
	text: string;
	href: string;
}
