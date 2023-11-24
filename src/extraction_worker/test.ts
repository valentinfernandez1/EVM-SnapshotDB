import blake2 from 'blake2';

let hash = blake2.createHash('blake2b');

let nftData =
	'608060405234801561001057600080fd5b50600436106101f05760003560e01c80635c975abb1161010f578063ab941828116100a2578063d90794cf11610071578063d90794cf1461055d578063e985e9c514610579578063ea01b492146105a9578063f2fde38b146105d9576101f0565b8063ab941828146104d7578063b88d4fde146104f5578063c87b56dd14610511578063d193ded214610541576101f0565b8063715018a6116100de578063715018a6146104755780638da5cb5b1461047f57806395d89b411461049d578063a22cb465146104bb576101f0565b80635c975abb146103d95780636352211e146103f7578063694ca01d1461042757806370a0823114610445576101f0565b80631f21bfbf1161018757806332cb6b0c1161015657806332cb6b0c1461037957806336566f061461039757806342842e0e146103a157806342966c68146103bd576101f0565b80631f21bfbf1461030557806323b872dd146103235780632af9a2d91461033f57806331b5b9071461035d576101f0565b8063081812fc116101c3578063081812fc1461026b578063095ea7b31461029b578063141a468c146102b757806318160ddd146102e7576101f0565b8063017043a5146101f557806301ffc9a7146101ff578063021313cf1461022f57806306fdde031461024d575b600080fd5b6101fd6105f5565b005b61021960048036038101906102149190612eb5565b610607565b6040516102269190612efd565b60405180910390f35b6102376106e9565b6040516102449190612efd565b60405180910390f35b610255610700565b6040516102629190612fb1565b60405180910390f35b61028560048036038101906102809190613009565b610792565b6040516102929190613077565b60405180910390f35b6102b560048036038101906102b091906130be565b6107d8565b005b6102d160048036038101906102cc9190613009565b6108ef565b6040516102de919061310d565b60405180910390f35b6102ef610907565b6040516102fc919061310d565b60405180910390f35b61030d61091e565b60405161031a919061310d565b60405180910390f35b61033d60048036038101906103389190613128565b610924565b005b610347610984565b6040516103549190612efd565b60405180910390f35b610377600480360381019061037291906132b0565b6109a8565b005b610381610a07565b60405161038e919061310d565b60405180910390f35b61039f610a0d565b005b6103bb60048036038101906103b69190613128565b610a39565b005b6103d760048036038101906103d29190613009565b610a59565b005b6103e1610b3a565b6040516103ee9190612efd565b60405180910390f35b610411600480360381019061040c9190613009565b610b51565b60405161041e9190613077565b60405180910390f35b61042f610bd7565b60405161043c919061310d565b60405180910390f35b61045f600480360381019061045a91906132f9565b610bdd565b60405161046c919061310d565b60405180910390f35b61047d610c94565b005b610487610ca8565b6040516104949190613077565b60405180910390f35b6104a5610cd2565b6040516104b29190612fb1565b60405180910390f35b6104d560048036038101906104d09190613352565b610d64565b005b6104df610d7a565b6040516104ec9190612efd565b60405180910390f35b61050f600480360381019061050a9190613433565b610d8d565b005b61052b60048036038101906105269190613009565b610def565b6040516105389190612fb1565b60405180910390f35b61055b6004803603810190610556919061365f565b610e57565b005b610577600480360381019061057291906136ea565b6112bc565b005b610593600480360381019061058e9190613746565b6115eb565b6040516105a09190612efd565b60405180910390f35b6105c360048036038101906105be91906132b0565b61167f565b6040516105d09190612efd565b60405180910390f35b6105f360048036038101906105ee91906132f9565b6116b5565b005b6105fd611738565b6106056117b6565b565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806106d257507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806106e257506106e18261187a565b5b9050919050565b6000600e60009054906101000a900460ff16905090565b60606000805461070f906137b5565b80601f016020809104026020016040519081016040528092919081815260200182805461073b906137b5565b80156107885780601f1061075d57610100808354040283529160200191610788565b820191906000526020600020905b81548152906001019060200180831161076b57829003601f168201915b5050505050905090565b600061079d826118e4565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006107e382610b51565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610853576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161084a90613858565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661087261192f565b73ffffffffffffffffffffffffffffffffffffffff1614806108a157506108a08161089b61192f565b6115eb565b5b6108e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d7906138ea565b60405180910390fd5b6108ea8383611937565b505050565b600f6020528060005260406000206000915090505481565b6000600b54600a546109199190613939565b905090565b600a5481565b61093561092f61192f565b826119f0565b610974576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096b906139df565b60405180910390fd5b61097f838383611a85565b505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6109b0611738565b60008151116109f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109eb90613a71565b60405180910390fd5b8060089081610a039190613c3d565b5050565b60095481565b610a15611738565b610a1d610b3a565b610a2e57610a29611d7e565b610a37565b610a36611de1565b5b565b610a5483838360405180602001604052806000815250610d8d565b505050565b610a61611e44565b610a72610a6c61192f565b826119f0565b610ab1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aa8906139df565b60405180910390fd5b600b6000815480929190610ac490613d0f565b9190505550610ad281611e8e565b3373ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167f175446c69d88b635de5df85a3479a0a1300e1112c7eeb4315b34b2ed921bcfc983604051610b2f919061310d565b60405180910390a350565b6000600660009054906101000a900460ff16905090565b600080610b5d83611fdc565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610bce576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc590613da3565b60405180910390fd5b80915050919050565b600b5481565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c4d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4490613e35565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610c9c611738565b610ca66000612019565b565b6000600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610ce1906137b5565b80601f0160208091040260200160405190810160405280929190818152602001828054610d0d906137b5565b8015610d5a5780601f10610d2f57610100808354040283529160200191610d5a565b820191906000526020600020905b815481529060010190602001808311610d3d57829003601f168201915b5050505050905090565b610d76610d6f61192f565b83836120df565b5050565b600c60009054906101000a900460ff1681565b610d9e610d9861192f565b836119f0565b610ddd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dd4906139df565b60405180910390fd5b610de98484848461224b565b50505050565b6060610dfa826118e4565b6000610e046122a7565b90506000815111610e245760405180602001604052806000815250610e4f565b80610e2e846122ef565b604051602001610e3f929190613e91565b6040516020818303038152906040525b915050919050565b610e5f611738565b600e60009054906101000a900460ff1615610eaf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ea690613f01565b60405180910390fd5b610eb7611e44565b610ebf6123bd565b6000825111610f03576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610efa90613f6d565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000015610f64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f5b90613fd9565b60405180910390fd5b8051825114610fa8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9f90614045565b60405180910390fd5b60008251600a54610fb99190614065565b905060095481111580610fce57506000600954145b61100d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161100490614107565b60405180910390fd5b6000600a54905060005b845181101561129357600084828151811061103557611034614127565b5b60200260200101510361107d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611074906141a2565b60405180910390fd5b60095484828151811061109357611092614127565b5b602002602001015111156110dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d390614234565b60405180910390fd5b600d8582815181106110f1576110f0614127565b5b60200260200101516040516111069190614254565b908152602001604051809103902060009054906101000a900460ff1615611162576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611159906142b7565b60405180910390fd5b6001600d86838151811061117957611178614127565b5b602002602001015160405161118e9190614254565b908152602001604051809103902060006101000a81548160ff02191690831515021790555081806111be90613d0f565b9250503073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fac0d34dfa38069e2d8de85e67819410e6437f66ce1d87fabe743e67e90500b0186848151811061122357611222614127565b5b602002602001015188858151811061123e5761123d614127565b5b60200260200101516040516112549291906142d7565b60405180910390a36112808685838151811061127357611272614127565b5b602002602001015161240c565b808061128b90613d0f565b915050611017565b5080600a8190555060095482036112ad576112ac6117b6565b5b50506112b761242a565b505050565b6112c4611738565b600e60009054906101000a900460ff1615611314576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161130b90613f01565b60405180910390fd5b61131c611e44565b6113246123bd565b6000815111611368576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161135f90613f6d565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006113c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113bf90614353565b60405180910390fd5b60008151600a546113d99190614065565b9050600954811115806113ee57506000600954145b61142d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142490614107565b60405180910390fd5b6000600a54905060005b83518110156115c357600d84828151811061145557611454614127565b5b602002602001015160405161146a9190614254565b908152602001604051809103902060009054906101000a900460ff16156114c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114bd906142b7565b60405180910390fd5b6001600d8583815181106114dd576114dc614127565b5b60200260200101516040516114f29190614254565b908152602001604051809103902060006101000a81548160ff021916908315150217905550818061152290613d0f565b9250503073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fac0d34dfa38069e2d8de85e67819410e6437f66ce1d87fabe743e67e90500b018487858151811061158857611587614127565b5b602002602001015160405161159e9291906142d7565b60405180910390a36115b0858361240c565b80806115bb90613d0f565b915050611437565b5080600a8190555060095482036115dd576115dc6117b6565b5b50506115e761242a565b5050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600d818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b6116bd611738565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361172c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611723906143e5565b60405180910390fd5b61173581612019565b50565b61174061192f565b73ffffffffffffffffffffffffffffffffffffffff1661175e610ca8565b73ffffffffffffffffffffffffffffffffffffffff16146117b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117ab90614451565b60405180910390fd5b565b600e60009054906101000a900460ff1615611806576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117fd90613f01565b60405180910390fd5b6001600e60006101000a81548160ff02191690831515021790555060006009540361183557600a546009819055505b3073ffffffffffffffffffffffffffffffffffffffff167ff638264d20d4259c3929fac10ba4d7e96d0002d249466a1a1ce9e0f4d20ea44260405160405180910390a2565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6118ed81612434565b61192c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161192390613da3565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166119aa83610b51565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806119fc83610b51565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611a3e5750611a3d81856115eb565b5b80611a7c57508373ffffffffffffffffffffffffffffffffffffffff16611a6484610792565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16611aa582610b51565b73ffffffffffffffffffffffffffffffffffffffff1614611afb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611af2906144e3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611b6a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b6190614575565b60405180910390fd5b611b778383836001612475565b8273ffffffffffffffffffffffffffffffffffffffff16611b9782610b51565b73ffffffffffffffffffffffffffffffffffffffff1614611bed576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611be4906144e3565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611d79838383600161259b565b505050565b611d86611e44565b6001600660006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611dca61192f565b604051611dd79190613077565b60405180910390a1565b611de96125a1565b6000600660006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611e2d61192f565b604051611e3a9190613077565b60405180910390a1565b611e4c610b3a565b15611e8c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e83906145e1565b60405180910390fd5b565b6000611e9982610b51565b9050611ea9816000846001612475565b611eb282610b51565b90506004600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506002600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905581600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611fd881600084600161259b565b5050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600660019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361214d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121449061464d565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161223e9190612efd565b60405180910390a3505050565b612256848484611a85565b612262848484846125ea565b6122a1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612298906146df565b60405180910390fd5b50505050565b606060086122ca3073ffffffffffffffffffffffffffffffffffffffff16612771565b6040516020016122db9291906147ce565b604051602081830303815290604052905090565b6060600060016122fe8461278f565b01905060008167ffffffffffffffff81111561231d5761231c613185565b5b6040519080825280601f01601f19166020018201604052801561234f5781602001600182028036833780820191505090505b509050600082602001820190505b6001156123b2578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816123a6576123a56147fd565b5b0494506000850361235d575b819350505050919050565b600260075403612402576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123f990614878565b60405180910390fd5b6002600781905550565b6124268282604051806020016040528060008152506128e2565b5050565b6001600781905550565b60008073ffffffffffffffffffffffffffffffffffffffff1661245683611fdc565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600181111561259557600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146125095780600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546125019190613939565b925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146125945780600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461258c9190614065565b925050819055505b5b50505050565b50505050565b6125a9610b3a565b6125e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125df906148e4565b60405180910390fd5b565b600061260b8473ffffffffffffffffffffffffffffffffffffffff1661293d565b15612764578373ffffffffffffffffffffffffffffffffffffffff1663150b7a0261263461192f565b8786866040518563ffffffff1660e01b81526004016126569493929190614959565b6020604051808303816000875af192505050801561269257506040513d601f19601f8201168201806040525081019061268f91906149ba565b60015b612714573d80600081146126c2576040519150601f19603f3d011682016040523d82523d6000602084013e6126c7565b606091505b50600081510361270c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612703906146df565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050612769565b600190505b949350505050565b606061278882600161278285612960565b016129f0565b9050919050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106127ed577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816127e3576127e26147fd565b5b0492506040810190505b6d04ee2d6d415b85acef8100000000831061282a576d04ee2d6d415b85acef810000000083816128205761281f6147fd565b5b0492506020810190505b662386f26fc10000831061285957662386f26fc10000838161284f5761284e6147fd565b5b0492506010810190505b6305f5e1008310612882576305f5e1008381612878576128776147fd565b5b0492506008810190505b61271083106128a757612710838161289d5761289c6147fd565b5b0492506004810190505b606483106128ca57606483816128c0576128bf6147fd565b5b0492506002810190505b600a83106128d9576001810190505b80915050919050565b6128ec8383612c2c565b6128f960008484846125ea565b612938576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161292f906146df565b60405180910390fd5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600080600090506000608084901c111561298257608083901c92506010810190505b6000604084901c111561299d57604083901c92506008810190505b6000602084901c11156129b857602083901c92506004810190505b6000601084901c11156129d357601083901c92506002810190505b6000600884901c11156129e7576001810190505b80915050919050565b606060006002836002612a0391906149e7565b612a0d9190614065565b67ffffffffffffffff811115612a2657612a25613185565b5b6040519080825280601f01601f191660200182016040528015612a585781602001600182028036833780820191505090505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110612a9057612a8f614127565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110612af457612af3614127565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006001846002612b3491906149e7565b612b3e9190614065565b90505b6001811115612bde577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110612b8057612b7f614127565b5b1a60f81b828281518110612b9757612b96614127565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c945080612bd790614a41565b9050612b41565b5060008414612c22576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612c1990614ab6565b60405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612c9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612c9290614b22565b60405180910390fd5b612ca481612434565b15612ce4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612cdb90614b8e565b60405180910390fd5b612cf2600083836001612475565b612cfb81612434565b15612d3b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d3290614b8e565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4612e4560008383600161259b565b5050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612e9281612e5d565b8114612e9d57600080fd5b50565b600081359050612eaf81612e89565b92915050565b600060208284031215612ecb57612eca612e53565b5b6000612ed984828501612ea0565b91505092915050565b60008115159050919050565b612ef781612ee2565b82525050565b6000602082019050612f126000830184612eee565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612f52578082015181840152602081019050612f37565b83811115612f61576000848401525b50505050565b6000601f19601f8301169050919050565b6000612f8382612f18565b612f8d8185612f23565b9350612f9d818560208601612f34565b612fa681612f67565b840191505092915050565b60006020820190508181036000830152612fcb8184612f78565b905092915050565b6000819050919050565b612fe681612fd3565b8114612ff157600080fd5b50565b60008135905061300381612fdd565b92915050565b60006020828403121561301f5761301e612e53565b5b600061302d84828501612ff4565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061306182613036565b9050919050565b61307181613056565b82525050565b600060208201905061308c6000830184613068565b92915050565b61309b81613056565b81146130a657600080fd5b50565b6000813590506130b881613092565b92915050565b600080604083850312156130d5576130d4612e53565b5b60006130e3858286016130a9565b92505060206130f485828601612ff4565b9150509250929050565b61310781612fd3565b82525050565b600060208201905061312260008301846130fe565b92915050565b60008060006060848603121561314157613140612e53565b5b600061314f868287016130a9565b9350506020613160868287016130a9565b925050604061317186828701612ff4565b9150509250925092565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6131bd82612f67565b810181811067ffffffffffffffff821117156131dc576131db613185565b5b80604052505050565b60006131ef612e49565b90506131fb82826131b4565b919050565b600067ffffffffffffffff82111561321b5761321a613185565b5b61322482612f67565b9050602081019050919050565b82818337600083830152505050565b600061325361324e84613200565b6131e5565b90508281526020810184848401111561326f5761326e613180565b5b61327a848285613231565b509392505050565b600082601f8301126132975761329661317b565b5b81356132a7848260208601613240565b91505092915050565b6000602082840312156132c6576132c5612e53565b5b600082013567ffffffffffffffff8111156132e4576132e3612e58565b5b6132f084828501613282565b91505092915050565b60006020828403121561330f5761330e612e53565b5b600061331d848285016130a9565b91505092915050565b61332f81612ee2565b811461333a57600080fd5b50565b60008135905061334c81613326565b92915050565b6000806040838503121561336957613368612e53565b5b6000613377858286016130a9565b92505060206133888582860161333d565b9150509250929050565b600067ffffffffffffffff8211156133ad576133ac613185565b5b6133b682612f67565b9050602081019050919050565b60006133d66133d184613392565b6131e5565b9050828152602081018484840111156133f2576133f1613180565b5b6133fd848285613231565b509392505050565b600082601f83011261341a5761341961317b565b5b813561342a8482602086016133c3565b91505092915050565b6000806000806080858703121561344d5761344c612e53565b5b600061345b878288016130a9565b945050602061346c878288016130a9565b935050604061347d87828801612ff4565b925050606085013567ffffffffffffffff81111561349e5761349d612e58565b5b6134aa87828801613405565b91505092959194509250565b600067ffffffffffffffff8211156134d1576134d0613185565b5b602082029050602081019050919050565b600080fd5b60006134fa6134f5846134b6565b6131e5565b9050808382526020820190506020840283018581111561351d5761351c6134e2565b5b835b8181101561356457803567ffffffffffffffff8111156135425761354161317b565b5b80860161354f8982613282565b8552602085019450505060208101905061351f565b5050509392505050565b600082601f8301126135835761358261317b565b5b81356135938482602086016134e7565b91505092915050565b600067ffffffffffffffff8211156135b7576135b6613185565b5b602082029050602081019050919050565b60006135db6135d68461359c565b6131e5565b905080838252602082019050602084028301858111156135fe576135fd6134e2565b5b835b8181101561362757806136138882612ff4565b845260208401935050602081019050613600565b5050509392505050565b600082601f8301126136465761364561317b565b5b81356136568482602086016135c8565b91505092915050565b60008060006060848603121561367857613677612e53565b5b6000613686868287016130a9565b935050602084013567ffffffffffffffff8111156136a7576136a6612e58565b5b6136b38682870161356e565b925050604084013567ffffffffffffffff8111156136d4576136d3612e58565b5b6136e086828701613631565b9150509250925092565b6000806040838503121561370157613700612e53565b5b600061370f858286016130a9565b925050602083013567ffffffffffffffff8111156137305761372f612e58565b5b61373c8582860161356e565b9150509250929050565b6000806040838503121561375d5761375c612e53565b5b600061376b858286016130a9565b925050602061377c858286016130a9565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806137cd57607f821691505b6020821081036137e0576137df613786565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b6000613842602183612f23565b915061384d826137e6565b604082019050919050565b6000602082019050818103600083015261387181613835565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b60006138d4603d83612f23565b91506138df82613878565b604082019050919050565b60006020820190508181036000830152613903816138c7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061394482612fd3565b915061394f83612fd3565b9250828210156139625761396161390a565b5b828203905092915050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b60006139c9602d83612f23565b91506139d48261396d565b604082019050919050565b600060208201905081810360008301526139f8816139bc565b9050919050565b7f62617365205552492063616e6e6f7420626520616e20656d707479207374726960008201527f6e67000000000000000000000000000000000000000000000000000000000000602082015250565b6000613a5b602283612f23565b9150613a66826139ff565b604082019050919050565b60006020820190508181036000830152613a8a81613a4e565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302613af37fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82613ab6565b613afd8683613ab6565b95508019841693508086168417925050509392505050565b6000819050919050565b6000613b3a613b35613b3084612fd3565b613b15565b612fd3565b9050919050565b6000819050919050565b613b5483613b1f565b613b68613b6082613b41565b848454613ac3565b825550505050565b600090565b613b7d613b70565b613b88818484613b4b565b505050565b5b81811015613bac57613ba1600082613b75565b600181019050613b8e565b5050565b601f821115613bf157613bc281613a91565b613bcb84613aa6565b81016020851015613bda578190505b613bee613be685613aa6565b830182613b8d565b50505b505050565b600082821c905092915050565b6000613c1460001984600802613bf6565b1980831691505092915050565b6000613c2d8383613c03565b9150826002028217905092915050565b613c4682612f18565b67ffffffffffffffff811115613c5f57613c5e613185565b5b613c6982546137b5565b613c74828285613bb0565b600060209050601f831160018114613ca75760008415613c95578287015190505b613c9f8582613c21565b865550613d07565b601f198416613cb586613a91565b60005b82811015613cdd57848901518255600182019150602085019450602081019050613cb8565b86831015613cfa5784890151613cf6601f891682613c03565b8355505b6001600288020188555050505b505050505050565b6000613d1a82612fd3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203613d4c57613d4b61390a565b5b600182019050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b6000613d8d601883612f23565b9150613d9882613d57565b602082019050919050565b60006020820190508181036000830152613dbc81613d80565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000613e1f602983612f23565b9150613e2a82613dc3565b604082019050919050565b60006020820190508181036000830152613e4e81613e12565b9050919050565b600081905092915050565b6000613e6b82612f18565b613e758185613e55565b9350613e85818560208601612f34565b80840191505092915050565b6000613e9d8285613e60565b9150613ea98284613e60565b91508190509392505050565b7f4d696e742068617320656e646564000000000000000000000000000000000000600082015250565b6000613eeb600e83612f23565b9150613ef682613eb5565b602082019050919050565b60006020820190508181036000830152613f1a81613ede565b9050919050565b7f63616e6e6f74206d696e74207a65726f20746f6b656e73000000000000000000600082015250565b6000613f57601783612f23565b9150613f6282613f21565b602082019050919050565b60006020820190508181036000830152613f8681613f4a565b9050919050565b7f73657269616c206d696e7420656e61626c656400000000000000000000000000600082015250565b6000613fc3601383612f23565b9150613fce82613f8d565b602082019050919050565b60006020820190508181036000830152613ff281613fb6565b9050919050565b7f6172726179206c656e677468206d69736d617463680000000000000000000000600082015250565b600061402f601583612f23565b915061403a82613ff9565b602082019050919050565b6000602082019050818103600083015261405e81614022565b9050919050565b600061407082612fd3565b915061407b83612fd3565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156140b0576140af61390a565b5b828201905092915050565b7f537570706c792065786365656465640000000000000000000000000000000000600082015250565b60006140f1600f83612f23565b91506140fc826140bb565b602082019050919050565b60006020820190508181036000830152614120816140e4565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f63616e6e6f74206d696e7420746f6b656e206964203000000000000000000000600082015250565b600061418c601683612f23565b915061419782614156565b602082019050919050565b600060208201905081810360008301526141bb8161417f565b9050919050565b7f746f6b656e2069642063616e6e6f742062652067726561746572207468616e2060008201527f6d617820737570706c7900000000000000000000000000000000000000000000602082015250565b600061421e602a83612f23565b9150614229826141c2565b604082019050919050565b6000602082019050818103600083015261424d81614211565b9050919050565b60006142608284613e60565b915081905092915050565b7f67616d65496e76656e746f7279496420616c7265616479207573656400000000600082015250565b60006142a1601c83612f23565b91506142ac8261426b565b602082019050919050565b600060208201905081810360008301526142d081614294565b9050919050565b60006040820190506142ec60008301856130fe565b81810360208301526142fe8184612f78565b90509392505050565b7f73657269616c206d696e74207265717569726564000000000000000000000000600082015250565b600061433d601483612f23565b915061434882614307565b602082019050919050565b6000602082019050818103600083015261436c81614330565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006143cf602683612f23565b91506143da82614373565b604082019050919050565b600060208201905081810360008301526143fe816143c2565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061443b602083612f23565b915061444682614405565b602082019050919050565b6000602082019050818103600083015261446a8161442e565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b60006144cd602583612f23565b91506144d882614471565b604082019050919050565b600060208201905081810360008301526144fc816144c0565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061455f602483612f23565b915061456a82614503565b604082019050919050565b6000602082019050818103600083015261458e81614552565b9050919050565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b60006145cb601083612f23565b91506145d682614595565b602082019050919050565b600060208201905081810360008301526145fa816145be565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000614637601983612f23565b915061464282614601565b602082019050919050565b600060208201905081810360008301526146668161462a565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b60006146c9603283612f23565b91506146d48261466d565b604082019050919050565b600060208201905081810360008301526146f8816146bc565b9050919050565b6000815461470c816137b5565b6147168186613e55565b94506001821660008114614731576001811461474657614779565b60ff1983168652811515820286019350614779565b61474f85613a91565b60005b8381101561477157815481890152600182019150602081019050614752565b838801955050505b50505092915050565b7f2f00000000000000000000000000000000000000000000000000000000000000600082015250565b60006147b8600183613e55565b91506147c382614782565b600182019050919050565b60006147da82856146ff565b91506147e68284613e60565b91506147f1826147ab565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b6000614862601f83612f23565b915061486d8261482c565b602082019050919050565b6000602082019050818103600083015261489181614855565b9050919050565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b60006148ce601483612f23565b91506148d982614898565b602082019050919050565b600060208201905081810360008301526148fd816148c1565b9050919050565b600081519050919050565b600082825260208201905092915050565b600061492b82614904565b614935818561490f565b9350614945818560208601612f34565b61494e81612f67565b840191505092915050565b600060808201905061496e6000830187613068565b61497b6020830186613068565b61498860408301856130fe565b818103606083015261499a8184614920565b905095945050505050565b6000815190506149b481612e89565b92915050565b6000602082840312156149d0576149cf612e53565b5b60006149de848285016149a5565b91505092915050565b60006149f282612fd3565b91506149fd83612fd3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615614a3657614a3561390a565b5b828202905092915050565b6000614a4c82612fd3565b915060008203614a5f57614a5e61390a565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b6000614aa0602083612f23565b9150614aab82614a6a565b602082019050919050565b60006020820190508181036000830152614acf81614a93565b9050919050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b6000614b0c602083612f23565b9150614b1782614ad6565b602082019050919050565b60006020820190508181036000830152614b3b81614aff565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000614b78601c83612f23565b9150614b8382614b42565b602082019050919050565b60006020820190508181036000830152614ba781614b6b565b905091905056fea264697066735822122003258728ab86f702c893741886955fe1bef83c813a821b34ecc69ffe39871c9f64736f6c634300080f0033';

hash.update(Buffer.from(nftData));
console.log(hash.digest('hex'));
