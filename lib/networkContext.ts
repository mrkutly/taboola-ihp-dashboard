import { createContext } from 'react';

const defaultContext: AppContextTypes.NetworkContext = {
	setNetwork: () => {},
	network: {
		name: '',
		id: '',
		description: '',
	},
};

export default createContext(defaultContext);
