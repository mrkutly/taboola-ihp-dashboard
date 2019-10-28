import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Page from '../components/Page';
import PubContext from '../lib/pubContext';

class MyApp extends App<AppInitialProps> {
	state = {
		publisher: {
			id: '',
			name: '',
			description: '',
		},
	};

	setPublisher = (publisher: Publisher): void => {
		this.setState({ publisher });
	};

	render(): JSX.Element {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
					<title>Implementation Health</title>
				</Head>
				<Page>
					<PubContext.Provider value={{ publisher: this.state.publisher, setPublisher: this.setPublisher }}>
						<Component {...pageProps} />
					</PubContext.Provider>
				</Page>
			</>
		);
	}
}

export default MyApp;
