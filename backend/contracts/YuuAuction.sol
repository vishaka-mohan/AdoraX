// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract YuuAuction {
    event StartAuction();
    event BidAdSlot(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event EndAuction(address winner, uint amount);

    string public adSlotHash;
    address payable public seller;
    uint public endAt;
    bool public started;
    bool public ended;
    uint public lastBid;

    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;
    mapping(string => address) public ads;

    constructor(
        string memory _adSlotHash,
        uint startingBid
    ) {
        
        seller = payable(msg.sender);
        highestBid = startingBid;
        adSlotHash = _adSlotHash;
        ads[adSlotHash] = msg.sender;
    }

    function start() external {
        require(!started, "bid has already started");
        require(msg.sender == seller, "user is not the seller");

        
        started = true;
        endAt = block.timestamp + 3 days;
        lastBid = block.timestamp;

        emit StartAuction();
    }

    function bid() external payable {
        require(started, "not started");
        if(block.timestamp < endAt){
            require(msg.value > highestBid, "amount less than highest bid");
        }
        else{
            require(msg.value > (highestBid + highestBid/5), "auction ended, amount not 20% greater than highest bid");
            uint c = ((block.timestamp - endAt)/4 days)*highestBid;
            seller.transfer(c);
            payable(highestBidder).transfer(highestBid - c);

        }
        

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        lastBid = block.timestamp;

        emit BidAdSlot(msg.sender, msg.value);
    }

    function withdraw() external {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(bal);

        emit Withdraw(msg.sender, bal);
    }

    function end() external {
        require(started, "auction has not started");
        require(block.timestamp >= endAt, "auction has not ended");
        require(!ended, "ended");

        ended = true;
        if(block.timestamp - endAt > 4 days && block.timestamp - lastBid > 4 days ){
            ads[adSlotHash] = msg.sender;
            seller.transfer(highestBid);
        }
         

        emit EndAuction(highestBidder, highestBid);
    }

    
}
