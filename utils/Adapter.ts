interface Header {
	Accepts: string;
	'Cache-Control': string;
	'Content-Type': string;
}

type HeadersInitInterface = Header & HeadersInit;

const headers: HeadersInitInterface = {
	Accepts: 'application/json',
	'Cache-Control': 'no-cache',
	'Content-Type': 'application/json',
};

const Adapter = {
	async getPublisherStats(publisher: string): Promise<object> {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/dataframe_stats?publisher=${publisher}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getPublisherAnalysisJson(publisher: string): Promise<object> {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/data_json?publisher=${publisher}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getShortAnalysis(publisherId: number): Promise<ShortAnalysisResult | Error> {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-short-pv-reader?publisher=${publisherId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getLongAnalysis(publisherId: number): Promise<object> {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-pv-reader?publisher=${publisherId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getModes(publisherId: number): Promise<object> {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-list-modes?publisher=${publisherId}`, {
				method: 'GET',
				headers,
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
};

export default Adapter;
