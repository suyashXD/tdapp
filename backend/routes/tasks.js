const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const TaskContractABI = require('../abi/TaskContractABI.json');

const web3 = new Web3(process.env.ETHEREUM_PROVIDER);
const taskContract = new web3.eth.Contract(TaskContractABI, process.env.CONTRACT_ADDRESS);

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await taskContract.methods.getTasks().call();
        const formattedTasks = tasks.map((task, index) => ({
            id: index,
            description: task.description,
            isCompleted: task.isCompleted,
        }));
        res.status(200).json(formattedTasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const { description, userAddress } = req.body;
    try {
        const receipt = await taskContract.methods.createTask(description).send({ from: userAddress });
        res.status(201).json({ message: 'Task created', receipt });
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Mark a task as complete
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { userAddress } = req.body;
    try {
        const receipt = await taskContract.methods.markTaskComplete(id).send({ from: userAddress });
        res.status(200).json({ message: 'Task marked complete', receipt });
    } catch (error) {
        res.status(500).json({ error: 'Error marking task complete' });
    }
});

module.exports = router;
