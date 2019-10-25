import styled from 'styled-components';
/* eslint-disable @typescript-eslint/camelcase */
interface ModeDataProps {
	modeData: LongAnalysisDataResponse;
}

const ModeDataCard: React.FunctionComponent<ModeDataProps> = (props) => {
	const { mode, num_placements, num_views, placements, publishers } = props.modeData;
	const [modeName, loader] = mode.split(/[:=]/g).filter((string) => string.length > 3);

	return (
		<ListItemStyles>
			<h2>{modeName}</h2>
			<CardStyles>
				<div>
					<h3>Mode Data</h3>
					<ul>
						<li>Number of placements: {num_placements}</li>
						<li>Number of views: {num_views}</li>
						<li>In loader: {loader}</li>
					</ul>
				</div>
				<div>
					<h3>Placements</h3>
					<ul>
						{placements.map((placement) => (
							<li>{placement}</li>
						))}
					</ul>
				</div>
				<div>
					<h3>Publishers</h3>
					<ul>
						{publishers.map((publisher) => (
							<li>{publisher}</li>
						))}
					</ul>
				</div>
			</CardStyles>
		</ListItemStyles>
	);
};

const ListItemStyles = styled.li`
	margin: 5vh auto;
	h1 {
		margin-bottom: 0;
	}
`;

const CardStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	border-radius: 5px;
	border: 1px solid ${(props: SCProps): string => props.theme.colors.lightGrey};

	h2 {
		margin-bottom: 0;
	}

	div {
		padding: 0 20px 20px;
	}
`;

export default ModeDataCard;
