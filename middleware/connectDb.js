import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    try {
        await mongoose.connect("mongodb+srv://krishnajaswl:hello@cluster0.stbgcos.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return res.status(500).json({ message: "Database connection failed" });
    }

    return handler(req, res);
};

export default connectDb;
