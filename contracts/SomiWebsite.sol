// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SomiWebsite
 * @dev Stores website JSON on-chain with owner-only updates
 * @notice Each deployment creates a new website at a unique address
 */
contract SomiWebsite {
    // Events
    event WebsiteCreated(address indexed owner, string websiteJson);
    event WebsiteUpdated(address indexed owner, string websiteJson);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // State
    address public owner;
    string public websiteJson;
    uint256 public createdAt;
    uint256 public updatedAt;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    /**
     * @dev Constructor - deploys a new website
     * @param _websiteJson The initial JSON content of the website
     */
    constructor(string memory _websiteJson) {
        owner = msg.sender;
        websiteJson = _websiteJson;
        createdAt = block.timestamp;
        updatedAt = block.timestamp;
        emit WebsiteCreated(msg.sender, _websiteJson);
    }

    /**
     * @dev Update the website JSON (owner only)
     * @param _websiteJson The new JSON content
     */
    function updateWebsite(string memory _websiteJson) external onlyOwner {
        websiteJson = _websiteJson;
        updatedAt = block.timestamp;
        emit WebsiteUpdated(msg.sender, _websiteJson);
    }

    /**
     * @dev Transfer ownership of the website
     * @param newOwner The new owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    /**
     * @dev Get website info
     */
    function getWebsiteInfo() external view returns (
        address _owner,
        string memory _websiteJson,
        uint256 _createdAt,
        uint256 _updatedAt
    ) {
        return (owner, websiteJson, createdAt, updatedAt);
    }
}
