Template.Sequence.onCreated(function() {
  this.editMode = new ReactiveVar(false)
});

Template.Sequence.helpers({
  updateSequenceId: function() {
    return this._id;
  },
  editMode: function() {
    return Template.instance().editMode.get();
  }
});

Template.Sequence.events({
  'click .toggle-menu': function() {
    Meteor.call('toggleActiveItem', this._id, this.isActive);
  },
  'click .fa-trash' : function(){
    Meteor.call('deleteSequence', this._id);
  },
  'click .fa-pencil' : function (event, template){
    template.editMode.set(!template.editMode.get());
  }
});