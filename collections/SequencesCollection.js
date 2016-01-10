Sequences = new Meteor.Collection('sequences');

Sequences.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

SubSequence = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  desc: {
    type: String,
    label: "Description"
  },
  amount: {
    type: Number,
    label: "Amount",
    min: 0,
    max: 300
  },
  freq: {
    type: Number,
    allowedValues: [
       1,
       2,
       3
    ],
    optional: true,
    label: "Select a Frequency",
    autoform: {
       options: [
          {
             label: "Per Day",
             value: 1
          },
          {
             label: "Per Week",
             value: 2
          },
          {
             label: "Per Month",
             value: 3
          }
       ]
    }
  },
  logs: {
    type: [Date]
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

SequenceSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  desc: {
    type: String,
    label: "Description"
  },
  subsequences: {
    type: [SubSequence]
   },
  isActive:{
    type: Boolean,
    defaultValue: false,
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

Sequences.attachSchema(SequenceSchema);