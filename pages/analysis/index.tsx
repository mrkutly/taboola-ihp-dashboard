import PageViewsByMode from '../../components/analysis/PageViewsByMode';
import withPublisher from '../../lib/withPublisher';

const Analysis: React.FunctionComponent = () => <PageViewsByMode />;

export default withPublisher(Analysis);
