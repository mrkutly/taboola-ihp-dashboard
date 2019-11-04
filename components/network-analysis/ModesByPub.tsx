import { useEffect, useContext, useState, Dispatch } from 'react';
import Loading from '../Loading';
import NetworkContext from '../../lib/networkContext';
import NetworkDataContext from '../../lib/networkDataContext';
import modesByPublisherEffect from '../../lib/hooks/network/modesByPublisherEffect';

const ModesByPub: React.FunctionComponent = () => {
	const { network } = useContext(NetworkContext);
	const { data, setData } = useContext(NetworkDataContext);
	let [error, setError]: [Error, Dispatch<Error>] = [null, (): void => {}];

	if (!data.modesByPub) {
		[error, setError] = useState();
		useEffect(modesByPublisherEffect({ network, setData, setError, data }), []);
	}

	if (error) return <p>{error.message}</p>;
	if (!data.modesByPub) return <Loading message="getting mode data" />;
	// console.log(data);
	return <div>hi</div>;
};

export default ModesByPub;
