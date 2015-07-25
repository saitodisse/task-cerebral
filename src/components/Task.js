import React from 'react';
import StateComponent from './../StateComponent.js';

class Task extends StateComponent {
  render() {
    return (
      <li className='list-group-item'>
        <button
          className="btn btn-danger"
          disabled={this.props.task.$isSaving}
          onClick={this.signals.removeTaskClicked.bind(null, {
            ref: this.props.task.$ref
          })}>del</button>
        {this.props.task.title} {this.props.task.$isSaving ?
          <small> (saving)</small> :
          null
        }
      </li>
    );
  }
}

export default Task;
