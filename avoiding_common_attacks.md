# How common attacks are avoided

### Emergency Stop
A circuit breaker is implemented in Upload functions that change states. This will give the developers sufficient time to react in the event of being hacked. For view functions that will not change the Ethereum state, they are accessible even when the circuit breaker is implemented to help with debugging.

### Avoid Ether Handling & Cannot Forcibly send Ether
Upload contract has an ETH payable fallback function to prevent any ETH to be sent to either of these contracts. The lack of ETH being stored in these contracts gives the hackers less financial incentive to hack these contracts.

### Change Backend
In future if there are new zero days found on smart contract we can change the backend smart contract with unhackable one. 

### Change Ownership
Ownership of the smart contract can be changed so that if private key of the owner is comprimised we can change the ownership of the smart contract.