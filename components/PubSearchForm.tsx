import { useState, Dispatch } from 'react';
import styled from 'styled-components';
import Adapter from '../utils/Adapter';

interface PubSearchFormProps {
	setError: Function;
	setPublishers: Function;
}

const PubSearchForm: React.FunctionComponent<PubSearchFormProps> = ({ setError, setPublishers }) => {
	const [publisherId, setPublisherId]: [string, Dispatch<string>] = useState();

	const handleSubmit = async (e: Event): Promise<void> => {
		try {
			e.preventDefault();
			const response = await Adapter.getPublisher(Number(publisherId));
			setPublishers(response.data.allPublishers);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<FormStyles onSubmit={handleSubmit}>
			<fieldset>
				<legend>Search </legend>
				<label htmlFor="pub-id-search">
					Publisher ID:
					<input
						type="text"
						id="pub-id-search"
						value={publisherId}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPublisherId(e.target.value)}
					/>
				</label>
				<button type="submit">Search</button>
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
	}
`;

export default PubSearchForm;
