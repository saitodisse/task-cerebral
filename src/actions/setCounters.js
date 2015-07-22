let setCounters = function(args, state) {

  let tasks = state.get('tasks');
  let counts = Object.keys(tasks).reduce(function(counts, key) {

    let task = tasks[key];

    if (task.completed) {
      counts.completedCount++;
    } else if (!task.completed) {
      counts.remainingCount++;
    }

    return counts;

  }, {
    completedCount: 0,
    remainingCount: 0
  });

  state.merge({
    remainingCount: counts.remainingCount,
    completedCount: counts.completedCount
  });

};

export default setCounters;
