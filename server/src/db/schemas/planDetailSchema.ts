import { Schema } from "mongoose";
import { IPlanDetail } from "../../types/planDetailTypes"

const planDetailSchema: Schema<IPlanDetail> = new Schema({
    userId: {
        type: String,
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    cost: {
        type: String,
        required: false
    }
},{
        collection: 'plandetails',
        timestamps: true,
    })

export default planDetailSchema;