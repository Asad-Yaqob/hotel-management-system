import {Schema, model} from "mongoose"

const staffSchema = new Schema({
    staffName: { type: String, required: true, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, trim: true },
    phoneNo: { type:String, required: true,  },
    cnic: { type:String, required: true,},
    streetaddress: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    avatar: { type: String, required: true }
})