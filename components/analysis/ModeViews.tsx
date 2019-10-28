/* eslint-disable @typescript-eslint/camelcase */
import { Fragment, useContext, useEffect, useState, Dispatch } from 'react';
import styled from 'styled-components';
import PubContext from '../../lib/pubContext';
import Adapter from '../../utils/Adapter';

interface PVAnalysisState {
	dateRange: string;
	loading: boolean;
	error: Error;
	analysisData: ShortAnalysisDataResponse[];
}

const defaultState: PVAnalysisState = {
	dateRange: null,
	loading: true,
	error: null,
	analysisData: null,
};

const ModeViews: React.FunctionComponent = () => {
	const [state, setState]: [PVAnalysisState, Dispatch<PVAnalysisState>] = useState(defaultState);
	const { publisher } = useContext(PubContext);

	useEffect((): void => {
		async function getData(): Promise<void> {
			try {
				const pubId = Number(publisher.id);
				const response: ShortAnalysisResult | Error = await Adapter.getShortAnalysis(pubId);

				if (response instanceof Error) throw new Error(response.message);

				const { json_response, daterange } = response.data[0];
				const formattedDateRange = daterange.split(' - ').join(' and ');
				setState({
					...state,
					analysisData: json_response,
					dateRange: formattedDateRange,
					loading: false,
				});
			} catch (err) {
				setState({
					...state,
					error: err,
					loading: false,
				});
			}
		}

		getData();
	}, []);

	const { error, loading, analysisData, dateRange } = state;

	if (loading) return <p>loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const mappedData = analysisData.map(
		(datum: ShortAnalysisDataResponse): JSX.Element => {
			return (
				<Fragment key={`${datum.MODE}-${datum.num_views}`}>
					<div className="mode" key={datum.MODE}>
						{datum.MODE}
					</div>
					<div className="num-views" key={datum.num_views}>
						{datum.num_views}
					</div>
				</Fragment>
			);
		},
	);

	return (
		<ContainerStyles id="page-views-per-mode">
			<h1>{publisher.description}</h1>
			<h2>Page views by mode between {dateRange}</h2>
			<GridStyles>
				<div className="mode heading">Mode</div>
				<div className="num-views heading">Page Views</div>
				{mappedData}
			</GridStyles>
		</ContainerStyles>
	);
};

const ContainerStyles = styled.section`
	max-width: 800px;
	margin: 0 auto;

	h1,
	h2 {
		font-weight: 500;
	}

	h1 {
		font-size: 3rem;
	}
`;

const GridStyles = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	font-size: 1.6rem;

	div {
		padding-left: 10px;
		color: ${(props: SCProps): string => props.theme.colors.primary};
	}

	.heading {
		font-weight: 500;
		font-size: 1.8rem;
		color: ${(props: SCProps): string => props.theme.colors.secondary};
	}

	.mode {
		grid-column-start: 1;
	}

	.num-views {
		grid-column-start: 2;
	}

	div {
		border: 1px solid ${(props: SCProps): string => props.theme.colors.lightGrey};
	}
`;

export default ModeViews;
