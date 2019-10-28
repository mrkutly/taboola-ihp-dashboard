import { useContext, useEffect } from 'react';
import Loading from '../components/Loading';
import AuthContext from './authContext';

const storageKey = 'ihpDashboard';

type TokenResponse = {
	access_token?: string;
	expires_in?: string;
	scope?: string;
	token?: string;
	token_type?: string;
};

const withAuth = (WrappedComponent: React.FunctionComponent<{}>): React.FunctionComponent<{}> => (
	props,
): JSX.Element => {
	const { authentication, setAuthentication } = useContext(AuthContext);

	useEffect(() => {
		const authStorage = localStorage.getItem(storageKey);

		if (authStorage) {
			const { token, expires } = JSON.parse(authStorage);

			if (token && expires && Date.now() < Number(expires)) {
				setAuthentication({
					token,
					expires,
				});

				return;
			}
		}

		if (window.location.hash) {
			const splitHash: string[] = window.location.hash.split(/[#=&]/).filter((str) => str.length > 0);
			const params: TokenResponse = splitHash.reduce<TokenResponse>((acc, el, idx) => {
				if (idx % 2 === 0) {
					acc[el] = splitHash[idx + 1];
				}
				return acc;
			}, {});

			// window.location.replace(`${window.location.protocol}//${window.location.host}${window.location.pathname}`);

			localStorage.setItem(
				storageKey,
				JSON.stringify({
					token: params.access_token,
					expires: Date.now() + Number(params.expires_in) * 1000,
				}),
			);

			setAuthentication({
				token: params.access_token,
				expires: Date.now() + Number(params.expires_in) * 1000,
			});

			return;
		}

		if (!authentication.token) {
			window.location.replace(
				`${process.env.AUTHENTICATION_URL}${process.env.AUTHENTICATION_PATHNAME}?client_id=${process.env.CLIENT_ID}&redirect_uri=${window.location.href}&response_type=${process.env.RESPONSE_TYPE}`,
			);
		}
	}, []);

	if (!authentication.token) return <Loading />;
	return <WrappedComponent {...props} />;
};

export default withAuth;
