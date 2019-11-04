/* eslint-disable @typescript-eslint/camelcase */
import { Dispatch, EffectCallback } from 'react';
import Adapter from '../../Adapter';

interface ModeUsageEffectArgs {
	publisher: Publisher;
	setData: AppContextTypes.SetData;
	data: AppContextTypes.Data;
	setError: Dispatch<Error>;
}

export default ({ publisher, setData, setError, data }: ModeUsageEffectArgs): EffectCallback => {
	return (): void => {
		async function getModeActivity(): Promise<void> {
			try {
				const publisherId = Number(publisher.id);
				const res: AdapterTypes.ModeComparisonResponse | Error = await Adapter.getModesComparison(publisherId);

				if (res instanceof Error) throw res;

				const formattedDateRange = res.data[0].daterange.split(' - ').join(' and ');
				setData({
					...data,
					modeUsage: {
						...res.data[0],
						daterange: formattedDateRange,
					},
				});
			} catch (err) {
				setError(err);
			}
		}

		getModeActivity();
	};
};
