/* eslint-disable @typescript-eslint/camelcase */
import { Fragment, useContext, useEffect, useState, Dispatch } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import PubContext from '../../lib/pubContext';
import DataContext from '../../lib/dataContext';
import modeViewsEffect from '../../lib/hooks/modeViewsEffect';
import { ButtonStyles } from './ModeList';

const ModeViews: React.FunctionComponent = () => {
	const { publisher } = useContext(PubContext);
	const { data, setData } = useContext(DataContext);
	let [error, setError]: [Error, Dispatch<Error>] = [null, (): void => {}];

	if (!data.modeViews) {
		[error, setError] = useState();
		useEffect(modeViewsEffect({ publisher, setData, setError, data }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.modeViews) return <Loading />;

	const mappedData = data.modeViews.json_response.map(
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

	const downloadCSV = (): void => {
		const rows = data.modeViews.json_response.map(({ MODE, num_views, publisher_id }) => [
			MODE,
			num_views,
			publisher_id,
		]);
		const formattedRows = rows.map((row) => row.join(',')).join('\n');
		const csvContent = `data:text/csv;charset=utf-8,Mode Name, Number of Page Views, Publisher ID\n${formattedRows}`;
		const encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	};

	return (
		<ContainerStyles id="page-views-per-mode">
			<h1>{publisher.description}</h1>
			<h2>Page views by mode between {data.modeViews.daterange}</h2>
			<ButtonStyles type="button" onClick={downloadCSV}>
				Download this list
			</ButtonStyles>
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
