export interface I_StorageDigest {
    accounts: {
        amount: number,
        total_supply?: number
    },
    contracts: {
        amount: number,
        extracted_storages: number,
        storage_keys?: number
    },
}

export interface I_Transaction {
    from: string,
    to: string,
    contractDeployedAt: string
}