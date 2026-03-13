const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    deadline: {
        type: Date
    },

    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Project", projectSchema);