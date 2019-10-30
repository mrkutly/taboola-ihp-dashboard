import { ReactText } from 'react';

interface DownloadCSVArgs {
	rows: ReactText[][];
	headers: string[];
}
export default ({ rows, headers }: DownloadCSVArgs): void => {
	const formattedRows = rows.map((row) => row.join()).join('\n');
	const csvContent = `data:text/csv;charset=utf-8,${headers.join()}\n${formattedRows}`;
	const encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
};
