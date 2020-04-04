import React, { Component, useState } from 'react';
 
import { withTracker } from 'meteor/react-meteor-data';


import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
 
// App component - represents the whole app
const App = ({ tasks }) => {
  const [text, setText] = useState('')
  const handleSubmit = e => {
    e.preventDefault();
    Tasks.insert({
      text: text.trim(),
      createdAt: new Date(), // current time
    });
    setText('')
  }
  const renderTasks= ()  => tasks.map((task) => <Task key={task._id} task={task} />);
 
  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>
      <form className="new-task" onSubmit={handleSubmit} >
        <input
          type="text"
          value={text}
          placeholder="Type to add new tasks"
          onChange={e => setText(e.target.value)}
        />
      </form>
      <ul>
        {renderTasks()}
      </ul>
    </div>
  );
}

export default withTracker(() => ({
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  })
)(App);
