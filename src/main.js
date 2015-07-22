import React from 'react';
import App from './App.js';
import controller from './controller.js';
import Page from 'page';

// Actions
import addTask from './actions/addTask.js';
import removeTask from './actions/removeTask.js';
import toggleTaskCompleted from './actions/toggleTaskCompleted.js';
import setVisibleTasks from './actions/setVisibleTasks.js';
import setNewTaskTitle from './actions/setNewTaskTitle.js';
import setAllChecked from './actions/setAllChecked.js';
import setCounters from './actions/setCounters.js';
import toggleAllChecked from './actions/toggleAllChecked.js';
import saveTask from './actions/saveTask.js';
import updateTask from './actions/updateTask.js';
import setFilter from './actions/setFilter.js';
import clearCompleted from './actions/clearCompleted.js';
import editTask from './actions/editTask.js';
import setTaskNewTitle from './actions/setTaskNewTitle.js';
import stopEditingTask from './actions/stopEditingTask.js';

// Signals
controller.signal('newTaskTitleChanged', setNewTaskTitle);
controller.signal('newTaskSubmitted', addTask, setVisibleTasks, setAllChecked, setCounters, [saveTask], updateTask);
controller.signal('removeTaskClicked', removeTask, setVisibleTasks, setAllChecked, setCounters);
controller.signal('toggleCompletedChanged', toggleTaskCompleted, setVisibleTasks, setAllChecked, setCounters);
controller.signal('toggleAllChanged', toggleAllChecked, setVisibleTasks, setCounters);
controller.signal('routeChanged', setFilter, setVisibleTasks);
controller.signal('clearCompletedClicked', clearCompleted, setVisibleTasks, setAllChecked, setCounters);
controller.signal('taskDoubleClicked', editTask);
controller.signal('newTitleChanged', setTaskNewTitle);
controller.signal('newTitleSubmitted', stopEditingTask);

// Render wrapper
const Wrapper = React.createClass({
  childContextTypes: {
    controller: React.PropTypes.object
  },
  getChildContext() {
    return {
      controller: controller
    }
  },
  render() {
    return <App/>;
  }
});
React.render(<Wrapper/>, document.querySelector('#app'));

// Router
Page.base(location.pathname.substr(0, location.pathname.length - 1));

Page('/', controller.signals.routeChanged);
Page('/active', controller.signals.routeChanged);
Page('/completed', controller.signals.routeChanged);

Page.start();
