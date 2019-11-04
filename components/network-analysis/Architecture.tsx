import { useEffect, useContext, useState, Dispatch } from 'react';
import Loading from '../Loading';
import NetworkContext from '../../lib/networkContext';
import NetworkDataContext from '../../lib/networkDataContext';
import networkArchitectureEffect from '../../lib/hooks/network/networkArchitectureEffect';

const Architecture: React.FunctionComponent = () => {
	const { network } = useContext(NetworkContext);
	const { data, setData } = useContext(NetworkDataContext);
	let [error, setError]: [Error, Dispatch<Error>] = [null, (): void => {}];

	if (!data.architecture) {
		[error, setError] = useState();
		useEffect(networkArchitectureEffect({ network, setData, setError, data }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.architecture) return <Loading message="getting network architecture data" />;
	// console.log(data);
	return <div>hi</div>;
};

export default Architecture;
