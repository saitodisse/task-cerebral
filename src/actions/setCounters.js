let setCounters = function(args, state) {
  let tasks = state.get('tasks');
  state.merge({
    remainingCount: Object.keys(tasks).length
  });

};

export default setCounters;
