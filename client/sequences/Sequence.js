Template.Sequence.helpers({
  updateSequenceId: function() {
    return this._id;
  }
});

Template.Sequence.events({
  'click .toggle-menu': function() {
    Meteor.call('toggleActiveItem', this._id, this.isActive);
  }
});