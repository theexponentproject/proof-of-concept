pragma solidity ^0.4.24;


// Public vs private?
// How to check if not in map? Run out of gas, yikes?
// Putting down money in constructor
// Putting down money in payin

contract ReferralTree {

	address public founder = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;

	// The question link the user asks
	string questionLink;
	address ownerAddr;
	uint256 reward;


	// Book keeping for referral tree

	// Address List
	address[] addressArray;
	// Forward map
	mapping (address => address[]) forwardMap;
	// Backward map
	mapping (address => address) backwardMap;
	// Answer mapping
	mapping (address => string) answerMap;

	//Save mapping (used for checkpointing)
	mapping (address => uint256) addrToIndexMap;

	// Used for payment (with checkpointing)
	uint256 nextPayeeIndex;
	uint256 payedOutNodes;


    // Constructor for tree
	constructor (string _questionLink) payable public {
        questionLink = _questionLink;
		ownerAddr = msg.sender;
		reward = msg.value;
		backwardMap[msg.sender] = 0;
		answerMap[msg.sender] = "";
		addressArray.push(msg.sender);
		addrToIndexMap[msg.sender] = addressArray.length;
    }


	// referral code is parent address also
	function registerNode(address referralCodeAlsoParentAddr) {
		addressArray.push(msg.sender);
		backwardMap[msg.sender] = referralCodeAlsoParentAddr;

		// Adding new node into parent's children
		address[] temp = forwardMap[referralCodeAlsoParentAddr];
		temp.push(msg.sender);
		forwardMap[referralCodeAlsoParentAddr] = temp;

		answerMap[msg.sender] = "";
		addrToIndexMap[msg.sender] = addressArray.length;
	}

    // Allows anyone to add to pool
    function payIn() payable public {
        reward += msg.value;
    }

    // Getting for reward
    function getReward() public view returns (uint) {
        return reward;
    }

	// Allows a node to attempt an Answer
	function attemptAnswer(string attempt) public {
		// Check later
		address send = msg.sender;
// 		require( bytes(answerMap[msg.sender]).length == 0);
		answerMap[msg.sender] = attempt;
	}

	// Modifier to restrict access
	modifier onlyCreator() {
        require(msg.sender == ownerAddr); // If it is incorrect here, it reverts.
        _;                              // Otherwise, it continues.
    }

	// Getter for answerMap's keys.
	function viewAnswerMapAddress(uint256 index) onlyCreator view returns (address){
		return addressArray[index];
	}

	// Getter for answerMap's values.
	function viewAnswerMapAnswer(uint256 index) onlyCreator view returns (string){
		return answerMap[addressArray[index]];
	}

    // Getter for total nodes
    function viewNumTotalNodes() onlyCreator view returns (uint256){
        return addressArray.length;
    }

    // Getting for number of Nodes payed out (checkpointed payment)
    function getNumNodesPayed() public view returns (uint256){
        return payedOutNodes;
    }

    // Getter for questionLink
    function getQuestionLink() public view returns (string){
        return questionLink;
    }

    // Getter for visualizing tree
    // function viewForward

    // Returns index at which we left off payment
    function getNextPayeeAddress() onlyCreator view returns (address) {
        return addressArray[nextPayeeIndex];
    }

    function getContractOwner() public view returns (address){
        return ownerAddr;
    }

    function getNextPayeeIndex() onlyCreator view returns (uint256){
        return nextPayeeIndex;
    }


	function payOut(address addr) onlyCreator {
	    uint256 toPayAmount;
		address toPayAddr = addr;
		uint256 i = addrToIndexMap[addr] - 1;


		// Determining payout (limit testing)
		if (payedOutNodes > 18){
		    toPayAmount = 0;
		    selfdestruct(founder);
		}
		else{


		    while (i > 0 && gasleft() > 200000) {
		        toPayAmount = (reward/ (2**(payedOutNodes + 1)));
			    toPayAddr.transfer(toPayAmount);

			    toPayAddr = backwardMap[toPayAddr];
			    i = addrToIndexMap[toPayAddr] - 1;
			    payedOutNodes = payedOutNodes + 1;
		    }
		        // Use remaining gas to save checkpoint
		        nextPayeeIndex = i;
                if (i == 1){
                   selfdestruct(founder);
                }
		}




	}
}
