import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Deleted'],
        default: 'Active'
    },
    leads: [{
        type: String,
        validate: {
            validator: function (v: string) {
                return /^https:\/\/(www\.)?linkedin\.com\/.+/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid linkedin url`
        },
    }],
    accountIds: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
})


const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;