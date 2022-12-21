import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
// import NewTaskForm from './components/NewTaskForm.js';
import './App.css';


const APIURL = 'https://task-list-api-c17.herokuapp.com/';

const taskDataList = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];
const getAllTasksAPI = () => {
  //return 'Test';
  return axios.get(`${APIURL}/tasks`)
    .then(response => {
      return response.data.map(convertFromAPI);
    })
    .catch(error => { console.log(error); });
};

const convertFromAPI = (apiData) => {
  const { is_complete, ...rest } = apiData;
  const newTask = { isComplete: is_complete, ...rest };
  return newTask;
}

const getAllTasks = () => {
  return getAllTasksAPI()
    .then(tasks => {
      console.log(tasks);
    })
    .catch(error => { console.log(error); });
};

// add get-tasklist from API
const App = () => {
  console.log("This is before effect");
  useEffect(() => { getAllTasks(); }, []);

  const [taskData, setTaskData] = useState(taskDataList);

  const completeTask = (id) => {
    setTaskData((currentTaskData) =>
      currentTaskData.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      })
    );
  };

  const removeTask = (id) => {
    setTaskData((currentTaskData) =>
      currentTaskData.filter((task) => {
        return task.id !== id;
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {/* <NewTaskForm /> */}
          <TaskList
            tasks={taskData}
            onUpdateTask={completeTask}
            onDeleteTask={removeTask}
          ></TaskList>
        </div>
      </main>
    </div>
  );
};

export default App;
