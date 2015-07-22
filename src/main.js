import React from 'react';
import App from './App.js';
import controller from './controller.js';
// import Page from 'page';

// Actions
import addTask from './actions/addTask.js';
import removeTask from './actions/removeTask.js';
import setNewTaskTitle from './actions/setNewTaskTitle.js';
import setCounters from './actions/setCounters.js';
import saveTask from './actions/saveTask.js';
import updateTask from './actions/updateTask.js';

// Signals
// controller.signal('routeChanged', function() {});
controller.signal('newTaskTitleChanged', setNewTaskTitle);
controller.signal('newTaskSubmitted', addTask, setCounters, [saveTask], updateTask);
controller.signal('removeTaskClicked', removeTask, setCounters);

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

// Router
// Page.base(location.pathname.substr(0, location.pathname.length - 1));
// Page('/', null);
// Page('/active', controller.signals.routeChanged);
// Page('/completed', controller.signals.routeChanged);
// Page.start();
