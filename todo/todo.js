const fs = require("fs"); // fs - file system module
const filePath = "./tasks.json";

// DataBuffer to Data JSON -> parsed to JSON
const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath); // this gives return as a data buffer
    // data buffer - an object but not regular string -> convert to regular string to read it
    const dataJSON = dataBuffer.toString(); // data JSON is diff from regular JSON
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  // writefilesync to write in file
  const dataJSON = JSON.stringify(tasks); // dataJSON is a string
  fs.writeFileSync(filePath, dataJSON);
};
const addTask = (task) => {
  // load tasks , add to array , push it
  const tasks = loadTasks(); // tasks is an array
  tasks.push({ task }); // pushing task as an object
  saveTasks(tasks);
  console.log("Task added", task);
};

const listTasks = () => {
  const list = loadTasks();
  list.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task}`);
  });
};

const removeTask = (task) => {
  let removeTaskArray = loadTasks();
  const taskNumber = parseInt(task);
  removeTaskArray.splice(task - 1, 1); // removing the task
  saveTasks(removeTaskArray);
  console.log("Deleted: ", task);
  console.log("Updated List");
  listTasks();
};

// grabbing command in nodejs
// argv - argument value --- example ---  node todo/todo.js add "buy milk"
// 0: /usr/local/bin/node ---------- node
// 1: /Users/mjr/work/node/process-args.js -------- todo/todo.js
// 2: one ---------- add
// 3: two=three --------------- "buy milk"
// 4: four -----------next argument

const command = process.argv[2];
const argument = process.argv[3];

if (command == "add") {
  addTask(argument);
} else if (command == "list") {
  listTasks();
} else if (command == "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command not found");
}
