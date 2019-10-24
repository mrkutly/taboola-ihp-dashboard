import { Fragment, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PubContext from '../../lib/pubContext';
import Adapter from '../../utils/Adapter';

const Analysis: React.FunctionComponent = () => {
	const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
	const [error, setError]: [Error, Dispatch<Error>] = useState(null);
	const [dateRange, setDateRange]: [string, Dispatch<string>] = useState(null);
	const { publisher } = useContext(PubContext);
	const [analysisData, setAnalysisData]: [
		ShortAnalysisDataResponse[],
		Dispatch<SetStateAction<ShortAnalysisDataResponse[]>>,
	] = useState(null);

	useEffect((): void => {
		async function getData(): Promise<void> {
			try {
				const pubId = Number(publisher.id);
				const response: ShortAnalysisResult | Error = await Adapter.getShortAnalysis(pubId);

				if (response instanceof Error) throw new Error(response.message);

				// eslint-disable-next-line @typescript-eslint/camelcase
				const { json_response, daterange } = response.data[0];
				setAnalysisData(json_response);
				const formattedDateRange = daterange.split(' - ').join(' and ');
				setDateRange(formattedDateRange);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		}

		getData();
	}, []);

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
	max-width: 1200px;
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
	grid-template-columns: 350px 1fr;
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

export default Analysis;
