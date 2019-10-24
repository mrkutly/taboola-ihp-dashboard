import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface NavLink {
	text: string;
	href: string;
}

const Header: React.FunctionComponent = () => {
	const router = useRouter();
	const pubNavLinks: NavLink[] = [
		{
			text: 'Publisher Search',
			href: '/',
		},
		{
			text: 'Page Views by Mode',
			href: '/analysis',
		},
	];
	const currentNavLinks: NavLink[] = router.pathname === '/' ? [] : pubNavLinks;

	return (
		<HeaderStyles>
			<img src="/header-logo.jpg" alt="taboola logo" />
			<nav>
				{currentNavLinks.map((link) => (
					<Link href={link.href} key={link.href}>
						<a className={router.pathname === link.href ? 'active' : undefined}>{link.text}</a>
					</Link>
				))}
			</nav>
		</HeaderStyles>
	);
};

const HeaderStyles = styled.header`
	display: flex;
	background: white;
	color: ${(props: SCProps): string => props.theme.colors.secondary};
	padding: 1vh 1vw;
	align-items: center;

	img {
		height: 52px;
		margin-right: 20px;
	}

	a {
		padding: 1rem 3rem;
		font-weight: 600;
		font-size: 1.6rem;
		background: none;
		border: 0;
		cursor: pointer;
		color: ${(props: SCProps): string => props.theme.colors.secondary};

		&:hover,
		&:focus {
			color: ${(props: SCProps): string => props.theme.colors.accent};
			outline: none;
		}

		&.active {
			color: ${(props: SCProps): string => props.theme.colors.primary};
			cursor: default;
		}
	}
`;

export default Header;
