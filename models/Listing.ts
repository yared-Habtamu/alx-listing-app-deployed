import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({ url: String, caption: String });

const ListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: {
    address: String,
    lat: Number,
    lng: Number,
  },
  images: [ImageSchema],
  amenities: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);
