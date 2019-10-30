/* eslint-disable @typescript-eslint/camelcase */
import styled from 'styled-components';
import { Dispatch, useContext, useEffect, useState } from 'react';
import PubContext from '../../lib/pubContext';
import DataContext from '../../lib/dataContext';
import ModePlacementsCard from './ModePlacementsCard';
import Loading from '../Loading';
import modePlacementsEffect from '../../lib/hooks/modePlacementsEffect';
import { ButtonStyles } from './ModeList';
import downloadCSV from '../../utils/DownloadCSV';

const PageViews: React.FunctionComponent = () => {
	const { publisher } = useContext(PubContext);
	const { data, setData } = useContext(DataContext);
	let [error, setError]: [Error, Dispatch<Error>] = [null, (): void => {}];

	if (!data.modePlacement) {
		[error, setError] = useState();
		useEffect(modePlacementsEffect({ publisher, setData, setError, data }), []);
	}

	if (error) return <p>Error: {error.message}</p>;
	if (!data.modePlacement) return <Loading />;

	const handleClick = (): void => {
		const rows = data.modePlacement.json_response.map((modeObj) => {
			const { mode, num_placements, num_publishers, num_views, placements, publishers } = modeObj;
			const formattedPlacements = `"${placements.join(', ')}"`;
			const formattedPublishers = `"${publishers.join(', ')}"`;
			return [mode, num_placements, num_publishers, num_views, formattedPlacements, formattedPublishers];
		});
		const headers = [
			'Mode Name',
			'Number of Placements',
			'Number of Publishers',
			'Page Views',
			'Placement Names',
			'Publishers',
		];
		downloadCSV({ rows, headers });
	};

	return (
		<ModeDataStyles>
			<h1>Mode Data from {data.modePlacement.daterange}</h1>
			<ButtonStyles onClick={handleClick}>Download this list</ButtonStyles>
			<ModeListStyles>
				{data.modePlacement.json_response.map((datum) => (
					<ModePlacementsCard modeData={datum} publisher={publisher.name} key={`${datum.mode}-${datum.num_views}`} />
				))}
			</ModeListStyles>
		</ModeDataStyles>
	);
};

const ModeListStyles = styled.ul`
	list-style: none;
	margin: 0 auto;
	padding-left: 0;
`;

const ModeDataStyles = styled.div`
	max-width: 1200px;
`;

export default PageViews;
