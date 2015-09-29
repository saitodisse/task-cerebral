import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({})
class Task extends React.Component {
  render() {
    return (
      <li className='list-group-item'>
        <button
          className="btn btn-danger"
          disabled={this.props.task && (this.props.task.isSaving || this.props.task.isRemoving)}
          onClick={() => this.props.signals.removeTaskClicked({ ref: this.props.task.$ref })}>del</button>
        {this.props.task.title} {this.props.task.isSaving ?
          <small> (saving)</small> :
          null
        }
        {this.props.task.isRemoving ?
          <small> (removing)</small> :
          null
        }
      </li>
    );
  }
}

export default Task;
