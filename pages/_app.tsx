import App, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import Page from '../components/Page';

interface PageProps {
	query?: string;
}

class MyApp extends App<AppInitialProps> {
	static async getInitialProps({ Component, ctx }): Promise<AppInitialProps> {
		let pageProps: PageProps = {};
		// This block crawls the page to see if there are any mutations or queries that need to be run before render
		// It fires them before rendering and then returns that data into pageProps
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		// this exposes the query to the user
		pageProps.query = ctx.query;
		return { pageProps };
	}

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
