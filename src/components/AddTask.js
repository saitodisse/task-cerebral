import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  isSaving: ['isSaving'],
  newTaskTitle: ['newTaskTitle']
})
class AddTask extends React.Component {
  addTask(event) {
    event.preventDefault();
    if(this.props.newTaskTitle.length === 0) {
      return;
    }

    this.props.signals.newTaskSubmitted();
  }

  setNewTaskTitle(event) {
    this.props.signals.newTaskTitleChanged({
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
