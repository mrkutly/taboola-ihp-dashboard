import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Page from '../components/Page';

class MyApp extends App<AppInitialProps> {
	render(): JSX.Element {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
					<title>Implementation Health</title>
				</Head>
				<Page>
					<Component {...pageProps} />
				</Page>
			</>
		);
	}
}

export default MyApp;
