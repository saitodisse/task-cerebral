import React from 'react';
import Task from './Task.js';
import StateComponent from './../StateComponent.js';

class TasksList extends StateComponent {
  getStatePaths() {
    return {
      tasks: ['visibleTasks']
    };
  }
  renderTask(task_id, index) {
    return <Task key={index} index={index} task={this.state.tasks[task_id]}/>;
  }

  render() {
    return (
      <section id="main">
        <ul className="list-group">
          {Object.keys(this.state.tasks)
            .reverse()
            .map(this.renderTask.bind(this))}
        </ul>
      </section>
    );
  }

}

export default TasksList;
