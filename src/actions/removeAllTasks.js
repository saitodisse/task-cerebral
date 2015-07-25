let removeAllTasks = function(args, state) {
	state.set('tasks', {});
  state.set('nextRef', 0);
};

export default removeAllTasks;
