import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import PubContext from './pubContext';

const withPublisher = (WrappedComponent: React.FunctionComponent<{}>): React.FunctionComponent<{}> => (
	props,
): JSX.Element => {
	const { publisher } = useContext(PubContext);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (publisher.id.length === 0) {
			router.push('/analysis');
			return;
		}

		setLoading(false);
	}, []);

	if (loading) return <p>loading</p>;

	return <WrappedComponent {...props} />;
};

export default withPublisher;
