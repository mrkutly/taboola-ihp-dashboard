import NetworkSearchPage from '../../components/network-analysis/NetworkSearchPage';
import withAuth from '../../lib/withAuth';

const Index: React.FunctionComponent = () => <NetworkSearchPage />;

export default withAuth(Index);
