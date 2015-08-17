let setAllTasks = function(input, state) {

  var tasks = input.tasks;
  var keys = Object.keys(tasks);
  var all_tasks = keys.map((key) => {
    var ref = state.get('nextRef');
    let task = {
      $ref: ref,
      isSaving: false,
      title: tasks[key].title,
      id: tasks[key].id
    };
    state.set('nextRef', ref + 1);
    state.set(['tasks', task.$ref], task);
    return task;
  });

};

export default setAllTasks;
