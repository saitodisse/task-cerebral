let saveTask = function (args, state, promise) {

  let task = state.get('tasks', args.ref);

  // Simulating posting the task.data and get an ID from
  // the server. We resolve with the new id
  setTimeout(function () {

    promise.resolve({
      id: Date.now() + parseInt(Math.random() * 1000)
    });

  }, 1000);

};

export default saveTask;
