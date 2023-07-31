import accountsData from "../extraction_worker/accountsData";
import contractData from "../extraction_worker/contractCode";

const mongoose = require("mongoose");

let connectionRetries: number = 0;

const connectWithRetry = async (mongoURL) => {
	return mongoose
		.connect(mongoURL)
		.then(() => {
			console.log("Connected to MongoDB");
			accountsData.extractAccounts(accountsData.accounts);
			contractData.extractContractsCode(contractData.contracts)
		})
		.catch((err) => {
			if (connectionRetries < 5) {
				console.error(
					"Failed to connect to mongo on startup - retrying in 5 sec"
				);
				console.log(`Retries Left ${(5 - connectionRetries) | 0} \n`);
				connectionRetries++;
				setTimeout(connectWithRetry, 2000);
			} else {
				console.log("Connection to MongoDB Failed");
			}
		});
};

export default connectWithRetry;
