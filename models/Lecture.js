const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
    faculty: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    descr: { type: String, required: true },
    img: { type: String, required: true },
    video: { type: String, required: true }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Lecture", LectureSchema);
