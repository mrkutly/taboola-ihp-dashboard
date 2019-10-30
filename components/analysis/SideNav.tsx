import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const analysisNavLinks: NavLink[] = [
	{
		text: 'Mode List',
		href: '/analysis/mode-list',
	},
	{
		text: 'Mode Page Views',
		href: '/analysis/mode-views',
	},
	{
		text: 'Mode Placements',
		href: '/analysis/mode-placements',
	},
	{
		text: 'Mode Usage',
		href: '/analysis/mode-usage',
	},
];

const SideNav: React.FunctionComponent = () => {
	const router = useRouter();
	return (
		<SideNavStyles>
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
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 0;
	width: ${sideNavWidth};
	font-size: 1.6rem;

	li,
	a {
		margin-top: 2vh;
		color: ${(props: SCProps): string => props.theme.colors.secondary};
	}

	a:focus,
	a:hover {
		color: ${(props: SCProps): string => props.theme.colors.accent};
	}

	li.active {
		color: ${(props: SCProps): string => props.theme.colors.primary};
		a {
			color: ${(props: SCProps): string => props.theme.colors.primary};
			cursor: auto;
		}
	}
`;

export default SideNav;
