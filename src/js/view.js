var contractAddresses = []

$(document).ready(function() {

  _web3.eth.getBlock("latest",
   function (err, data) {
     var latest = data.number

     for (var i = 0; i <= latest; i++) {
       _web3.eth.getBlock(i,
         function(e, d) {
           for (var j = 0; j < d.transactions.length; j++) {
             _web3.eth.getTransactionReceipt(d.transactions[j],
               function(err, receipt) {
                 contractAddresses.push(receipt.contractAddress)
                 let addr = receipt.contractAddress
                 let blockNumber = receipt.blockNumber
                 let txIndex = receipt.transactionIndex
                 let txId = blockNumber * 1000 + txIndex

                 // create the accordion tab with the info about the contract
                 let inst = Contract.at(receipt.contractAddress)

                 let card = $("<div class='card'></div>")[0]
                 let cardHeader = $("<div class='card-header' id='heading" + txId + "'></div>")[0]
                 cardHeader.innerHTML = "<pre>" + addr + "</pre>"
                 console.log(cardHeader)
                 card.append(cardHeader)
                 $("#accordion")[0].append(card)

                 // <div class="card">
                 //   <div class="card-header" id="headingTwo">
               }
             )
           }
         }
       )
     }
   }
 );

});
