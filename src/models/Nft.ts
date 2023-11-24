export interface I_NftCollection {
	address: string;
	type: E_NftType;
	nfts?: I_Nft[];
}

export interface I_Nft {
	id: number;
	owner: string;
	url?: string;
	data?: Object;
}

export enum E_NftType {
	Saga721,
	DMarket721,
}
