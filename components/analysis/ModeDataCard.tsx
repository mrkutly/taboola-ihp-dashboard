import styled from 'styled-components';
/* eslint-disable @typescript-eslint/camelcase */
interface ModeDataProps {
	modeData: LongAnalysisDataResponse;
}

const ModeDataCard: React.FunctionComponent<ModeDataProps> = (props) => {
	const { mode, num_placements, num_views, placements, publishers } = props.modeData;
	const [modeName, loader] = mode.split(/[:=]/g).filter((string) => string.length > 3);

	return (
		<li>
			<CardStyles>
				<div>
					<h1>{modeName}</h1>
					<p>Number of placements: {num_placements}</p>
					<p>Number of views: {num_views}</p>
					<p>In loader: {loader}</p>
				</div>
				<div>
					<h2>Placements</h2>
					<ul>
						{placements.map((placement) => (
							<li>{placement}</li>
						))}
					</ul>
				</div>
				<div>
					<h2>Publishers</h2>
					<ul>
						{publishers.map((publisher) => (
							<li>{publisher}</li>
						))}
					</ul>
				</div>
			</CardStyles>
		</li>
	);
};

const CardStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	margin: 5vh auto;
`;

export default ModeDataCard;
