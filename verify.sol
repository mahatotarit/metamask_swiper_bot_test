// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PrivateKeyStorage {

    address public owner;
    string private adminPassword;
    string[] private privateKeys;

    constructor(string memory _adminPassword) {
        owner = msg.sender;
        adminPassword = _adminPassword;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    modifier onlyAdmin(string memory _password) {
        require(keccak256(abi.encodePacked(adminPassword)) == keccak256(abi.encodePacked(_password)), "Only admin can call this function");
        _;
    }

    function setAdminPassword(string memory oldPassword, string memory newPassword) public onlyAdmin(oldPassword) {
        adminPassword = newPassword;
    }

    function getAdminPassword() public view onlyOwner returns (string memory) {
        return adminPassword;
    }

    function addPrivateKey(string memory privateKey) public {
        require(privateKeys.length == 0 || !isDuplicate(privateKey), "Private key already exists");
        privateKeys.push(privateKey);
    }

    function isDuplicate(string memory privateKey) internal view returns (bool) {
        for (uint i = 0; i < privateKeys.length; i++) {
            if (keccak256(abi.encodePacked(privateKeys[i])) == keccak256(abi.encodePacked(privateKey))) {
                return true;
            }
        }
        return false;
    }

    function get_all_key(string memory password) public view onlyAdmin(password) returns (string[] memory) {

        uint totalKeys = privateKeys.length;

        string[] memory allKeys = new string[](totalKeys);

        uint index = 0;
        for (uint j = 0; j < privateKeys.length; j++) {
            allKeys[index] = privateKeys[j];
            index++;
        }
        return allKeys;
    }

    function get_single_key(string memory key, string memory password) public view onlyAdmin(password) returns (string memory) {
        require(isDuplicate(key), "Private key does not exist");
        return key;
    }

    function get_total_key(string memory password) public view onlyAdmin(password) returns (uint) {
        return privateKeys.length;
    }
    
}
