let updateTask = function(args, state) {

  var path = ['tasks', args.ref];

  let task = state.get(path);

  state.merge(path, {
    id: args.id,
    $isSaving: false
  });

};

export default updateTask;
