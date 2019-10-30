import styled from 'styled-components';
import { DividerStyles } from './ModeUsage';

/* eslint-disable @typescript-eslint/camelcase */
interface ModeDataProps {
	modeData: LongAnalysisDataResponse;
	publisher: string;
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
						<li>In loader: {loader || props.publisher}</li>
					</ul>
				</div>
				<div>
					<h3>Placements</h3>
					<ul>
						{placements.map((placement) => (
							<li key={`${modeName}-${placement}-${num_views}`}>{placement}</li>
						))}
					</ul>
				</div>
				<div>
					<h3>Publishers</h3>
					<ul>
						{publishers.map((publisher) => (
							<li key={`${modeName}-${publisher}-${num_views}`}>{publisher}</li>
						))}
					</ul>
				</div>
			</CardStyles>
			<DividerStyles />
		</ListItemStyles>
	);
};

const ListItemStyles = styled.li`
	margin: 5vh auto;

	h2 {
		margin-bottom: 0;
		border-bottom: 2px solid ${(props: SCProps): string => props.theme.colors.primary};
		width: max-content;
	}
`;

const CardStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
`;

export default ModeDataCard;
