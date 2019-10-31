import styled from 'styled-components';
import { useEffect, useState, useContext, Dispatch } from 'react';
import Loading from '../Loading';
import PubContext from '../../lib/pubContext';
import DataContext from '../../lib/dataContext';
import modeListEffect from '../../lib/hooks/modeListEffect';
import { ListItemStyles, ButtonStyles } from './ModeUsageList';
import downloadCSV from '../../utils/DownloadCSV';

const ModeList: React.FunctionComponent = () => {
	const { publisher } = useContext(PubContext);
	const { data, setData } = useContext(DataContext);
	let [error, setError]: [Error, Dispatch<Error>] = [null, (): void => {}];

	if (!data.modeList) {
		[error, setError] = useState();
		useEffect(modeListEffect({ publisher, setData, setError, data }), []);
	}

	const handleClick = (): void => {
		const rows = data.modeList.map((mode) => [mode.mode_id, mode.MODE, `"${mode.mode_date}"`]);
		const headers = ['Mode ID', 'Mode Name', 'Date Created'];
		downloadCSV({ rows, headers });
	};

	if (error) return <p>{error.message}</p>;
	if (!data.modeList) return <Loading message="getting mode list" />;

	return (
		<ModeListPageStyles id="all-modes-list">
			<h1>{publisher.description}</h1>
			<h2>All Modes</h2>
			<ButtonStyles type="button" onClick={handleClick}>
				Download this list
			</ButtonStyles>
			<ListHeaders>
				<div>Mode ID</div>
				<div>Mode Name</div>
				<div>Date Created</div>
			</ListHeaders>
			<ul style={{ paddingLeft: 0 }}>
				{data.modeList.map((mode, idx) => {
					return (
						<ListItemStyles isEven={idx % 2 === 0} key={mode.mode_id} gridColumns="1fr 2fr 2fr">
							<div>{mode.mode_id}</div>
							<div>{mode.MODE}</div>
							<div>{mode.mode_date}</div>
						</ListItemStyles>
					);
				})}
			</ul>
		</ModeListPageStyles>
	);
};

const ModeListPageStyles = styled.section`
	h1,
	h2 {
		font-weight: 500;
	}
	h1 {
		font-size: 3rem;
	}

	h2 {
		margin-bottom: 0;
	}
`;

const ListHeaders = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 2fr;
	width: 900px;
	font-weight: 600;
	font-size: 1.8rem;
	margin-top: 5vh;
`;

export default ModeList;
