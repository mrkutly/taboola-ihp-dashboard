import { useRouter } from 'next/router';
import { PubCardStyles } from '../analysis/PublisherCard';

interface PubCardProps {
	network: Publisher;
	setNetwork: AppContextTypes.SetNetwork;
}

const NetworkCard: React.FunctionComponent<PubCardProps> = ({ network, setNetwork }) => {
	const router = useRouter();
	const { name, id, description } = network;

	const goToPub = (): void => {
		setNetwork(network);
		router.push('/network-analysis/mode-list');
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

export default NetworkCard;
