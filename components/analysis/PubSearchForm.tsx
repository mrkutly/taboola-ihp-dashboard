import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Adapter from '../../lib/Adapter';
import { PubSearchState } from './PubSearchPage';

interface PubSearchFormProps {
	setSearchState: Dispatch<SetStateAction<PubSearchState>>;
	searchState: PubSearchState;
}

const PubSearchForm: React.FunctionComponent<PubSearchFormProps> = ({ setSearchState, searchState }) => {
	const [publisherId, setPublisherId]: [string, Dispatch<string>] = useState('');

	const handleSubmit = async (e: Event): Promise<void> => {
		try {
			e.preventDefault();
			setSearchState({
				...searchState,
				loading: true,
			});

			const response = await Adapter.getPublisher(Number(publisherId));

			if (!response || !response.data) {
				throw new Error('There was a problem connecting to the database.');
			}

			if (response.data.allPublishers.length === 0) {
				throw new Error('No results.');
			}

			setSearchState({
				...searchState,
				publishers: response.data.allPublishers,
				loading: false,
			});
		} catch (err) {
			setSearchState({
				...searchState,
				loading: false,
				error: err,
			});
		}
	};

	return (
		<FormStyles onSubmit={handleSubmit}>
			<fieldset>
				<legend>Search publishers</legend>
				<label htmlFor="pub-id-search">
					Publisher ID:
					<input
						type="text"
						id="pub-id-search"
						value={publisherId}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPublisherId(e.target.value)}
					/>
				</label>
				<button type="submit" disabled={publisherId.length < 3}>
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

export default PubSearchForm;
