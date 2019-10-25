/* eslint-disable @typescript-eslint/camelcase */
import styled from 'styled-components';
import { Dispatch, useContext, useEffect, useState } from 'react';
import PubContext from '../../lib/pubContext';
import Adapter from '../../utils/Adapter';
import ModeDataCard from './ModeDataCard';

interface ModeDataState {
	dateRange: string;
	loading: boolean;
	error: Error;
	analysisData: LongAnalysisDataResponse[];
}

const defaultState: ModeDataState = {
	dateRange: null,
	loading: true,
	error: null,
	analysisData: null,
};

const PageViews: React.FunctionComponent = () => {
	const [state, setState]: [ModeDataState, Dispatch<ModeDataState>] = useState(defaultState);
	const { publisher } = useContext(PubContext);

	useEffect((): void => {
		async function getData(): Promise<void> {
			try {
				const pubId = Number(publisher.id);
				const response: LongAnalysisResult | Error = await Adapter.getLongAnalysis(pubId);

				if (response instanceof Error) throw new Error(response.message);
				const { json_response, daterange } = response.data[0];
				const formattedDateRange = daterange.split(' - ').join(' to ');

				setState({
					...state,
					analysisData: json_response,
					loading: false,
					dateRange: formattedDateRange,
				});
			} catch (err) {
				setState({ ...state, error: err });
			}
		}

		getData();
	}, []);

	const { error, loading, analysisData, dateRange } = state;

	if (loading) return <p>loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<h1>Mode Data from {dateRange}</h1>
			<ModeListStyles>
				{analysisData.map((data) => (
					<ModeDataCard modeData={data} />
				))}
			</ModeListStyles>
		</>
	);
};

const ModeListStyles = styled.ul`
	list-style: none;
	max-width: 1200px;
	margin: 0 auto;
`;

export default PageViews;
