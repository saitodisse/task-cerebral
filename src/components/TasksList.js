import React from 'react';
import Task from './Task.js';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  tasks: ['tasks']
})
class TasksList extends React.Component {
  renderTask(task_id, index) {
    return <Task key={index} index={index} task={this.props.tasks[task_id]}/>;
  }

  render() {
    return (
      <section id="main">
        <ul className="list-group">
          {Object.keys(this.props.tasks)
            .reverse()
            .map(this.renderTask.bind(this))}
        </ul>
      </section>
    );
  }

}

export default TasksList;
