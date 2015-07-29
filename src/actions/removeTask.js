let removeTask = function(args, state) {
  var path = ['tasks', args.ref];
  let task = state.get(path);
  state.merge(path, {
    isRemoving: false
  });

  state.unset('tasks', args.ref);
};

export default removeTask;
