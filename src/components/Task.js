import React from 'react';
import StateComponent from './../StateComponent.js';

class Task extends StateComponent {
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
