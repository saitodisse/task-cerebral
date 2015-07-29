let removeTaskStarting = function(args, state) {
  var path = ['tasks', args.ref];
  let task = state.get(path);
  state.merge(path, {
    isRemoving: true
  });
};

export default removeTaskStarting;
