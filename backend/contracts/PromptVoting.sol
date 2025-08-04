// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PromptVoting {
    uint public promptCount;

    struct Prompt {
        uint id;
        string content;
        uint votes;
        address creator;
    }

    mapping(uint => Prompt) public prompts;
    mapping(uint => mapping(address => bool)) public hasVoted;

    event PromptCreated(uint id, string content, address creator);
    event Voted(uint id, address voter);

    function createPrompt(string memory _content) public {
        promptCount++;
        prompts[promptCount] = Prompt(promptCount, _content, 0, msg.sender);
        emit PromptCreated(promptCount, _content, msg.sender);
    }

    function votePrompt(uint _id) public {
        require(_id > 0 && _id <= promptCount, "Prompt does not exist");
        require(!hasVoted[_id][msg.sender], "You already voted");

        prompts[_id].votes++;
        hasVoted[_id][msg.sender] = true;

        emit Voted(_id, msg.sender);
    }

    function getPrompt(uint _id) public view returns (Prompt memory) {
        return prompts[_id];
    }
}
