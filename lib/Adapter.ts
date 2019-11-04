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
	async getLongAnalysis(publisherId: number): Promise<LongAnalysisResult | Error> {
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
	async getModes(publisherId: number): Promise<ListModesResponse> {
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
	async getModesComparison(publisherId: number): Promise<ModeComparisonResponse> {
		try {
			const res = await fetch(`${process.env.BACKEND_URL}/impl-compare-modes?publisher=${publisherId}`);
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getPublisher(publisherId: number): Promise<AllPublishersResponse> {
		try {
			const res = await fetch('http://ps001.taboolasyndication.com:7777', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					query: `{
							allPublishers(id:${publisherId}){
								id
								name
								description
							}
						}
						`,
				}),
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
	async getNetwork(networkId: number): Promise<AllNetworksResponse> {
		try {
			const res = await fetch('http://ps001.taboolasyndication.com:7777', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					query: `{
							allNetworks(id:${networkId}){
								id
								name
								description
							}
						}
						`,
				}),
			});
			return res.json();
		} catch (error) {
			return error;
		}
	},
};

export default Adapter;
