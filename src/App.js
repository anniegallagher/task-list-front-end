import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const App = () => {
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
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={taskData} onUpdateTask={completeTask}></TaskList>
        </div>
      </main>
    </div>
  );
};

export default App;
