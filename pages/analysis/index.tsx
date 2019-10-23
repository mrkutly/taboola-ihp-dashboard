import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Adapter from '../../utils/Adapter';

const Analysis: React.FunctionComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [analysisData, setAnalysisData] = useState(null);
	const [dateRange, setDateRange] = useState(null);

	useEffect((): void => {
		async function getData(): Promise<void> {
			try {
				const data: ShortAnalysisResult | Error = await Adapter.getShortAnalysis(1010748);

				if (data instanceof Error) throw new Error(data.message);

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
		(datum: ShortAnalysisDataResponse): JSX.Element => {
			// console.log(datum);
			return (
				<>
					<div className="mode" key={datum.MODE}>
						{datum.MODE}
					</div>
					<div className="num-views" key={datum.num_views}>
						{datum.num_views}
					</div>
				</>
			);
		},
	);
	return (
		<ContainerStyles id="page-views-per-mode">
			<h1>Page Views per mode for {dateRange}</h1>
			<GridStyles>
				<h3 className="mode">Mode</h3>
				<h3 className="num-views">Page Views</h3>
				{mappedData}
			</GridStyles>
		</ContainerStyles>
	);
};

const ContainerStyles = styled.section`
	max-width: 1200px;
	margin: 0 auto;

	h1 {
		font-weight: 500;
	}
`;

const GridStyles = styled.div`
	display: grid;
	grid-template-columns: 350px 1fr;
	font-size: 1.6rem;

	h3,
	div {
		padding-left: 10px;
	}

	h3 {
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

export default Analysis;
