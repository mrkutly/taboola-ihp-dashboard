import { useEffect, EffectCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface NavLink {
	text: string;
	href: string;
}

const pubNavLinks: NavLink[] = [
	{
		text: 'Publisher Search',
		href: '/analysis',
	},
	{
		text: 'Page Views by Mode',
		href: '/analysis/mode-views',
	},
	{
		text: 'Mode Data',
		href: '/analysis/mode-data',
	},
];

const Header: React.FunctionComponent = () => {
	const router = useRouter();
	const currentNavLinks: NavLink[] = ['/', '/analysis'].includes(router.pathname) ? [] : pubNavLinks;

	useEffect((): EffectCallback => {
		const anchor = document.querySelector('#intersection-anchor');
		const header = document.querySelector('header');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					header.classList.remove('stuck');
				} else {
					header.classList.add('stuck');
				}
			},
			{
				threshold: 0,
				root: null,
				rootMargin: '0px',
			},
		);

		observer.observe(anchor);

		return (): void => observer.unobserve(anchor);
	}, []);

	return (
		<>
			<div id="intersection-anchor" />
			<HeaderStyles id="header">
				<img src="/header-logo.jpg" alt="taboola logo" />
				<nav>
					{currentNavLinks.map((link) => (
						<Link href={link.href} key={link.href}>
							<a className={router.pathname === link.href ? 'active' : undefined}>{link.text}</a>
						</Link>
					))}
				</nav>
			</HeaderStyles>
		</>
	);
};

const HeaderStyles = styled.header`
	display: flex;
	background: white;
	color: ${(props: SCProps): string => props.theme.colors.secondary};
	padding: 1vh 1vw;
	align-items: center;
	position: sticky;
	position: -webkit-sticky;
	top: 0px;

	&:after {
		content: '';
		width: 0;
		height: 2px;
		background: ${(props: SCProps): string => props.theme.colors.accent};
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		transition: width 0.4s ease-in;
		margin-top: 3.5rem;
	}

	&.stuck {
		&:after {
			width: 100%;
		}
	}

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
