import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SideNavProps {
	links: NavLink[];
}

const SideNav: React.FunctionComponent<SideNavProps> = ({ links }) => {
	const router = useRouter();
	return (
		<SideNavStyles>
			<h4>Reports</h4>
			<ul>
				{links.map((link: NavLink) => (
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
