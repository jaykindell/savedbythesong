angular.module('app')
.component('app', {
  templateUrl: '/templates/app.html',
  controller: function(itemsService) {
    itemsService.getAll((data) => {
      this.items = data;
    })
  },
  bindings: {},
});