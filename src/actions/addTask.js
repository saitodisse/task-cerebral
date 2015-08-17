let addTask = function(input, state, output) {

  var ref = state.get('nextRef');
  let task = {
    $ref: ref,
    isSaving: true,
    title: state.get('newTaskTitle')
  };

  state.set(['tasks', ref], task);
  state.set('newTaskTitle', '');
  state.set('nextRef', ref + 1);

  output({
    ref: ref
  });
};

export default addTask;
