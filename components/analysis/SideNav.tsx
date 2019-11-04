import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const analysisNavLinks: NavLink[] = [
	{
		text: 'List All Modes',
		href: '/analysis/mode-list',
	},
	{
		text: 'Page Views',
		href: '/analysis/mode-views',
	},
	{
		text: 'Placements',
		href: '/analysis/mode-placements',
	},
	{
		text: 'Usage',
		href: '/analysis/mode-usage',
	},
];

const SideNav: React.FunctionComponent = () => {
	const router = useRouter();
	return (
		<SideNavStyles>
			<h4>Mode reports</h4>
			<ul>
				{analysisNavLinks.map((link: NavLink) => (
					<li key={link.text} className={router.pathname === link.href ? 'active' : null}>
						<Link href={link.href}>
							<a>{link.text}</a>
						</Link>
					</li>
				))}
			</ul>
		</SideNavStyles>
	);
};

export const sideNavWidth = '250px';

const SideNavStyles = styled.nav`
	background-color: #00000011;
	height: calc(99vh - 54px);
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 0;
	width: ${sideNavWidth};
	font-size: 1.6rem;
	h4 {
		padding-left: 40px;
	}
	li,
	a {
		margin-top: 2vh;
		color: ${(props: PropsLib.SCProps): string => props.theme.colors.secondary};
	}

	a:focus,
	a:hover {
		color: ${(props: PropsLib.SCProps): string => props.theme.colors.accent};
	}

	li.active {
		color: ${(props: PropsLib.SCProps): string => props.theme.colors.primary};
		a {
			color: ${(props: PropsLib.SCProps): string => props.theme.colors.primary};
			cursor: auto;
		}
	}
`;

export default SideNav;
