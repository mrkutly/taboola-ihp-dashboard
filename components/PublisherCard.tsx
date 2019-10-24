import styled from 'styled-components';
import Link from 'next/link';

interface PubCardProps {
	publisher: Publisher;
}

const PublisherCard: React.FunctionComponent<PubCardProps> = ({ publisher }) => {
	const { name, id, description } = publisher;

	return (
		<PubCardStyles>
			<Link href={{ pathname: '/analysis', query: { ...publisher } }}>
				<a>
					<span>
						{description} ({id})
					</span>
					-<span>{name}</span>
				</a>
			</Link>
		</PubCardStyles>
	);
};

const PubCardStyles = styled.li`
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
		color: ${(props: SCProps): string => props.theme.colors.secondary};
	}
`;

export default PublisherCard;
