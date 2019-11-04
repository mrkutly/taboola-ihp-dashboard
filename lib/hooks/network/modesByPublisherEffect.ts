/* eslint-disable @typescript-eslint/camelcase */
import { EffectCallback, Dispatch } from 'react';
import Adapter from '../../Adapter';

interface NetworkArchitectureEffectArgs {
	network: Publisher;
	setData: AppContextTypes.SetNetworkData;
	data: AppContextTypes.NetworkData;
	setError: Dispatch<Error>;
}

export default ({ network, setData, setError, data }: NetworkArchitectureEffectArgs): EffectCallback => {
	return (): void => {
		async function getData(): Promise<void> {
			try {
				const networkId = Number(network.id);
				const response: AdapterTypes.NetworkModesByPublisherResponse | Error = await Adapter.getNetworkModesByPublisher(
					networkId,
				);

				if (response instanceof Error) throw response;

				const modesByPub = response.data[0];

				setData({
					...data,
					modesByPub,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
