# Evm SnapshotDB

This project is being developed as a tool for the Mythical Games Parachain Snapshot Migration. The objective of this tool is to extract the state of the accounts(EOA and Contracts), code of Contracts and their storage keys from an EVM node. This data can then be inserted into the Mythical Games Parachain.

## Configuration
In order for this to work a few variables must be included in a `.env` file:
```
MONGO_DB_URL = # DB connection string
RPC_WS_URL   = # WebSocket of the node
BESU_API_KEY = # API key of the RPC node 
BLOCK_HASH   = # From which block the data will be extracted
``` 

Some extra values can be tweaked depending to define how much workload will be sent to the RPC node. This values are in `./src/constants/utility.ts`

```typescript
//Amount of contract storage promises in parallel
storageConcurrentLimit: number = 1500;
//Keys to obtain on each storage request
amountOfKeys: number = 14500;
//Amount of accounts to query at the same time
accountsBatchSize: number = 3000;
```

## EVM SnapshotDB Instructions
1. Install dependencies:
    ```bash
    npm install
    ```
2. Create the `.env` file with all the necessary values
    ```bash
    cat .env
    MONGO_DB_URL=XXXX
    RPC_WS_URL=XXXX
    BESU_API_KEY=XXXX 
    BLOCK_HASH=XXXX
    ```
3. Run the script
    ```bash
    npm run dev
    ```

