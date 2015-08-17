let removeTaskStarting = function(input, state) {
  var path = ['tasks', input.ref];
  let task = state.get(path);
  state.merge(path, {
    isRemoving: true
  });
};

export default removeTaskStarting;
