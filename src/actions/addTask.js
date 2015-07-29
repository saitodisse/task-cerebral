let addTask = function(args, state) {

  var ref = state.get('nextRef');
  let task = {
    $ref: ref,
    isSaving: true,
    title: state.get('newTaskTitle')
  };

  state.set(['tasks', ref], task);
  state.set('newTaskTitle', '');
  state.set('nextRef', ref + 1);

  return {
    ref: ref
  };
};

export default addTask;
