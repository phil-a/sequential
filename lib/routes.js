if (Meteor.isClient) {
  Accounts.onLogin(function() {
    FlowRouter.go('sequence-log');
  });

  Accounts.onLogout(function() {
    FlowRouter.go('home');
  });
}

FlowRouter.triggers.enter([function(context, redirect){
if (!Meteor.userId()) {
  FlowRouter.go('home');
}
}]);

FlowRouter.route('/', {
  name: 'home',
  action(){
    if(Meteor.userId()){
      FlowRouter.go('sequence-log');
    }
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/sequence-log', {
  name: 'sequence-log',
  action(){
    BlazeLayout.render('MainLayout', {main: 'Sequences'});
  }
});

FlowRouter.route('/sequence/:id', {
  name: 'sequence',
  action(){
    BlazeLayout.render('MainLayout', {main: 'SequenceIndividual'});
  }
});