import PubSearchPage from '../../components/analysis/PubSearchPage';
import withAuth from '../../lib/withAuth';

const Index: React.FunctionComponent = () => <PubSearchPage />;

export default withAuth(Index);
