Template.ActiveList.onCreated(function() {
var self = this;
  self.autorun(function(){
    self.subscribe('sequences')
  });
});

Template.ActiveList.helpers({
  sequences: ()=> {
    return Sequences.find({isActive: true});
  }
});

Template.ActiveList.events({
  'click .toggle-logged': function() {
    Meteor.call('pushDateIntoLogs', this._id, this.logs);
  },
  'click .toggle-heatmap': function() {
    Meteor.call('initializeCalendar');
  },
});