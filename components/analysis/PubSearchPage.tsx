import { useState, Dispatch, useContext, SetStateAction } from 'react';
import styled from 'styled-components';
import PubSearchForm from './PubSearchForm';
import PublisherCard from './PublisherCard';
import Loading from '../Loading';
import PubContext from '../../lib/pubContext';

export interface PubSearchState {
	error: Error | null;
	publishers: Publisher[];
	loading: boolean;
}

const PubSearchPage: React.FunctionComponent = () => {
	const [state, setState]: [PubSearchState, Dispatch<SetStateAction<PubSearchState>>] = useState({
		error: null,
		publishers: [],
		loading: false,
	});
	const { setPublisher } = useContext(PubContext);
	const { loading, error, publishers } = state;

	return (
		<Container>
			<h1>Find your publisher to get their analysis.</h1>
			<PubSearchForm setSearchState={setState} searchState={state} />
			{error && <p>{error.message}</p>}
			{loading && <Loading />}
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
