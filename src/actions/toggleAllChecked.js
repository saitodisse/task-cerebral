let toggleAllChecked = function(args, state) {

    let isCompleted = !state.get('isAllChecked');
    let tasks = state.get('tasks');

    Object.keys(tasks).forEach(function (key) {
      let task = tasks[key];
      state.set(['tasks', task.ref, 'completed'], isCompleted);
    });

    state.set('isAllChecked', isCompleted);
};

export default toggleAllChecked;
