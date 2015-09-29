import React from 'react';
// import ReactiveRouter from 'reactive-router';

import App from './App.js';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import CerebralRouter from 'cerebral-router';

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
controller.signal('routeChanged',
  removeAllTasks,
  [
    loadFromServer, {
      success: [setAllTasks]
    }
  ],
  setCounters,
  setVisibleTasks
);

controller.signal('newTaskTitleChanged', setNewTaskTitle);

controller.signal('newTaskSubmitted',
  addTask,
  setVisibleTasks,
  setCounters,
  [
    saveTask, {
      success: [updateTask]
    }
  ]
);

controller.signal('removeTaskClicked',
  removeTaskStarting,
  setVisibleTasks,
  [
    removeTaskFromServer, {
      success: [removeTask]
    }
  ],
  setCounters,
  setVisibleTasks
);

// ROUTER
CerebralRouter(controller, {
  '/': 'routeChanged'
}, {
  baseUrl: ''
}).trigger();

React.render(<Container controller={controller} app={App}/>, document.querySelector('#app'));

