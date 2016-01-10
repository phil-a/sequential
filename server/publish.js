if (Meteor.isServer) {

  Meteor.publish('sequences', function(){
    return Sequences.find({author: this.userId});
  });

  Meteor.publish('sequenceIndividual', function(id){
    check(id, String);
    return Sequences.find({_id: id});
  });

}