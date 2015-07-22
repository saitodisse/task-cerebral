let setAllChecked = function(args, state) {

  let visibleTasks = state.get('visibleTasks');

  state.set('isAllChecked', visibleTasks.filter(function(task) {
    return !task.completed;
  }).length === 0 && visibleTasks.length !== 0);

};

export default setAllChecked;
