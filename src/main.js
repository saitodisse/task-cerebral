import React from 'react';
import ReactiveRouter from 'reactive-router';

import App from './App.js';
import controller from './controller.js';
// import Page from 'page';

// Actions
import addTask from './actions/addTask.js';
import removeTaskStarting from './actions/removeTaskStarting.js';
import removeTask from './actions/removeTask.js';
import removeTaskFromServer from './actions/removeTaskFromServer.js';
import setNewTaskTitle from './actions/setNewTaskTitle.js';
import setCounters from './actions/setCounters.js';
import saveTask from './actions/saveTask.js';
import updateTask from './actions/updateTask.js';
import removeAllTasks from './actions/removeAllTasks.js';
import loadFromServer from './actions/loadFromServer.js';
import setAllTasks from './actions/setAllTasks.js';
import setVisibleTasks from './actions/setVisibleTasks.js';

// Signals
controller.signal('routeChanged', [loadFromServer], removeAllTasks, setAllTasks, setCounters, setVisibleTasks);
controller.signal('newTaskTitleChanged', setNewTaskTitle);
controller.signal('newTaskSubmitted', addTask, setVisibleTasks, setCounters, [saveTask], updateTask);
controller.signal('removeTaskClicked', removeTaskStarting, setVisibleTasks, [removeTaskFromServer], removeTask, setCounters);
controller.signal('loadFromServer', [loadFromServer], removeAllTasks, setAllTasks, setCounters, setVisibleTasks);

// Render wrapper
const Wrapper = React.createClass({
  childContextTypes: {
    controller: React.PropTypes.object
  },
  getChildContext() {
    return {
      controller: controller
    };
  },
  render() {
    return <App/>;
  }
});
React.render(<Wrapper/>, document.querySelector('#app'));

// ROUTER
const router = ReactiveRouter({
  '/': controller.signals.routeChanged
});

controller.eventEmitter.on('change', function (state) {
  router.set(state.url);
});

controller.eventEmitter.on('remember', function (state) {
  router.setSilent(state.url);
});
