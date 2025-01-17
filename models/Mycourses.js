const mongoose = require('mongoose');

const MycourseSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String },
    descr: { type: String, required: true },
    img: { type: String, required: true },
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Mycourse", MycourseSchema);
