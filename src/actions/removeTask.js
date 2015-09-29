let removeTask = function(input, state) {
  state.unset(['tasks', input.ref]);
};

export default removeTask;
