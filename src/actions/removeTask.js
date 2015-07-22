let removeTask = function(args, state) {
  state.unset('tasks', args.ref);
};

export default removeTask;
