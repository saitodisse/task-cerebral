let clearCompleted = function (args, state) {

  let tasks = state.get('tasks');

  Object.keys(tasks).forEach(function (key) {
    if (tasks[key].completed && !tasks[key].$isSaving) {
      state.unset('tasks', key);
    }
  });

};

export default clearCompleted;
