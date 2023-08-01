import Web3 from "web3";
import { CustomWebSocketProvider } from "../helpers/customWebsocketProvider";
import Code, { I_Code } from "../models/Code";

const contracts: string[] = [
   "0xEd52047a29A47764A06563FA4c84aEE51c253Eaf",
   "0x35a03F8bb63F02ad03C0AAEB589d44541504064D",
   "0x8219ec4d7C60053A9f575fF6544df6050037bBc5"
]

const chainWs = new CustomWebSocketProvider(process.env.RPC_WS_URL, process.env.BESU_API_KEY);

const extractContractsCode = async (contracts: string[]) => {
   let failed: string[] = []


const web3 = new Web3();

const value1 = '0x00000000000000000000000067207a5353e78aa5859449172bce8f653fee117a';
const value2 = '0xc22bc11c71fccd17556f61a8a760aaab7e80d32405436c9a793b10ce8880ed24';

const concatenatedValues = value1 + value2;
const hash = web3.utils.(concatenatedValues);

console.log(hash);

   //TODO: Improve parallelism of requests to the DB
   for await (const contract of contracts) {
      //Contract code won't change so once is stored
      //There's no need to update like accounts or storage
      if (await Code.countDocuments({address: contract})!) continue;

      let contractData: I_Code = await getContract(contract);
      
      Code.create(contractData)
         .catch(err => {
            failed.push(contractData.address)
         });
   }
   console.log(`✅ Contract code scrapping done`);
   failed.length? console.log(`Failed to update ${failed} contracts`) : null;
}

const getContract = async (contract: string, block?: number): Promise<I_Code> => {
   let data: I_Code = {
      address: contract,
      code: await chainWs.getCode(contract, block)
   }
   
   return data
}
export default {extractContractsCode, contracts};