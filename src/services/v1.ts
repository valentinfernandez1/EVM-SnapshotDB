import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { I_StorageDigest } from "../utils/interfaces";
import Account from "../models/Account";
import Code from "../models/Code";
import Storage from "../models/Storage";

const router = Router();

//Define routes Here
router.get("/storage_digest", async (req: Request, res: Response, next: NextFunction) => {
    let storageDigest: I_StorageDigest;
    

    try {
        let storageDigest: I_StorageDigest = {
            accounts: {
                amount: await Account.countDocuments(),
                total_supply: 0 //TODO:
            },
            contracts: {
                amount: await Code.countDocuments(),
                extracted_storages: await Storage.countDocuments(),
                storage_keys: 0 //TODO:
            }
        }

        res.status(200).json(storageDigest)
    } catch (error) {
        return res.status(500).json(error);
    }
});

export default router;
