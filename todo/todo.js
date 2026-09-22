const fs = require("fs");
const file_path = "./tasks.json";

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} Task
 */

// Helper Functions
/**
 * Persists the provided task list to disk.
 * @param {Task[]} tasks - The array of tasks to save.
 * @returns {void}
 */
function saveTask(tasks) {
    fs.writeFileSync(file_path, JSON.stringify(tasks));
}

/**
 * Loads all saved tasks from disk.
 * @returns {Task[]} The list of persisted tasks or an empty array when the file is missing/invalid.
 */
function loadTask() {
    try {
        return JSON.parse(fs.readFileSync(file_path).toString());
    } catch (error) {
        return [];
    }
}

/**
 * Adds a new task to the list and refreshes the display.
 * @param {string} argument - The task description to save.
 * @returns {void}
 */
function addTask(argument) {
    const tasks = loadTask();
    tasks.push({
        "id": Date.now(),
        "Task": argument
    });
    saveTask(tasks);
    console.log("Task Added Successfully!!");
    listTask();
}

/**
 * Lists all tasks currently saved.
 * @returns {number|void} Returns 3 when no tasks exist; otherwise logs tasks and returns nothing.
 */
function listTask() {
    const tasks = loadTask();
    if (tasks.length <= 0) {
        console.log("No tasks added yet :(");
        return 3;
    }
    console.log();
    tasks.forEach(task => {
        console.log(`id: ${task.id} - ${task.Task}`);
    });
    console.log();
}

/**
 * Removes a task by its ID.
 * @param {number} argument - The task ID to remove.
 * @returns {void}
 */
function removeTask(argument) {
    let tasks = loadTask();
    tasks = tasks.filter(task => task.id !== argument);
    saveTask(tasks);
    console.log("Task Removed Successfully");
    listTask();
}

// If no argument given just list all tasks
if (process.argv.length < 3) {
    listTask();
    return 1;
} else if (process.argv.length > 4) {
    console.log(`
        Usage: 
        ============= ANYONE OF THE 3 =============
        node [file_name.js] [add] [STRING: What to add]
        node [file_name.js] [list] 
        node [file_name.js] [remove] [NUMBER: remove task id]
    `);
    return 2;
}

const command = process.argv[2];
const argument = process.argv.length == 4 ? process.argv[3] : null;

if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTask();
} else if (command === "remove") {
    removeTask(parseInt(argument));
} else {
    console.log("command not found");
}