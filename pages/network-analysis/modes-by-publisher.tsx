import withNetwork from '../../lib/withNetwork';
import ModesByPub from '../../components/network-analysis/ModesByPub';

const ModesByPubPage: React.FunctionComponent = () => <ModesByPub />;

export default withNetwork(ModesByPubPage);
