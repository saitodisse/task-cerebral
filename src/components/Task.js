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
    return (
      <li className='list-group-item'>
        {
          this.props.task.$isSaving ?
          null :
          <button
            className="btn btn-default"
            onClick={this.signals.removeTaskClicked.bind(null, {
              ref: this.props.task.$ref
            })}>X</button>
        }
        {this.props.task.title} {this.props.task.$isSaving ?
          <small>(saving)</small> :
          null
        }
      </li>
    );

  }

}

export default Task;
