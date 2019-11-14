import withNetwork from '../../lib/withNetwork';
import ModesInLoader from '../../components/network-analysis/ModesInLoader';

const ModesInLoaderPage: React.FunctionComponent = () => <ModesInLoader />;

export default withNetwork(ModesInLoaderPage);
