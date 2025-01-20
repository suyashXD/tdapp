pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        string description;
        bool isCompleted;
    }

    Task[] public tasks;
    uint public completedTasks;

    function createTask(string memory description) public {
        tasks.push(Task(description, false));
    }

    function markTaskComplete(uint taskId) public {
        require(taskId < tasks.length, "Invalid task ID");
        require(!tasks[taskId].isCompleted, "Task already completed");
        tasks[taskId].isCompleted = true;
        completedTasks++;
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function totalTasks() public view returns (uint) {
        return tasks.length;
    }
}
