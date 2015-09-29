import React from 'react';
import AddTask from './components/AddTask.js';
import TasksList from './components/TasksList.js';
import TasksFooter from './components/TasksFooter.js';
import {Decorator as Cerebral} from 'cerebral-react';

var utils_get_rethink_db_ngrok = require('./utils/rethink-db-ngrok.js');

@Cerebral({
  visibleTasks: ['visibleTasks'],
  tasks: ['tasks']
})
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="buttonsTop">
          <a href={utils_get_rethink_db_ngrok()} target='_tab'>rethink db</a>
        </div>
        <section id="taskapp">
          <header id="header">
            <h1>Tasks</h1>
            <AddTask/>
          </header>

          {Object.keys(this.props.tasks).length ? <TasksList/> : null}
          {Object.keys(this.props.tasks).length ? <TasksFooter/> : null}
        </section>
      </div>
    );
  }
}

module.exports = App;
