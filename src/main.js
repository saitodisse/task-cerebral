import React from 'react';
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

// Signals
// controller.signal('routeChanged', function() {});
controller.signal('newTaskTitleChanged', setNewTaskTitle);
controller.signal('newTaskSubmitted', addTask, setCounters, [saveTask], updateTask);
controller.signal('removeTaskClicked', removeTaskStarting, [removeTaskFromServer], removeTask, setCounters);
controller.signal('loadFromServer', removeAllTasks, [loadFromServer], setAllTasks, setCounters);

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
