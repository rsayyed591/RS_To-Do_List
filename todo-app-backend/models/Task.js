const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type : String,
            required : [true , "Please add a Title for the Task"],
            trim : true,
        },
        description: {
            type : String,
            trim : true,
        },
        completed: {
            type : Boolean,
            default : false,
        },
    },
{
    timestamps : true,
}
);

module.exports = mongoose.model('Task', TaskSchema);
