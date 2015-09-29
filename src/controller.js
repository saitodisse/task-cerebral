import Controller from 'cerebral';
import Model from 'cerebral-baobab'

const state = {
  nextRef: 0,
  url: '',
  tasks: {},
  visibleTasksIds: [],
  visibleTasks: Model.monkey({
    cursors: {
      tasks: ['tasks'],
      ids: ['visibleTasksIds']
    },
    get: function (data) {
      return data.ids.map(function (id) {
        return data.tasks[id];
      });
    }
  }),
  newTaskTitle: '',
  isSaving: false,
  isRemoving: false
};

const model = Model(state);
export default Controller(model);
