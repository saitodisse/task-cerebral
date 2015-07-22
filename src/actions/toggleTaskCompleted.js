let toggleTaskCompleted = function(args, state) {
  console.log(args);
  const path = ['tasks', args.ref];
  let task = state.get(path);
  state.set(path.concat('completed'), !task.completed);
};

export default toggleTaskCompleted;
