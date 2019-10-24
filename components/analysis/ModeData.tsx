import { Dispatch, useContext, useEffect, useState, SetStateAction } from 'react';
import PubContext from '../../lib/pubContext';
import Adapter from '../../utils/Adapter';
import ModeDataCard from './ModeDataCard';

const PageViews: React.FunctionComponent = () => {
	const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
	const [error, setError]: [Error, Dispatch<Error>] = useState();
	const { publisher } = useContext(PubContext);
	const [analysisData, setAnalysisData]: [
		LongAnalysisDataResponse[],
		Dispatch<SetStateAction<LongAnalysisDataResponse[]>>,
	] = useState(null);

	useEffect((): void => {
		async function getData(): Promise<void> {
			try {
				const pubId = Number(publisher.id);
				const response: LongAnalysisResult | Error = await Adapter.getLongAnalysis(pubId);

				if (response instanceof Error) throw new Error(response.message);
				const jsonData = response.data[0].json_response;
				setAnalysisData(jsonData);
				setLoading(false);
			} catch (err) {
				setError(err);
			}
		}

		getData();
	}, []);

	if (loading) return <p>loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<ul>
			{analysisData.map((data) => (
				<ModeDataCard modeData={data} />
			))}
		</ul>
	);
};

export default PageViews;
