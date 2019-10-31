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

	const unusedModesInKB = {
		inflated: inactiveModes.length * 22,
		deflated: inactiveModes.length * 2,
	};

	const sortedActiveModes = activeModes.sort((a, b) => b.number_views - a.number_views);
	const sortedInactiveModes = inactiveModes.sort((a, b) => {
		if (a.MODE_NAMES > b.MODE_NAMES) return 1;
		return -1;
	});

	return (
		<ModeUsageStyles id="mode-usage">
			<h1>{publisher.description}</h1>
			<h2>Mode Usage between {data.modeUsage.daterange}</h2>
			<h3>Inactive Modes</h3>
			<p>
				Deleting these will reduce the inflated loader size by{' '}
				<strong style={{ color: 'green' }}>~{unusedModesInKB.inflated}kb</strong> and the deflated loader size by{' '}
				<strong style={{ color: 'green' }}>~{unusedModesInKB.deflated}kb</strong>.
			</p>
			<ModeList modes={sortedInactiveModes} />
			<DividerStyles />
			<h3>Active Modes</h3>
			<ModeList modes={sortedActiveModes} />
		</ModeUsageStyles>
	);
};

const ModeUsageStyles = styled.section`
	h1,
	h2 {
		font-weight: 500;
	}

	h1 {
		font-size: 3rem;
	}

	h3 {
		margin-bottom: 0;
	}
`;

export const DividerStyles = styled.div`
	height: 2px;
	margin: 5vh 0;
	background: ${(props: SCProps): string => props.theme.colors.accent};
`;

export default ModeUsage;
