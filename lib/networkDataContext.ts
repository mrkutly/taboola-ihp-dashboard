import { createContext } from 'react';

const defaultContext: AppContextTypes.NetworkDataContext = {
	setData: () => {},
	data: {
		architecture: null,
	},
};

export default createContext(defaultContext);
