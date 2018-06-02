# crypto-query-incentive-network

```bash
ganache-cli --deterministic
ganache-cli -m "check casual neglect intact tip rigid wisdom destroy ritual doll ceiling doctor"
"penalty thumb purpose ripple smart write clown garage shine cloud daughter person"

npm install http-server -g
http-server src/
```

## MetaMask Credentials
### Mnemonic
```
check casual neglect intact tip rigid wisdom destroy ritual doll ceiling doctor
```

### Account
```testing1```


## Errors
```
Transaction: 0xef3ffc45126cc59b19f0b5742ed3487e668830135db20922f5d57a389b9e897f
Gas usage: 21046
Block Number: 10
Block Time: Sat Jun 02 2018 06:02:15 GMT-0400 (EDT)
Runtime Error: revert
```

Probably because of gas usage -- unclear how to actually fix, so just restart ganache

## Compiling Solidity
```js
code = fs.readFileSync('/Users/mattfeng/crypto-query-incentive-network/qin.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
bytecode = compiledCode.contracts[':ReferralTree'].bytecode
abi = compiledCode.contracts[':ReferralTree'].interface
```

## Interaction

```js
abiDefinition = JSON.parse(compiledCode.contracts[':ReferralTree'].interface
Contract = _web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':ReferralTree'].bytecode

deployedContract = Contract.new(question,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
deployedContract.address

contractInstance = Contract.at(deployedContract.address)
contractInstance.attemptAnswer("I think the answer is 1", {from: "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24"})

web3.eth.getTransactionReceipt(hashString [, callback])

web3.eth.sendTransaction({from: web3.eth.accounts[0], to: "0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab", value:3})

web3.eth.getBlock("earliest",
  function(e, d) {
    transactions.push.apply(transactions, d.transactions)
  }
)

web3.eth.getBlock("latest",
  function(e, d) {
    transactions.push.apply(transactions, d.transactions)
  }
)

for (var i = 0; i <= 10; i++) {
  web3.eth.getBlock(i,
    function(e, d) {
      transactions.push.apply(transactions, d.transactions)
    }
  )
}

transactions.forEach(
  function(e) {
    web3.eth.getTransactionReceipt(e,
      function(err, f) {
        console.log(f.contractAddress)
      }
    )
  }
)
```

## View
- List all existing contracts
-

## Fund
- Financial pay in to a search

## Join
- Submit an answer to a search

## Initiate
- Create a new contract
