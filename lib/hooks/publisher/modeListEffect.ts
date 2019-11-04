/* eslint-disable @typescript-eslint/camelcase */
import { EffectCallback, Dispatch } from 'react';
import Adapter from '../../Adapter';

interface ModeListEffectArgs {
	publisher: Publisher;
	setData: AppContextTypes.SetData;
	data: AppContextTypes.Data;
	setError: Dispatch<Error>;
}

export default ({ publisher, setData, setError, data }: ModeListEffectArgs): EffectCallback => {
	return (): void => {
		async function getData(): Promise<void> {
			try {
				const pubId = Number(publisher.id);
				const response: AdapterTypes.ListModesResponse | Error = await Adapter.getModes(pubId);

				if (response instanceof Error) throw response;

				const modeList = response.data[0].json_response;

				setData({
					...data,
					modeList,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
