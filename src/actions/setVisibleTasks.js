let setVisibleTasks = function(args, state) {

  let tasks = state.get('tasks');
  let filter = state.get('filter');
  let visibleTasks = Object.keys(tasks).filter(function(key) {

    let task = tasks[key];

    return (
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'active' && !task.completed)
    );

  });
  state.set('visibleTasks', visibleTasks);

};

export default setVisibleTasks;
