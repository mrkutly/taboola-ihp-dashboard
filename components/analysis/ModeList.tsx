import styled from 'styled-components';
import downloadCSV from '../../utils/DownloadCSV';

interface ModeListProps {
	modes: Mode[];
}

const ModeList: React.FunctionComponent<ModeListProps> = (props) => {
	const handleClick = (): void => {
		const rows = props.modes.map((mode) => [mode.MODE_NAMES, mode.number_views, mode.publisher_id]);
		const headers = ['Mode Name', 'Number of Page Views', 'Publisher ID'];
		downloadCSV({ rows, headers });
	};

	return (
		<>
			<ButtonStyles onClick={handleClick} type="button">
				Download this list
			</ButtonStyles>
			<ul style={{ paddingLeft: 0 }}>
				{props.modes.map((mode, idx) => (
					<ModeListItemStyles key={mode.MODE_NAMES} isEven={idx % 2 === 0}>
						<div>{mode.MODE_NAMES}</div>
						<div>{mode.number_views} page views</div>
					</ModeListItemStyles>
				))}
			</ul>
		</>
	);
};

type MLISProps = SCProps & { isEven: boolean };

const ModeListItemStyles = styled.li`
	padding: 5px;
	font-weight: 500;
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 800px;
	background: ${(props: MLISProps): string => (props.isEven ? '#cacaca7d' : 'white')};
`;

export const ButtonStyles = styled.button`
	background: none;
	color: ${(props: SCProps): string => props.theme.colors.secondary};
	letter-spacing: 0.5px;
	border: none;
	font-size: 1.5rem;
	font-weight: 450;
	cursor: pointer;
`;

export default ModeList;
