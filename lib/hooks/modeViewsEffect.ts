/* eslint-disable @typescript-eslint/camelcase */
import { Dispatch, EffectCallback } from 'react';
import Adapter from '../../utils/Adapter';

interface ModeViewsEffectArgs {
	publisher: Publisher;
	setData: SetData;
	data: Data;
	setError: Dispatch<Error>;
}

export default ({ publisher, setData, setError, data }: ModeViewsEffectArgs): EffectCallback => {
	return (): void => {
		async function getData(): Promise<void> {
			try {
				const pubId = Number(publisher.id);
				const response: ShortAnalysisResult | Error = await Adapter.getShortAnalysis(pubId);

				if (response instanceof Error) throw response;

				const { json_response, daterange } = response.data[0];
				const formattedDateRange = daterange.split(' - ').join(' and ');

				setData({
					...data,
					modeViews: {
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
