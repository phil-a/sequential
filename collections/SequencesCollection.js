Sequences = new Meteor.Collection('sequences');

Sequences.allow({
  insert: function(userId, doc) {
    return !!userId;
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
  amount: {
    type: Number,
    label: "Amount",
    min: 0,
    max: 300
  },
  choose: {
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