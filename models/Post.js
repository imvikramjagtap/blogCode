const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
    },
    username:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
    },
    comments:{
        type:Array,
        timestamps:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
