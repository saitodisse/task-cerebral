import React from 'react';
import Task from './Task.js';
import StateComponent from './../StateComponent.js';
import {Decorator as Cerebral} from '../CustomController.js';

@Cerebral({
  visibleTasks: ['visibleTasks']
})
class TasksList extends StateComponent {
  renderTask(task_id, index) {
    return <Task key={index} index={index} task={this.props.visibleTasks[task_id]}/>;
  }

  render() {
    return (
      <section id="main">
        <ul className="list-group">
          {Object.keys(this.props.visibleTasks)
            .reverse()
            .map(this.renderTask.bind(this))}
        </ul>
      </section>
    );
  }

}

export default TasksList;
