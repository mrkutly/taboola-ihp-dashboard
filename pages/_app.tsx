import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Page from '../components/Page';
import PubContext from '../lib/pubContext';
import AuthContext from '../lib/authContext';

class MyApp extends App<AppInitialProps> {
	state = {
		publisher: {
			id: '',
			name: '',
			description: '',
		},
		authentication: {
			token: null,
			expires: null,
		},
	};

	setPublisher = (publisher: Publisher): void => {
		this.setState({ publisher });
	};

	setAuthentication = (authentication: Authentication): void => {
		this.setState({ authentication });
	};

	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		const { description } = this.state.publisher;

		return (
			<>
				<Head>
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
					<title>Implementation Health{description.length > 0 ? ` | ${description}` : null}</title>
				</Head>
				<Page>
					<AuthContext.Provider
						value={{ authentication: this.state.authentication, setAuthentication: this.setAuthentication }}
					>
						<PubContext.Provider value={{ publisher: this.state.publisher, setPublisher: this.setPublisher }}>
							<Component {...pageProps} />
						</PubContext.Provider>
					</AuthContext.Provider>
				</Page>
			</>
		);
	}
}

export default MyApp;
