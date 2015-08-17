let setCounters = function(input, state) {
  let tasks = state.get('tasks');
  state.merge({
    remainingCount: Object.keys(tasks).length
  });

};

export default setCounters;
