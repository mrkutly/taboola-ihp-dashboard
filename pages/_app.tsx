import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import Page from '../components/Page';
import NetworkContext from '../lib/networkContext';
import PubContext from '../lib/pubContext';
import AuthContext from '../lib/authContext';
import DataContext from '../lib/dataContext';

interface MyAppState {
	publisher: Publisher;
	network: Publisher;
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
		network: {
			name: 'tribunedigital-network',
			id: '1008940',
			description: 'TribuneDigital - Network',
		},
		authentication: {
			isAuthorized: false,
			token: null,
			expires: null,
		},
		data: {
			modeList: null,
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

	setNetwork = (network: Publisher): void => {
		this.setState({
			network,
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
		const pubDescription = this.state.publisher.description;
		const shouldAppendPubName = Router && Router.router && !['/', '/analysis'].includes(Router.router.pathname);

		return (
			<>
				<Head>
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
					<title>
						Implementation Health{pubDescription.length > 0 && shouldAppendPubName ? ` | ${pubDescription}` : null}
					</title>
				</Head>
				<Page>
					<AuthContext.Provider
						value={{ authentication: this.state.authentication, setAuthentication: this.setAuthentication }}
					>
						<PubContext.Provider value={{ publisher: this.state.publisher, setPublisher: this.setPublisher }}>
							<NetworkContext.Provider value={{ network: this.state.network, setNetwork: this.setNetwork }}>
								<DataContext.Provider value={{ data: this.state.data, setData: this.setData }}>
									<Component {...pageProps} />
								</DataContext.Provider>
							</NetworkContext.Provider>
						</PubContext.Provider>
					</AuthContext.Provider>
				</Page>
			</>
		);
	}
}

export default MyApp;
