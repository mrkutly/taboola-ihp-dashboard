import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Adapter from '../lib/Adapter';
import { PubSearchState } from './analysis/PubSearchPage';

interface SearchFormProps {
	setSearchState: Dispatch<SetStateAction<PubSearchState>>;
	searchState: PubSearchState;
	network?: boolean;
}

const fetchPublishers = async (idQuery): Promise<Publisher[] | Error> => {
	try {
		const response = await Adapter.getPublisher(Number(idQuery));

		if (!response || !response.data) {
			throw new Error('There was a problem connecting to the database.');
		}

		if (response.data.allPublishers.length === 0) {
			throw new Error('No results.');
		}

		return response.data.allPublishers;
	} catch (error) {
		return error;
	}
};

const fetchNetworks = async (networkId): Promise<Publisher[] | Error> => {
	try {
		const response = await Adapter.getNetwork(Number(networkId));

		if (!response || !response.data) {
			throw new Error('There was a problem connecting to the database.');
		}

		if (response.data.allNetworks.length === 0) {
			throw new Error('No results.');
		}

		return response.data.allNetworks;
	} catch (error) {
		return error;
	}
};

const SearchForm: React.FunctionComponent<SearchFormProps> = ({ setSearchState, searchState, network }) => {
	const [idQuery, setIdQuery]: [string, Dispatch<string>] = useState('');

	const handleSubmit = async (e: Event): Promise<void> => {
		try {
			e.preventDefault();
			setSearchState({
				...searchState,
				loading: true,
			});

			const results = network ? await fetchNetworks(idQuery) : await fetchPublishers(idQuery);

			if (results instanceof Error) throw new Error(results.message);

			setSearchState({
				...searchState,
				results,
				loading: false,
			});
		} catch (error) {
			setSearchState({
				...searchState,
				error,
				loading: false,
			});
		}
	};

	return (
		<FormStyles onSubmit={handleSubmit}>
			<fieldset>
				<legend>Search {network ? 'networks' : 'publishers'}</legend>
				<label htmlFor="pub-id-search">
					{network ? 'Network' : 'Publisher'} ID:
					<input
						type="text"
						id="pub-id-search"
						value={idQuery}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setIdQuery(e.target.value)}
					/>
				</label>
				<button type="submit" disabled={idQuery.length < 3}>
					Search
				</button>
			</fieldset>
		</FormStyles>
	);
};

const FormStyles = styled.form`
	color: ${(props: SCProps): string => props.theme.colors.secondary};

	fieldset {
		padding: 2vh 2vw;
		border-radius: 5px;
		border: 1px solid ${(props: SCProps): string => props.theme.colors.primary};
	}

	input {
		margin-left: 10px;
		font-size: 1.5rem;
		padding: 4px;
		border-radius: 5px;
		border: 1px solid ${(props: SCProps): string => props.theme.colors.primary};
	}

	button {
		background: ${(props: SCProps): string => props.theme.colors.secondary};
		color: ${(props: SCProps): string => props.theme.colors.background};
		border-radius: 5px;
		border: 1px solid ${(props: SCProps): string => props.theme.colors.background};
		font-size: 1.5rem;
		padding: 4px;
		margin-top: 10px;
		display: block;

		&[disabled] {
			background: ${(props: SCProps): string => props.theme.colors.lightGrey};
		}
	}
`;

export default SearchForm;
