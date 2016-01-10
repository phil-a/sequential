FlowRouter.route('/', {
  name: 'home',
  action(){
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/sequence-log', {
  name: 'sequence-log',
  action(){
    BlazeLayout.render('MainLayout', {main: 'Sequences'});
  }
});