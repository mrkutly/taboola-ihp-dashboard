import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';

const theme: Theme = {
	colors: {
		primary: '#282c34',
		secondary: '#007bff',
		accent: '#ffd355',
		background: 'white',
		black: '#1a1a1a',
		lightGrey: '#cacaca',
	},
	maxWidth: '1500px',
};

const StyledPage = styled.div`
	min-width: 735px;
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
const Page: React.FunctionComponent<HOCProps> = (props) => (
	<ThemeProvider theme={theme}>
		<GlobalStyle />
		<StyledPage>
			<Header />
			<Inner>{props.children}</Inner>
		</StyledPage>
	</ThemeProvider>
);

export default Page;
