import { useRouter } from 'next/router';
import styled from 'styled-components';

interface PubCardProps {
	publisher: Publisher;
	setPublisher: AppContextTypes.SetPublisher;
}

const PublisherCard: React.FunctionComponent<PubCardProps> = ({ publisher, setPublisher }) => {
	const router = useRouter();
	const { name, id, description } = publisher;

	const goToPub = (): void => {
		setPublisher(publisher);
		router.push('/analysis/mode-list');
	};

	return (
		<PubCardStyles
			role="link"
			tabIndex={0}
			onClick={(): void => goToPub()}
			onKeyPress={(e: KeyboardEvent): void => e.which === 13 && goToPub()}
		>
			<span>
				{description} ({id})
			</span>
			-<span>{name}</span>
		</PubCardStyles>
	);
};

export const PubCardStyles = styled.li`
	width: max-content;
	cursor: pointer;
	padding: 5px 5px 5px 0;
	font-size: 1.8rem;
	font-weight: 500;
	margin: 10px;

	span {
		margin-right: 10px;
		margin-left: 10px;
	}

	&:hover,
	&:focus {
		color: ${(props: PropsLib.SCProps): string => props.theme.colors.secondary};
	}
`;

export default PublisherCard;
