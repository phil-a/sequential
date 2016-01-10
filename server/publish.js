if (Meteor.isServer) {

  Meteor.publish('sequences', function(){
    return Sequences.find({author: this.userId});
  });

}