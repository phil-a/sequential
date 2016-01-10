Meteor.subscribe('sequences');

Template.Sequences.helpers({
  sequences: ()=> {
    return Sequences.find({});
  }
});