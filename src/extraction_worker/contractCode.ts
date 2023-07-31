import { CustomWebSocketProvider } from "../helpers/customWebsocketProvider";
import Contract, { I_Contract } from "../models/Contract";

const contracts: string[] = [
   "0xEd52047a29A47764A06563FA4c84aEE51c253Eaf",
   "0x35a03F8bb63F02ad03C0AAEB589d44541504064D",
   "0x8219ec4d7C60053A9f575fF6544df6050037bBc5"
]

const chainWs = new CustomWebSocketProvider(process.env.RPC_WS_URL, process.env.BESU_API_KEY);

const extractContractsCode = async (contracts: string[]) => {
   let failed: string[] = []
   
   //TODO: Improve parallelism of requests to the DB
   for await (const contract of contracts) {
      //Contract code won't change so once is stored
      //There's no need to update like accounts or storage
      if (await Contract.countDocuments({address: contract})!) continue;

      let contractData: I_Contract = await getContract(contract);
      
      Contract.create(contractData)
         .catch(err => {
            failed.push(contractData.address)
         });
   }
   console.log(`✅ Contract code scrapping done`);
   failed.length? console.log(`Failed to update ${failed} contracts`) : null;
}

const getContract = async (contract: string, block?: number): Promise<I_Contract> => {
   let data: I_Contract = {
      address: contract,
      code: await chainWs.getCode(contract, block)
   }
   
   return data
}
export default {extractContractsCode, contracts};