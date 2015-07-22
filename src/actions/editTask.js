let editTask = function (args, state) {

  const path = ['tasks', args.ref];
  let task = state.get(path);

  state.merge(path, {
    $isEditing: !task.$isSaving && true
  });

};

export default editTask;
