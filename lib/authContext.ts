import { createContext } from 'react';

const defaultContext: AppContextTypes.AuthContext = {
	setAuthentication: () => {},
	authentication: {
		token: null,
		expires: null,
		isAuthorized: false,
	},
};

export default createContext(defaultContext);
