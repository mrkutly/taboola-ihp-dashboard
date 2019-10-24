import { useState, Dispatch, useContext } from 'react';
import styled from 'styled-components';
import PubSearchForm from './PubSearchForm';
import PublisherCard from './PublisherCard';

const PubSearchPage: React.FunctionComponent = () => {
	const [error, setError]: [Error, Dispatch<Error>] = useState();
	const [publishers, setPublishers]: [Publisher[], Dispatch<Publisher[]>] = useState([
		{ name: 'tribunedigital-chicagotribune', id: '1008941', description: 'Tribune Digital - Chicago Tribune' },
	]);

	return (
		<Container>
			<h1>Publisher Search</h1>
			<PubSearchForm setError={setError} setPublishers={setPublishers} />
			{error && <p>{error.message}</p>}
			{publishers.length > 0 && <h2>Results</h2>}
			<ul>
				{publishers.map((pub) => (
					<PublisherCard publisher={pub} key={pub.id} />
				))}
			</ul>
		</Container>
	);
};

const Container = styled.div`
	max-width: 800px;
	margin: 5vh auto;
	padding: 2vh 2vw;
`;

export default PubSearchPage;
