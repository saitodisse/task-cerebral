let updateTask = function(input, state) {

  var path = ['tasks', input.ref];

  state.merge(path, {
    id: input.id,
    isSaving: false
  });

};

export default updateTask;
