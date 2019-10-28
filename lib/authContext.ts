import { createContext } from 'react';

const defaultContext: AuthContext = {
	setAuthentication: () => {},
	authentication: {
		token: null,
		expires: null,
	},
};

export default createContext(defaultContext);
