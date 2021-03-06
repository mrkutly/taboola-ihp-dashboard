import Link from 'next/link';
import styled from 'styled-components';
import withAuth from '../lib/withAuth';

const links: NavLink[] = [
	{
		text: 'Publisher Analysis',
		href: '/analysis',
	},
	{
		text: 'Network Analysis',
		href: '/network-analysis',
	},
];

const Index: React.FunctionComponent = () => {
	return (
		<IndexPageStyles>
			{links.map((link: NavLink) => (
				<Link href={link.href} key={link.text}>
					<a>{link.text}</a>
				</Link>
			))}
		</IndexPageStyles>
	);
};

const IndexPageStyles = styled.div`
	display: grid;
	grid-template-rows: ${(): string => links.map(() => '100px').join(' ')};
	justify-items: center;
	align-items: center;
	margin: 10vh auto;

	a {
		font-size: 2rem;
		font-weight: 500;
		letter-spacing: 1.6px;
		padding: 10px;

		&:hover {
			color: ${(props: PropsLib.SCProps): string => props.theme.colors.secondary};
		}
	}
`;

export default withAuth(Index);
