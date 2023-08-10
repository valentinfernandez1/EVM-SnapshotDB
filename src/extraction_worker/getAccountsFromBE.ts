import axios from 'axios';
import { storageConcurrentLimit } from '../constants/utility';
import { I_BE_Response } from 'utils/interfaces';

const timeout = 2000;
const size = 50000;

export const getAccountsFromBE = async () => {
	console.log('🔎 Retrieving the accounts from Sirato');

	let ongoingPromises = 0;
	let keepGoing = true;
	let page = -1;

	let accounts: string[] = [];
	let promises = [];

	//Get amount of accounts
	let response = (await axios.get(`https://explorer.mythical.market/api/accounts/?page=0&size=1`))
		.data;

	console.log(response.paging.totalElements);

	while (keepGoing) {
		for (ongoingPromises; ongoingPromises < 4; ongoingPromises++) {
			page++;
			promises.push(
				getAccountsPage(page).then((retrievedAccounts) => {
					!retrievedAccounts.length ? (keepGoing = false) : null;
					ongoingPromises -= 1;
					accounts = accounts.concat(retrievedAccounts);
					console.log('Current array length ', accounts.length);
				})
			);
		}

		await new Promise((resolve) => setTimeout(resolve, Number(timeout)));
	}

	await Promise.all(promises);
	console.log('Retrieve done');

	return accounts;
};

const getAccountsPage = async (page: number): Promise<string[]> => {
	let retrievedAccounts: string[] = [];
	try {
		let response = (
			await axios.get(
				`https://explorer.mythical.market/api/accounts/?page=${page}&size=${size}&direction=ASC&sort=address`
			)
		).data;

		response.data.forEach((element) => retrievedAccounts.push(element.address));
	} catch (error) {
		console.log(error);
	}
	return retrievedAccounts;
};
