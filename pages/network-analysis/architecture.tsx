import withNetwork from '../../lib/withNetwork';
import Architecture from '../../components/network-analysis/Architecture';

const ArchitecturePage: React.FunctionComponent = () => <Architecture />;

export default withNetwork(ArchitecturePage);
