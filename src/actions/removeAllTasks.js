let removeAllTasks = function(input, state) {
	state.set('tasks', {});
  state.set('nextRef', 0);
};

export default removeAllTasks;
