import React from 'react/addons';
import StateComponent from './../StateComponent.js';

class TasksFooter extends StateComponent {
  getStatePaths() {
    return {
      remainingCount: ['remainingCount']
    };
  }
  renderRemainingCount() {
    let count = this.state.remainingCount;
    if (count === 0 || count > 1) {
      return count + ' items';
    } else {
      return count + ' item';
    }
  }

  render() {
    return (
      <footer id="footer">
        <span id="task-count"><strong>{this.renderRemainingCount()}</strong></span>
      </footer>
    );
  }

}

export default TasksFooter;
