import { createContext } from 'react';

const defaultContext: PublisherContext = {
	setPublisher: () => {},
	publisher: {
		name: '',
		id: '',
		description: '',
	},
};

export default createContext(defaultContext);
