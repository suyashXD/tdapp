// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        uint256 id;
        string description;
        bool completed;
    }

    Task[] public tasks;
    mapping(address => uint256) public taskRewards;

    event TaskCreated(uint256 id, string description, address creator);
    event TaskCompleted(uint256 id, address completer);

    function createTask(string memory _description) public {
        tasks.push(Task(tasks.length, _description, false));
        emit TaskCreated(tasks.length - 1, _description, msg.sender);
    }

    function markTaskComplete(uint256 _id) public {
        require(_id < tasks.length, "Invalid task ID");
        require(!tasks[_id].completed, "Task already completed");

        tasks[_id].completed = true;
        taskRewards[msg.sender] += 10; // Reward tokens
        emit TaskCompleted(_id, msg.sender);
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }
}
