// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'; // Import CSS file

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      inputValue: '',
      editId: null,
      alertMessage: ''
    };
  }

  addTask = () => {
    const { inputValue, editId, tasks } = this.state;
    
    // Check if input value is empty or already exists as a task
    if (inputValue.trim() === '') {
      this.setState({ alertMessage: 'Task cannot be empty.' });
      return;
    }
    
    const existingTask = tasks.find(task => task.text === inputValue.trim());
    if (existingTask) {
      this.setState({ alertMessage: 'Task already exists.' });
      return;
    }
  
    if (editId !== null) {
      const editedTasks = tasks.map(task =>
        task.id === editId ? { ...task, text: inputValue } : task
      );
      this.setState({
        tasks: editedTasks,
        editId: null,
        alertMessage: 'Task edited successfully.'
      });
    } else {
      // Add new task to the beginning of the tasks array
      const newTasks = [{ id: uuidv4(), text: inputValue.trim(), completed: false }, ...tasks];
      this.setState({
        tasks: newTasks,
        alertMessage: 'Task added successfully.'
      });
    }
    this.setState({ inputValue: '' });
    setTimeout(() => this.setState({ alertMessage: '' }), 3000); // Clear alert message after 3 seconds
  };
  
  removeTask = (taskId) => {
    const filteredTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: filteredTasks, alertMessage: 'Task removed successfully.' });
    setTimeout(() => this.setState({ alertMessage: '' }), 3000); // Clear alert message after 3 seconds
  };

  editTask = (taskId) => {
    const taskToEdit = this.state.tasks.find((task) => task.id === taskId);
    this.setState({ inputValue: taskToEdit.text, editId: taskId });
  };

  toggleComplete = (taskId) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const { tasks, inputValue, editId, alertMessage } = this.state;
    return (
      <div className="container">
        <h1 className="title">My To-Do List</h1>
        {alertMessage && <div className="alert">{alertMessage}</div>}
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.addTask();
              }
            }}
            placeholder="Enter task"
            className="input-field"
          />
          <button onClick={this.addTask} className="add-button">
            {editId !== null ? 'Edit Task' : 'Add Task'}
          </button>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <span
                className={task.completed ? 'task-text completed' : 'task-text'}
                onClick={() => this.toggleComplete(task.id)}
              >
                {task.text}
              </span>
              <div className="task-buttons">
                <button onClick={() => this.removeTask(task.id)} className="remove-button">
                  Remove
                </button>
                <button onClick={() => this.editTask(task.id)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => this.toggleComplete(task.id)} className="complete-button">
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
