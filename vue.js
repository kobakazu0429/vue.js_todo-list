var Form = {
  template: '<form v-on:submit.prevent="form_submit"><div class="input-group"><input v-model="task.name" class="form-control" type="text" placeholder="Buy milk 2L"><span class="input-group-btn"><button class="btn btn-primary">Add new task</button></span></div></form>',
  props: [
    'task',
    'on-submit',
  ],
  methods: {
    form_submit: function(event) {
      if (!this.task.name) {
        return;
      }

      this.onSubmit(event, this.task);
    },
  },
}

var ListItem = {
  template: '<label class="list-group-item"><span v-on:click.prevent="edit_click" class="pull-right btn btn-link">Edit</span><input v-model="task.finished" type="checkbox">{{task.name}}</label>',
  props: [
    'task'
  ],
  methods: {
    edit_click: function(event) {
      // update if not canceled
      var newName = window.prompt('Task Name', this.task.name);
      if (typeof newName === 'string') {
        this.task.name = newName;
      }
    },
  }
}

var app = new Vue({
  el: '#app',
  components: {
    'task-form': Form,
    'task-item': ListItem
  },
  data: {
    tasks: [{
      name: 'Buy milk 2L'
    }, {
      name: 'Call to Alice'
    }, {
      name: 'Return books'
    }, {
      name: 'Do Homework'
    }, ],
    newTask: {
      name: ''
    },
  },
  computed: {},
  methods: {
    newTask_submit: function(event) {
      console.log(this.newTask.name); // TODO: implement
      this.tasks.unshift(this.newTask)
      this.newTask = {
        name: ''
      };
    },
    delete_click: function(event) {
      this.tasks = this.tasks.filter(v => !v.finished);
    },
  },
})
