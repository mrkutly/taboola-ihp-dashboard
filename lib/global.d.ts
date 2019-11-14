/** Props for Styled Components and Higher Order Components */
declare namespace PropsLib {
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
}

/** Utility Interfaces */

interface NavLink {
	text: string;
	href: string;
}

type Publisher = {
	id: string;
	name: string;
	description: string;
};
/** Types for Context and global State */
declare namespace AppContextTypes {
	type SetPublisher = { (publisher: Publisher): void };

	type PublisherContext = {
		publisher: Publisher;
		setPublisher: SetPublisher;
	};

	type SetNetwork = { (publisher: Publisher): void };

	type NetworkContext = {
		network: Publisher;
		setNetwork: SetNetwork;
	};

	type Data = {
		modePlacement?: AdapterTypes.LongAnalysisData;
		modeUsage?: AdapterTypes.ModeComparisonData;
		modeViews?: AdapterTypes.ShortAnalysisData;
		modeList?: AdapterTypes.ListModesResponseDatum[];
	};

	type SetData = { (data: Data): void };

	type DataContext = {
		data: Data;
		setData: SetData;
	};

	type NetworkData = {
		architecture?: AdapterTypes.NetworkArchitectureResponseData;
		modesByPub?: AdapterTypes.NetworkModesByPublisherResponseData;
		modesInNetworkLoader?: AdapterTypes.ModesInNetworkLoaderResponseData;
		// modeViews?: ShortAnalysisData;
		// modeList?: ListModesResponseDatum[];
	};

	type SetNetworkData = { (data: NetworkData): void };

	type NetworkDataContext = {
		data: NetworkData;
		setData: SetNetworkData;
	};

	type Authentication = {
		token: string;
		expires: number;
		isAuthorized: boolean;
	};

	type SetAuthentication = { (authentication: Authentication): void };

	type AuthContext = {
		authentication: Authentication;
		setAuthentication: setAuthentication;
	};
}

/** Publisher-Level Adapter responses */
declare namespace AdapterTypes {
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

	type AllPublishersResponse = {
		data: {
			allPublishers: Publisher[];
		};
	};

	type AllNetworksResponse = {
		data: {
			allNetworks: Publisher[];
		};
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

	/** Network-Level Adapter responses */
	type NetworkArchitectureResponseData = {
		daterange: string;
		network_publishers: string[];
		data: LongAnalysisDataResponse[];
	};

	type NetworkArchitectureResponse = {
		message: string;
		state: string;
		data: NetworkArchitectureResponseData[];
	};

	type NetworkModesByPublisherResponseData = {
		daterange: string;
		'modes-by-publisher': {
			[pubname: string]: string[];
		};
	};

	type NetworkModesByPublisherResponse = {
		message: string;
		state: string;
		data: NetworkModesByPublisherResponseData[];
	};

	type NetworkMode = {
		account: string;
		archive_date: string;
		id: number;
		mode_date: string;
		mode_id: number;
		mode_name: string;
	};

	type ModesInNetworkLoaderResponseData = {
		data: NetworkMode[];
		network_loader: string[];
	};

	type ModesInNetworkLoaderResponse = {
		message: string;
		state: string;
		data: ModesInNetworkLoaderResponseData[];
	};

	type LoaderUsageInfo = {
		account: string;
		id: number;
		modes: string | string[];
	};

	type NetworkLoaderUsageData = {
		publishers: string[];
		publisher_ids: number[];
		network_loader: string[];
		loaders: LoaderUsageInfo[];
	};

	type NetworkLoaderUsageResponse = {
		message: string;
		state: string;
		data: NetworkLoaderUsageData[];
	};
}
