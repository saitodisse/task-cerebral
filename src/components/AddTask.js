import React from 'react';
import StateComponent from './../StateComponent.js';

class AddTask extends StateComponent {
  getStatePaths() {
    return {
      isSaving: ['isSaving'],
      newTaskTitle: ['newTaskTitle']
    };
  }
  addTask(event) {
    event.preventDefault();
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
                id="new-task"
                autoComplete="off"
                placeholder="new task"
                disabled={this.state.isSaving}
                value={this.state.newTaskTitle}
                onChange={this.setNewTaskTitle.bind(this)}
              />
            </div>
          </div>
      </form>
    );
  }

}

export default AddTask;
