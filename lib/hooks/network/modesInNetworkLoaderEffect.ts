/* eslint-disable @typescript-eslint/camelcase */
import { EffectCallback, Dispatch } from 'react';
import Adapter from '../../Adapter';

interface ModesInNetworkLoaderEffectArgs {
	network: Publisher;
	setData: AppContextTypes.SetNetworkData;
	data: AppContextTypes.NetworkData;
	setError: Dispatch<Error>;
}

export default ({ network, setData, setError, data }: ModesInNetworkLoaderEffectArgs): EffectCallback => {
	return (): void => {
		async function getData(): Promise<void> {
			try {
				const networkId = Number(network.id);
				const response: AdapterTypes.ModesInNetworkLoaderResponse | Error = await Adapter.getModesInNetworkLoader(
					networkId,
				);

				if (response instanceof Error) throw response;

				const modesInNetworkLoader = response.data[0];

				setData({
					...data,
					modesInNetworkLoader,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
