import React from 'react';
import StateComponent from './../StateComponent.js';
import {Decorator as Cerebral} from '../CustomController.js';

@Cerebral({
  isSaving: ['isSaving'],
  newTaskTitle: ['newTaskTitle']
})
class AddTask extends StateComponent {
  addTask(event) {
    event.preventDefault();
    if(this.props.newTaskTitle.length === 0) {
      return;
    }

    this.signals.newTaskSubmitted();
  }

  setNewTaskTitle(event) {
    this.signals.newTaskTitleChanged({
      title: event.target.value
    });
  }

  render() {
    return (
      <form
        className="form-horizontal"
        id="task-form"
        onSubmit={this.addTask.bind(this)}>
         <div className="form-group">
            <div className="col-sm-10">
              <input
                className="form-control"
                id="new-task"
                autoComplete="off"
                placeholder="new task"
                disabled={this.props.isSaving}
                value={this.props.newTaskTitle}
                onChange={this.setNewTaskTitle.bind(this)}
              />
            </div>
          </div>
      </form>
    );
  }

}

export default AddTask;
