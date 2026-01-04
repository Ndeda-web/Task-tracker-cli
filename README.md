# Task Tracker CLI

[![Node.js](https://img.shields.io/badge/Node.js-v16+-brightgreen)](https://nodejs.org/) 
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

A **Command Line Interface (CLI)** application to manage your tasks locally using **Node.js**.  
Add, update, delete, mark, and list tasks from the terminal. Tasks are stored in a local `tasks.json` file.

---

## 🚀 Features

- Add a new task
- Update task description
- Delete a task
- Mark tasks as `in-progress` or `done`
- List all tasks or filter by status (`todo`, `in-progress`, `done`)
- Handles corrupted `tasks.json` files safely
- Auto-reuses deleted task IDs

---

## 💻 Getting Started

### Prerequisites

- Node.js installed (v16+ recommended)
- Terminal or Command Prompt

### Installation

1. Clone this repository:

```bash
git clone <your-repo-url>
cd task-tracker
