import Document, { Html, Main, NextScript, Head, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// This is allowing styled-components to work on the server side.
// Without this, the css won't apply to the page when it first loads, causing a flicker.

export default class MyDocument extends Document {
	static async getInitialProps(ctx): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = (): DocumentInitialProps =>
				originalRenderPage({
					// eslint-disable-next-line react/jsx-props-no-spreading
					// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render(): JSX.Element {
		return (
			<Html lang="en-US">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
