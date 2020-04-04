import React from 'react';
import PropTypes from 'prop-types';

import { Tasks } from '../api/tasks.js';

const Task = ({ task }) => {
  const toggleChecked = () => {
    Tasks.update(task._id, {
      $set: { checked: !task.checked },
    });
  };

  const deleteThisTask = () => {
    Tasks.remove(task._id);
  };

  const taskClassName = task.checked ? 'checked' : '';

  return (
    <li className={taskClassName}>
      <button type="button" className="delete" onClick={deleteThisTask}>
        &times;
      </button>
      <input
        type="checkbox"
        readOnly
        checked={task.checked}
        onClick={toggleChecked}
      />
      <span className="text">{task.text}</span>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    checked: PropTypes.bool,
    text: PropTypes.string,
  }).isRequired,
};

export default Task;
