window.App = Ember.Application.create();
App.Router.map(function() {
	this.resource('add', {
		path: 'new'
	});
	this.resource('index', {
		path: '/'
	}, function() {
		this.resource('info', {
			path: 'info/:index'
		})
	});
});
var data = [{
	title: 'test',
	content: 'content test',
	index: 0
}];
App.AddController = Ember.Controller.extend({
	actions: {
		new: function() {
			console.log('new')
			var title = $('#title').val();
			var content = $('#content').val();
			data.push({
				title: title,
				content: content,
				index: data.length
			});
			this.transitionToRoute('index');
		}
	}
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return data
	}
});

App.InfoRoute = Ember.Route.extend({
	model: function(param) {
		console.log(data[param.index].content)
		return data[param.index]
	}
});
App.InfoController = Ember.ObjectController.extend({
	actions: {
		isEditing: false,
		edit: function() {
			this.set('isEditing', true);
		},
		save: function() {
			this.set('isEditing', false);
		}
	}
});

App.IndexController = Ember.ArrayController.extend({
	actions: {
		del: function(index) {
			var d = this.get('model');
			console.log(d)
			var obj = d.findBy('index', index)
			d.removeObject(obj)
		}
	}
});