$(document).ready(function() {
  document.getElementById("initiateBtn").addEventListener("click", function(e) {
    e.preventDefault()

    let questionTextbox = document.getElementById("questionTextbox")
    let question = questionTextbox.value
    questionTextbox.value = ""

    if (question.length == 0) return;

    console.log(question)

    var deployedContract = Contract.new(question, {data: byteCode, from: _web3.eth.accounts[0], gas: 4700000},

      function (err, deployed) {
        if (!err) {
          // NOTE: The callback will fire twice!
          // Once the contract has the transactionHash property set and once its deployed on an address.
          // e.g. check tx hash on the first call (transaction send)
          if (!deployed.address) {
            console.log("Txhash: " + deployed.transactionHash) // The hash of the transaction, which deploys the contract
            // check address on the second call (contract deployed)
          } else {
            console.log("Address: " + deployed.address) // the contract address
          }
        }
      }
    )

  })
});
