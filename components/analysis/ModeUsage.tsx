import styled from 'styled-components';
import { useEffect, useState, useContext, Dispatch } from 'react';
import Loading from '../Loading';
import ModeList from './ModeUsageList';
import pubContext from '../../lib/pubContext';
import dataContext from '../../lib/dataContext';
import modeUsageEffect from '../../lib/hooks/modeUsageEffect';

const ModeUsage: React.FunctionComponent = () => {
	const { publisher } = useContext(pubContext);
	const { data, setData } = useContext(dataContext);
	let [error, setError]: [Error, Dispatch<Error>] = [null, (): void => {}];

	if (!data.modeUsage) {
		[error, setError] = useState();
		useEffect(modeUsageEffect({ data, setData, publisher, setError }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.modeUsage) return <Loading message="getting mode usage info" />;

	const [activeModes, inactiveModes]: [Mode[], Mode[]] = data.modeUsage.all_modes.reduce(
		(acc, mode) => {
			if (mode.MODE_TYPE === 'ACTIVE MODES') {
				acc[0].push(mode);
			} else {
				acc[1].push(mode);
			}
			return acc;
		},
		[[], []],
	);

	const sortedActiveModes = activeModes.sort((a, b) => b.number_views - a.number_views);
	const sortedInactiveModes = inactiveModes.sort((a, b) => {
		if (a.MODE_NAMES > b.MODE_NAMES) return 1;
		return -1;
	});

	return (
		<>
			<h1>Mode Usage between {data.modeUsage.daterange}</h1>
			<h2>Inactive Modes</h2>
			<ModeList modes={sortedInactiveModes} />
			<DividerStyles />
			<h2>Active Modes</h2>
			<ModeList modes={sortedActiveModes} />
		</>
	);
};

export const DividerStyles = styled.div`
	height: 2px;
	margin: 5vh 0;
	background: ${(props: SCProps): string => props.theme.colors.accent};
`;

export default ModeUsage;
