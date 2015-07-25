import React from 'react';
import StateComponent from './StateComponent.js';
import AddTask from './components/AddTask.js';
import TasksList from './components/TasksList.js';
import TasksFooter from './components/TasksFooter.js';

class App extends StateComponent {

	getStatePaths() {
		return {
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

	record() {
		this.recorder.record(this.context.controller.get([]).export());
	}

	stop() {
		this.recorder.stop();
	}

	play() {
		this.recorder.seek(0, true);
	}

	loadFromServer() {
		this.signals.loadFromServer();
	}

	render() {
		return (
			<div className="container">
				<div className="buttonsTop">
					{this.renderRecordButton()}
					<button className="btn btn-default" onClick={this.loadFromServer.bind(this)}>Load from DB</button>
					<a href='http://rethinkdb.dev.azk.io' target='_tab'>http://rethinkdb.dev.azk.io</a>
				</div>
				<section id="taskapp">
					<header id="header">
						<h1>Tasks</h1>
						<AddTask/>
					</header>

					{Object.keys(this.state.tasks).length ? <TasksList/> : null}
					{Object.keys(this.state.tasks).length ? <TasksFooter/> : null}
				</section>
			</div>
		);
	}
}

module.exports = App;
