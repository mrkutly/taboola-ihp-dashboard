import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import Page from '../components/Page';
import NetworkContext from '../lib/networkContext';
import NetworkDataContext from '../lib/networkDataContext';
import PubContext from '../lib/pubContext';
import AuthContext from '../lib/authContext';
import DataContext from '../lib/dataContext';

interface MyAppState {
	publisher: Publisher;
	network: Publisher;
	authentication: AppContextTypes.Authentication;
	data: AppContextTypes.Data;
	networkData: AppContextTypes.NetworkData;
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
		networkData: {
			architecture: null,
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
			networkData: {
				architecture: null,
			},
		});
	};

	setAuthentication = (authentication: AppContextTypes.Authentication): void => {
		this.setState({ authentication });
	};

	setData = (data: AppContextTypes.Data): void => {
		this.setState({ data });
	};

	setNetworkData = (networkData: AppContextTypes.NetworkData): void => {
		this.setState({ networkData });
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
							<DataContext.Provider value={{ data: this.state.data, setData: this.setData }}>
								<NetworkContext.Provider value={{ network: this.state.network, setNetwork: this.setNetwork }}>
									<NetworkDataContext.Provider value={{ data: this.state.networkData, setData: this.setNetworkData }}>
										<Component {...pageProps} />
									</NetworkDataContext.Provider>
								</NetworkContext.Provider>
							</DataContext.Provider>
						</PubContext.Provider>
					</AuthContext.Provider>
				</Page>
			</>
		);
	}
}

export default MyApp;
