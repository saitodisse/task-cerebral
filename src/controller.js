import Controller from './CustomController.js';

const state = {
  nextRef: 0,
  tasks: {},
  visibleTasks: function() {
    return {
      value: [],
      deps: {
        tasks: ['tasks']
      },
      get: function(refs, deps) {
        return refs.map(function(ref) {
          return deps.tasks[ref];
        });
      }
    };
  },
  newTaskTitle: '',
  isSaving: false,
  isRemoving: false
};

export default Controller(state);
