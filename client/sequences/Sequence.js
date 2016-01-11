Template.Sequence.helpers({
  updateSequenceId: function() {
    return this._id;
  }
});

Template.Sequence.events({
  'click .toggle-menu': function() {
    Meteor.call('toggleActiveItem', this._id, this.isActive);
  },
  'click .fa-trash' : function(){
    Meteor.call('deleteSequence', this._id);
  }
});