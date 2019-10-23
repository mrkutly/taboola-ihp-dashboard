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
