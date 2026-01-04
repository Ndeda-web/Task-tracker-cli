#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

function loadTasks() {
    if (!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
    }
   try{ 
    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
 }catch (err) {
        console.log("Error reading tasks.json, resetting file...");
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
        return [];
    }
}


function now() {
    return new Date().toISOString();
}

function addTask(description, tasks) {
    if (!description) {
        console.log("Please provide a task description.");
        return;
    }

     const exists = tasks.some(t => t.description === description);
    if (exists) {
        console.log("Task already exists. Skipping.");
        return;
    }

    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    const newTask = {
        id,
        description,
        status: "todo",
        createdAt: now(),
        updatedAt: now()
    };

    tasks.push(newTask);
    saveTasks(tasks);

    console.log(`Task added successfully (ID: ${id})`);
}

function updateTask(id, description, tasks) {
    if (!id || !description) {
        console.log("Usage: task-cli update <id> <new description>");
        return;
    }

    id = parseInt(id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.description = description;
    task.updatedAt = now();

    saveTasks(tasks);
    console.log(`Task ${id} updated successfully.`);
}

function markTask(id, status, tasks) {
    if (!id) {
        console.log(`Usage: task-cli ${status === 'done' ? 'mark-done' : 'mark-in-progress'} <id>`);
        return;
    }

    id = parseInt(id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.status = status;
    task.updatedAt = now();

    saveTasks(tasks);
    console.log(`Task ${id} marked as ${status}.`);
}



function listTasks(filter, tasks) {
    let filteredTasks = tasks;

    if (filter) {
        if (!['todo', 'in-progress', 'done'].includes(filter)) {
            console.log("Invalid filter. Use: todo, in-progress, done");
            return;
        }
        filteredTasks = tasks.filter(task => task.status === filter);
    }

    if (filteredTasks.length === 0) {j
        console.log("No tasks found.");
        return;
    }

    filteredTasks.forEach(task => {
        console.log(`[${task.id}] ${task.description} - ${task.status}`);
    });
}

function deleteTask(id, tasks) {
    if (!id) {
        console.log("Usage: task-cli delete <id>");
        return;
    }

    id = parseInt(id);

    const newTasks = tasks.filter(task => task.id !== id);

    if (newTasks.length === tasks.length) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    saveTasks(newTasks);
    console.log(`Task ${id} deleted successfully.`);
}



function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log("Usage: node task-cli.js add \"Task description\"");
        return;
    }

    const command = args[0];
    const tasks = loadTasks();

    switch (command) {
    case 'add':
        addTask(args.slice(1).join(' '), tasks);
        break;

    case 'update':
        updateTask(args[1], args.slice(2).join(' '), tasks);
        break;

    case 'delete':
        deleteTask(args[1], tasks);
        break;

    case 'mark-in-progress':
        markTask(args[1], 'in-progress', tasks);
        break;

    case 'mark-done':
        markTask(args[1], 'done', tasks);
        break;

    case 'list':
        listTasks(args[1], tasks);
        break;

    default:
        console.log("Unknown command:", command);
 }


    if (command === 'add') {
     addTask(args.slice(1).join(' '), tasks);
      } else if (command === 'list') {
     listTasks(args[1], tasks);
        } else {
     console.log("Unknown command:", command);
    }


   
}

main();


