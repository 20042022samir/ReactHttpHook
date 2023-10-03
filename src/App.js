import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './Hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);


  const transformTask = useCallback((tasks) => {
    const loadedTasks = [];

    for (const taskKey in tasks) {
      loadedTasks.push({ id: taskKey, text: tasks[taskKey].text });
    }
    setTasks(loadedTasks)
  }, [])


  const { isLoading, error, sendRequest: fetchTasks } = useHttp(transformTask)


  useEffect(() => {
    fetchTasks({
      url: 'https://react-http-7e672-default-rtdb.firebaseio.com/tasks.json',
    });
  }, []);


  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };


  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
