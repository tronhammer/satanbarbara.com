define(function(){
	console.log("√ tile view");
	return Ember.View.extend({
		"classNames": ["hide", "tile"],
		"didInsertElement": function(){
			this.$().removeClass("ember-view hide");
			return this._super();
		},
	});
});