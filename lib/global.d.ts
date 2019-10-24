interface Theme {
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		background: string;
		black: string;
		lightGrey: string;
	};
	maxWidth: string;
}

interface SCProps {
	theme: Theme;
}

interface ShortAnalysisDataResponse {
	MODE: string;
	num_views: number;
	publisher_id: number;
}

interface ShortAnalysisData {
	daterange: string;
	json_response: ShortAnalysisDataResponse[];
}

interface ShortAnalysisResult {
	message: string;
	state: string;
	data: ShortAnalysisData[];
}

interface Publisher {
	id: string;
	name: string;
	description: string;
}

interface AllPublishersResponse {
	data: {
		allPublishers: Publisher[];
	};
}

interface SetPublisher {
	(publisher: Publisher): void;
}
