import React from 'react';
import Task from './Task.js';
import StateComponent from './../StateComponent.js';

class TasksList extends StateComponent {
  getStatePaths() {
    return {
      tasks: ['visibleTasks'],
      isAllChecked: ['isAllChecked'],
      tod: ['tasks']
    };
  }
  renderTask(task, index) {
    return <Task key={index} index={index} task={task}/>
  }

  render() {
    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          checked={this.state.isAllChecked}
          onChange={this.signals.toggleAllChanged}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="task-list">
          {this.state.tasks.map(this.renderTask.bind(this))}
        </ul>
      </section>
    );
  }

}

export default TasksList;