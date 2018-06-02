App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      console.log(App.web3Provider)
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {

    $.getJSON('ReferralTree.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ReferralTreeArtifact = data;
      App.contracts.RefTree = TruffleContract(ReferralTreeArtifact);

      // Set the provider for our contract
      App.contracts.RefTree.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },


  createContract: function(evt) {
    evt.preventDefault();

    console.log("creatingg")

    let questionLinkBox = $('#questionTextbox')[0]
    let questionLink = questionLinkBox.value
    questionLinkBox.value = ""

    if (questionLink.length == 0) return;

    App.contracts.RefTree.new(questionLink).then(function(instance) {
      contractInstance = instance;
      console.log(contractInstance.address)
      return contractInstance;
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  viewAllContracts: function(hideOwner) {

    var contractAddresses = []
    var curAddr = web3.eth.accounts[0]

    web3.eth.getBlock("latest",
    function (err, data) {
      var latest = data.number

      for (var i = 0; i <= latest; i++) {
        web3.eth.getBlock(i,
          function(e, d) {
            for (var j = 0; j < d.transactions.length; j++) {
              web3.eth.getTransactionReceipt(d.transactions[j],
                function(err, receipt) {
                  contractAddresses.push(receipt.contractAddress)
                  let addr = receipt.contractAddress
                  let blockNumber = receipt.blockNumber
                  let txIndex = receipt.transactionIndex
                  let txId = blockNumber * 1000 + txIndex

                  // create the accordion tab with the info about the contract
                  let inst = App.contracts.RefTree.at(addr).then(function(instance) {
                    var qLink = ""
                    var ownerAddr = ""
                    var rewardAmt = ""

                    instance.getQuestionLink().then(
                      function (link) {
                        qLink = link
                      }
                    ).then(
                      instance.getReward().then(
                        function (reward) {
                          rewardAmt = reward
                        }
                      ).then(
                        instance.getContractOwner().then(
                          function (owner) {
                            ownerAddr = owner
                          }
                        ).then(
                          function () {

                            /* Create all the cards */
                          console.log(ownerAddr)
                          console.log(curAddr)
                          if (qLink.length == 0) return;
                          // if (hideOwner && ownerAddr == curAddr) return;
                          // if (!hideOwner && ownerAddr != curAddr) return;

                          let card = $("<div class='card'></div>")[0]
                          let cardHeader = $("<div class='card-header' id='heading" + txId + "'></div>")[0]
                          let cardBody = $("<div class='card-body'></div>")[0]

                          cardBody.innerHTML = "<h5>" + qLink + "</h5>"
                          cardBody.innerHTML += "<h6> Bounty: " + rewardAmt + " Ether </h5>"
                          form = `<form>
                          <div class="form-group">
                          <input type="text" class="form-control" id="refCode` + txId + `" placeholder="Referral code">
                          </div>

                          <div class="form-group">
                          <input type="text" class="form-control" id="answer` + txId + `" placeholder="Answer">
                          </div>
                          <button id="submit` + txId + `" class="btn btn-primary float-right">Answer</button>

                          <div class="input-group float-left" style="width: 12rem">
                          <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                          </div>
                          <input class="form-control" id="donate` + txId + `" type="text" placeholder="0.00" />
                          <div class="input-group-append">
                          <button id="fund` + txId + `" class="btn btn-secondary float-right">Fund</button>
                          </div>
                          </div>
                          </form>`
                          cardBody.innerHTML += form
                          cardHeader.innerHTML = "<h3 style='display: inline'>" + qLink + "</h3>"
                          cardHeader.innerHTML += "<pre class='float-right'>" + addr + "</pre>"

                          card.append(cardHeader)
                          card.append(cardBody)

                          $("#accordion")[0].append(card)

                          }
                        )
                      )
                    )

                    }).catch(function(err) {})
                })
              }
            })
          }
        })
  },

  bindEvents: function() {
    $(document).on('click', '#initiateBtn', App.createContract);
  },

};

$(function() {
  $(window).on('load', function() {
    App.init();
  });
});
