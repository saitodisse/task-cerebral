import React from 'react';
import StateComponent from './StateComponent.js';
import AddTask from './components/AddTask.js';
import TasksList from './components/TasksList.js';
import TasksFooter from './components/TasksFooter.js';

class App extends StateComponent {
  getStatePaths() {
    return {
      visibleTasks: ['visibleTasks'],
      tasks: ['tasks']
    };
  }
  renderRecordButton() {
    if (this.recorder.isRecording()) {
      return (
        <button className="btn btn-stop" onClick={this.stop.bind(this)}>Stop</button>
      );
    } else if (this.recorder.isPlaying()) {
      return (
        <button className="btn btn-play" disabled>Play</button>
      );
    } else if (!this.recorder.isRecording() &&
               !this.recorder.isPlaying() &&
                this.recorder.getRecording()) {
      return (
        <button className="btn btn-play" onClick={this.play.bind(this)}>Play</button>
      );
    } else if (!this.recorder.isRecording() &&
               !this.recorder.isPlaying() &&
               !this.recorder.getRecording()) {
      return (
        <button className="btn btn-record" onClick={this.record.bind(this)}>Record</button>
      );
    }
  }
  record() {
    this.recorder.record(this.context.controller.get([]).export());
  }
  stop() {
    this.recorder.stop();
  }
  play() {
    this.recorder.seek(0, true);
  }
  render() {
    return (
      <div id="taskapp-wrapper">
        <div>
          {this.renderRecordButton()}
        </div>
        <section id="taskapp">
          <header id="header">
            <h1>Tasks</h1>
            <AddTask/>
          </header>

          {this.state.visibleTasks.length ? <TasksList/> : null}
          {Object.keys(this.state.tasks).length ? <TasksFooter/> : null}
        </section>
        <footer id="info">
          <p>Double-click to edit a task</p>
          <p>Credits:
            <a href="http://christianalfoni.com">Christian Alfoni</a>,
          </p>
          <p>Part of <a href="http://taskmvc.com">TaskMVC</a></p>
        </footer>
      </div>
    );
  }
}

module.exports = App;
