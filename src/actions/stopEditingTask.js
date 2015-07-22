let stopEditingTask = function (args, state) {

  const path = ['tasks', args.ref];
  let task = state.get(path);

  if (!task.$newTitle) {
    return;
  }

  state.merge(path, {
    $isEditing: false,
    title: task.$newTitle
  });
  state.unset(path, '$newTitle');
};

export default stopEditingTask;
