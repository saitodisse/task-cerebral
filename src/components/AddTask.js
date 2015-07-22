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
      <form id="task-form" onSubmit={this.addTask.bind(this)}>
        <input
          id="new-task"
          autoComplete="off"
          placeholder="What needs to be done?"
          disabled={this.state.isSaving}
          value={this.state.newTaskTitle}
          onChange={this.setNewTaskTitle.bind(this)}
        />
      </form>
    );
  }

}

export default AddTask;
