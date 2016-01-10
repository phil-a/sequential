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
  motiv: {
    type: String,
    label: "Motivation"
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
  motiv: {
    type: String,
    label: "What is your motivation for doing this?"
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