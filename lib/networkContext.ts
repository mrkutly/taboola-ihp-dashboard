import { createContext } from 'react';

const defaultContext: NetworkContext = {
	setNetwork: () => {},
	network: {
		name: '',
		id: '',
		description: '',
	},
};

export default createContext(defaultContext);
