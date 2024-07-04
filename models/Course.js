const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String},
    descr: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: String },
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Course", CourseSchema);
