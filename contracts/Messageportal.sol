// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract MessagePortal {
  /*
  * We will be using this below to help generate a random number
  */
  uint256 private seed;

  event NewMessage(address indexed from, uint256 timestamp, string message, string messageType);

  struct Message {
    address sender;
    uint256 timestamp;
    string message;
    string messageType;
  }

  Message[] totalMessages;

  /*
  * This is an address => uint mapping, meaning I can associate an address with a number!
  * In this case, I'll be storing the address with the last time the user waved at us.
  */
  mapping(address => uint256) public lastMessageAt;

  constructor() payable {
    console.log("Smart contract init");
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function send(string memory message, string memory messageType) public {
    /*
    * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
    */
    require(
        lastMessageAt[msg.sender] + 15 minutes < block.timestamp,
        "Wait 15seconds"
    );

    /*
    * Update the current timestamp we have for the user
    */
    lastMessageAt[msg.sender] = block.timestamp;

    totalMessages.push(Message(msg.sender, block.timestamp, message, messageType));
    
    seed = (block.difficulty + block.timestamp + seed) % 100;
    console.log("Random # generated: %d", seed);

    emit NewMessage(msg.sender, block.timestamp, message, messageType);
    
    if (seed <= 5) {
      console.log("%s won!", msg.sender);

      uint256 prizeAmount = 0.0001 ether;
      require(prizeAmount <= address(this).balance, "Trying to withdraw more money that the contract has.");
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success,"Failed to withdraw money from contract.");
    }
  }

  function getTotalMessages() public view returns (uint256) {
    return totalMessages.length;
  }

  function getMessages() public view returns (Message[] memory) {
    return totalMessages;
  }
}

