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
				const pubId = Number(network.id);
				const response: AdapterTypes.NetworkArchitectureResponse | Error = await Adapter.getNetworkArchitecture(pubId);

				if (response instanceof Error) throw response;

				const architecture = response.data[0];

				setData({
					...data,
					architecture,
				});
			} catch (err) {
				setError(err);
			}
		}

		getData();
	};
};
