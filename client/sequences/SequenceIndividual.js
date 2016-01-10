Template.SequenceIndividual.onCreated(function() {
var self = this;
  self.autorun(function(){
    var id = FlowRouter.getParam('id');
    self.subscribe('sequenceIndividual', id);
  });
});

Template.SequenceIndividual.helpers({
  sequence: ()=> {
    var id = FlowRouter.getParam('id');
    return Sequences.findOne({_id: id});
  }
});