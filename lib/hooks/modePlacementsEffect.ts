/* eslint-disable @typescript-eslint/camelcase */
import { EffectCallback, Dispatch } from 'react';
import Adapter from '../Adapter';

interface ModeDataEffectArgs {
	publisher: Publisher;
	setData: AppContextTypes.SetData;
	data: AppContextTypes.Data;
	setError: Dispatch<Error>;
}

export default ({ publisher, setData, setError, data }: ModeDataEffectArgs): EffectCallback => {
	return (): void => {
		async function getData(): Promise<void> {
			try {
				const pubId = Number(publisher.id);
				const response: AdapterTypes.LongAnalysisResult | Error = await Adapter.getLongAnalysis(pubId);

				if (response instanceof Error) throw response;

				const { json_response, daterange } = response.data[0];
				const formattedDateRange = daterange.split(' - ').join(' and ');

				setData({
					...data,
					modePlacement: {
						json_response,
						daterange: formattedDateRange,
					},
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
