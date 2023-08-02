import { chainWs } from "../constants/utility";
import Code, { I_Code } from "../models/Code";

export const extractContractsCode = async (contracts: string[], block?: string) => {
   let failed: string[] = []

   //TODO: Improve parallelism of requests to the DB
   for await (const contract of contracts) {
      //Contract code won't change so once is stored
      //There's no need to update like accounts or storage
      if (await Code.countDocuments({address: contract})!) continue;

      let contractData: I_Code = await getContract(contract, block);
      
      Code.create(contractData)
         .catch(err => {
            failed.push(contractData.address)
         });
   }
   console.log(`✅ Contract code scrapping done`);
   failed.length? console.log(`Failed to update ${failed} contracts`) : null;
}

const getContract = async (contract: string, block?: string): Promise<I_Code> => {
   let data: I_Code = {
      address: contract,
      code: await chainWs.getCode(contract, block)
   }
   
   return data
}