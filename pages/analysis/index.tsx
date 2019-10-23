import { useEffect, useState } from 'react';
import Adapter from '../../utils/Adapter';

const Analysis: React.FunctionComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [analysisData, setAnalysisData] = useState(null);
	const [dateRange, setDateRange] = useState(null);

	useEffect((): void => {
		async function getData(): Promise<void> {
			try {
				const data: ShortAnalysisResult = await Adapter.getShortAnalysis(1010748);
				// eslint-disable-next-line @typescript-eslint/camelcase
				const { json_response, daterange } = data.data[0];
				setAnalysisData(json_response);
				setDateRange(daterange);
				setLoading(false);
			} catch (err) {
				setError(err);
			}
		}

		getData();
	}, []);

	if (loading) return <h1>loading...</h1>;
	if (error) return <h1>error {error.message}</h1>;

	const mappedData = analysisData.map(
		(datum): JSX.Element => {
			// console.log(datum);
			return <div key={datum.MODE}>{datum.MODE}</div>;
		},
	);
	return (
		<>
			<h1>{dateRange}</h1>
			{mappedData}
		</>
	);
};

export default Analysis;
