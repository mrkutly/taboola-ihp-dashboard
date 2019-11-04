import { createContext } from 'react';

const defaultContext: AppContextTypes.PublisherContext = {
	setPublisher: () => {},
	publisher: {
		name: '',
		id: '',
		description: '',
	},
};

export default createContext(defaultContext);
