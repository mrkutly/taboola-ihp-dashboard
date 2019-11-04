import { createContext } from 'react';

const defaultContext: AppContextTypes.DataContext = {
	setData: () => {},
	data: {
		modePlacement: null,
		modeUsage: null,
		modeViews: null,
		modeList: null,
	},
};

export default createContext(defaultContext);
