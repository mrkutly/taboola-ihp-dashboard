import { useState, Dispatch, useContext } from 'react';
import styled from 'styled-components';
import PubSearchForm from './PubSearchForm';
import PublisherCard from './PublisherCard';
import PubContext from '../lib/pubContext';

const PubSearchPage: React.FunctionComponent = () => {
	const [error, setError]: [Error, Dispatch<Error>] = useState();
	const [publishers, setPublishers]: [Publisher[], Dispatch<Publisher[]>] = useState([]);
	const { setPublisher } = useContext(PubContext);

	return (
		<Container>
			<h1>Find your publisher to get their analysis</h1>
			<PubSearchForm setError={setError} setPublishers={setPublishers} />
			{error && <p>{error.message}</p>}
			{publishers.length > 0 && <h2>Results</h2>}
			<ul>
				{publishers.map((pub) => (
					<PublisherCard publisher={pub} key={pub.id} setPublisher={setPublisher} />
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
