Template.Sequences.onCreated(function() {
var self = this;
  self.autorun(function(){
    self.subscribe('sequences');
  });
});

Template.Sequences.helpers({
  sequences: ()=> {
    return Sequences.find({});
  }
});