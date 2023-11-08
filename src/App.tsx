import React, {useState, ChangeEvent, useEffect} from 'react';
import './App.css'

import TodoTask from './Components/TodoTask'
import {TypeTask} from './Types'

const App = () => {

  const [task, SetTask] = useState<string>('');
  const [deadline, SetDeadline] = useState<number>(0);
  const [todoList, SetTodoList] = useState<TypeTask[]>([]);

  const HandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if(e.target.name === 'task') {
      SetTask(e.target.value);
    } else if(e.target.name === 'deadline') {
      SetDeadline(Number(e.target.value));
    }
  }

  const AddTask = (): void => {
    const newTask = {
      taskName: task,
      deadline: deadline
    }
    SetTodoList([...todoList, newTask]);
    SetTask('');
    SetDeadline(0);
  }

  const CompleteTask = (taskNameToDelete: string): void => {
    SetTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }));
  }

  const SortTaskByPriority = () => {
    const sortedTask = [...todoList];
    sortedTask.sort((a , b) => a.deadline - b.deadline);
    SetTodoList(sortedTask);
  }


  return (
    <div className="App">
      <div className='header'>
        <div className = 'inputContainer'>
          <input type = 'text' placeholder = 'task...' name = 'task' value = {task} onChange = {(e) => HandleChange(e)} />
          <input type = 'number' placeholder = 'deadline (in Days)...' name = 'deadline' value = {deadline} onChange = {(e) => HandleChange(e)} />
        </div>
        <button onClick={AddTask}>Add Task</button>
        <button onClick={SortTaskByPriority}>Sort Task</button>
      </div>
      <div className='todoList'>
        {
          todoList.map((task: TypeTask , key: number) => {
            return(
              <TodoTask key={key} task={task} CompleteTask={CompleteTask} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
