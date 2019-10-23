import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';

const theme: Theme = {
	colors: {
		primary: 'white',
		secondary: '#007bff',
		accent: '#9661ff',
		background: '#282c34',
		black: '#1a1a1a',
	},
	maxWidth: '2000px',
};

const StyledPage = styled.div`
	color: ${(props: SCProps): string => props.theme.colors.primary};
`;

const Inner = styled.main`
	max-width: ${(props: SCProps): string => props.theme.maxWidth};
	margin: 0 auto;
	padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-size: 10px;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
		background: ${(props): string => props.theme.colors.background};
		padding: 0;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2;
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
	}
	a {
		text-decoration: none;
		color: ${theme.colors.black};
	}
`;

type Props = {
	children: Element & React.ReactPortal & React.ReactNodeArray | React.ReactNode;
};

const Page: React.FunctionComponent<Props> = (props) => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<StyledPage>
			<Header />
			<Inner>{props.children}</Inner>
		</StyledPage>
	</ThemeProvider>
);

export default Page;
