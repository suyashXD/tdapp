import Web3 from 'web3';
import TaskContractABI from './TaskContractABI.json'; // Import your smart contract's ABI

// Initialize Web3 (ensure you connect it properly)
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Smart Contract Address (replace with your deployed contract address)
const contractAddress = '0xYourSmartContractAddress';

// Create a contract instance
const taskContract = new web3.eth.Contract(TaskContractABI, contractAddress);


export const fetchTasks = async () => {
    try {
        const tasks = await taskContract.methods.getTasks().call();
        return tasks.map((task, index) => ({
            id: index,
            description: task[0],
            isCompleted: task[1],
        }));
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

/**
 * Create a new task
 * @param {string} description - The description of the task
 * @param {string} userAddress - The Ethereum address of the user
 */
export const createTask = async (description, userAddress) => {
    try {
        const receipt = await taskContract.methods
            .createTask(description)
            .send({ from: userAddress });
        console.log('Task created successfully:', receipt);
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

/**
 * Mark a task as complete
 * @param {number} taskId - The ID of the task
 * @param {string} userAddress - The Ethereum address of the user
 */
export const markTaskComplete = async (taskId, userAddress) => {
    try {
        const receipt = await taskContract.methods
            .markTaskComplete(taskId)
            .send({ from: userAddress });
        console.log('Task marked as complete:', receipt);
    } catch (error) {
        console.error('Error marking task complete:', error);
    }
};


export const getTaskCompletionStats = async () => {
    try {
        const totalTasks = await taskContract.methods.totalTasks().call();
        const completedTasks = await taskContract.methods.completedTasks().call();
        return {
            total: parseInt(totalTasks, 10),
            completed: parseInt(completedTasks, 10),
        };
    } catch (error) {
        console.error('Error fetching task completion stats:', error);
        return { total: 0, completed: 0 };
    }
};
