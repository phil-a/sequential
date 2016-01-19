Sequences = new Meteor.Collection('sequences');

Sequences.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});

SequenceSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  motiv: {
    type: String,
    label: "What is your motivation for doing this?"
  },
  amount: {
    type: Number,
    label: "Amount",
    min: 0,
    max: 300
  },
  freq: {
    type: String,
    label: "Choose a frequency",
    allowedValues: [
       "per day",
       "per week",
       "per month"
    ]
  },
  isActive:{
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  logs: {
    type: [Date],
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function() {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  }
});

Meteor.methods({
  toggleActiveItem: function(id, currentState) {
    Sequences.update(id, {
      $set: {
        isActive: !currentState
      }
    });
  },
  pushDateIntoLogs: function(id, logs) {
    //check for empty array
    if (logs == undefined){
      currentDate = new Date();
      logs = new Array;
      logs.push(currentDate);
      Sequences.update(id, {
        $set: {
          logs: logs
        }
      });
    }
    else{
      lastDate = logs[logs.length-1];
      currentDate = new Date();
      //do not push if log exists today
      if ( (lastDate.getFullYear() == currentDate.getFullYear()) &&  (lastDate.getMonth() == currentDate.getMonth()) && (lastDate.getDate() == currentDate.getDate()) )
      {
        console.log("Cannot log twice in one day")
      }
      //if log does not exist for today
      else{
        logs.push(currentDate);
        Sequences.update(id, {
          $set: {
            logs: logs
          }
        });
      }
    }
  },
  deleteSequence: function(id) {
    Sequences.remove(id);
  }
});

Sequences.attachSchema(SequenceSchema);