import React from 'react';
import classNames from 'classnames';
import StateComponent from './../StateComponent.js';

class Task extends StateComponent {

  edit() {

    if (this.props.task.$isSaving) {
      return;
    }

    this.signals.taskDoubleClicked({
      ref: this.props.task.$ref
    });

    // FOCUS fix
    setTimeout(() => {
      var input = this.refs.edit.getDOMNode();
      input.focus();
      input.value = input.value;
    }, 0);
  }

  onNewTitleChanged(event) {
    this.signals.newTitleChanged({
      ref: this.props.task.$ref,
      title: event.target.value
    });
  }

  onNewTitleSubmitted(event) {
    event.preventDefault();
    this.refs.edit.getDOMNode().blur();
  }

  render() {

    var className = classNames({
      completed: this.props.task.completed,
      editing: this.props.task.$isEditing
    });

    return (
      <li className={className}>
        <div className="view">
          {
            this.props.task.$isSaving ?
            null :
            <input
              className="toggle"
              type="checkbox"
              disabled={this.props.task.$isSaving}
              onChange={this.signals.toggleCompletedChanged.bind(null, {ref: this.props.task.$ref})}
              checked={this.props.task.completed}/>
          }
          <label onDoubleClick={this.edit.bind(this)}>
            {this.props.task.title} {this.props.task.$isSaving ?
              <small>(saving)</small> :
              null
            }
          </label>
          {
            this.props.task.$isSaving ?
            null :
            <button
              className="destroy"
              onClick={this.signals.removeTaskClicked.bind(null, {
                ref: this.props.task.$ref
              })}/>
          }
        </div>
        <form onSubmit={this.onNewTitleSubmitted.bind(this)}>
          <input
            ref="edit"
            className="edit"
            value={this.props.task.$newTitle || this.props.task.title}
            onBlur={this.signals.newTitleSubmitted.bind(null, {
              ref: this.props.task.$ref
            })}
            onChange={this.onNewTitleChanged.bind(this)}
          />
        </form>
      </li>
    );

  }

}

export default Task;
