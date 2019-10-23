import Link from 'next/link';
import styled from 'styled-components';

const Header: React.FunctionComponent = () => (
	<HeaderStyles>
		<img src="/header-logo.jpg" alt="taboola logo" />
		<Link href="/">
			<a>Home</a>
		</Link>
	</HeaderStyles>
);

const HeaderStyles = styled.header`
	display: flex;
	background: white;
	color: ${(props): string => props.theme.colors.secondary};
	padding: 1vh 1vw;
	align-items: center;

	img {
		height: 40px;
		margin-right: 20px;
	}

	a {
		padding: 1rem 3rem;
		font-weight: 600;
		font-size: 1.6rem;
		background: none;
		border: 0;
		cursor: pointer;
		color: ${(props): string => props.theme.colors.black};

		&:hover,
		&:focus {
			color: ${(props): string => props.theme.colors.secondary};
			outline: none;
		}
	}
`;

export default Header;
