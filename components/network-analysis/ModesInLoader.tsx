import { useEffect, useContext, useState, Dispatch } from 'react';
import Loading from '../Loading';
import modesInNetworkLoaderEffect from '../../lib/hooks/network/modesInNetworkLoaderEffect';
import NetworkContext from '../../lib/networkContext';
import NetworkDataContext from '../../lib/networkDataContext';

const ModesInLoader: React.FunctionComponent = () => {
	const { network } = useContext(NetworkContext);
	const { data, setData } = useContext(NetworkDataContext);
	let [error, setError]: [Error, Dispatch<Error>] = [null, (): void => {}];

	if (!data.modesInNetworkLoader) {
		[error, setError] = useState();
		useEffect(modesInNetworkLoaderEffect({ network, setData, setError, data }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.modesInNetworkLoader) return <Loading message="getting loader data" />;
	console.log(data.modesInNetworkLoader);
	return <div>hi</div>;
};

export default ModesInLoader;
