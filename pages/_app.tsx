import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import Page from '../components/Page';
import PubContext from '../lib/pubContext';
import AuthContext from '../lib/authContext';
import DataContext from '../lib/dataContext';

interface MyAppState {
	publisher: Publisher;
	authentication: Authentication;
	data: Data;
}

class MyApp extends App<AppInitialProps> {
	state: MyAppState = {
		publisher: {
			name: 'nbcnews',
			id: '1010748',
			description: 'NBC - NBCNews',
		},
		authentication: {
			isAuthorized: false,
			token: null,
			expires: null,
		},
		data: {
			modePlacement: null,
			modeUsage: null,
			modeViews: null,
		},
	};

	setPublisher = (publisher: Publisher): void => {
		this.setState({
			publisher,
			data: {
				modePlacement: null,
				modeUsage: null,
				modeViews: null,
			},
		});
	};

	setAuthentication = (authentication: Authentication): void => {
		this.setState({ authentication });
	};

	setData = (data: Data): void => {
		this.setState({ data });
	};

	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		const { description } = this.state.publisher;
		const shouldAppendPubName = Router && Router.router && !['/', '/analysis'].includes(Router.router.pathname);

		return (
			<>
				<Head>
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
					<title>
						Implementation Health{description.length > 0 && shouldAppendPubName ? ` | ${description}` : null}
					</title>
				</Head>
				<Page>
					<AuthContext.Provider
						value={{ authentication: this.state.authentication, setAuthentication: this.setAuthentication }}
					>
						<PubContext.Provider value={{ publisher: this.state.publisher, setPublisher: this.setPublisher }}>
							<DataContext.Provider value={{ data: this.state.data, setData: this.setData }}>
								<Component {...pageProps} />
							</DataContext.Provider>
						</PubContext.Provider>
					</AuthContext.Provider>
				</Page>
			</>
		);
	}
}

export default MyApp;
