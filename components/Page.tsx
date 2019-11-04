import React from 'react';
import { useRouter } from 'next/router';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import SideNav, { analysisNavLinks, sideNavWidth } from './analysis/SideNav';

const theme: PropsLib.Theme = {
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
	color: ${(props: PropsLib.SCProps): string => props.theme.colors.primary};
`;

const Inner = styled.main`
	max-width: ${(props: PropsLib.SCProps): string => props.theme.maxWidth};
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
const Page: React.FunctionComponent<PropsLib.HOCProps> = (props) => {
	const router = useRouter();
	const analysisPaths = analysisNavLinks.map((link: NavLink) => link.href);
	const shouldRenderSideNav = analysisPaths.includes(router.pathname);
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<StyledPage>
				<Header />
				{shouldRenderSideNav && <SideNav />}
				<Inner style={shouldRenderSideNav ? { marginLeft: sideNavWidth } : {}}>{props.children}</Inner>
			</StyledPage>
		</ThemeProvider>
	);
};

export default Page;
