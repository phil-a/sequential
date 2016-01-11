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