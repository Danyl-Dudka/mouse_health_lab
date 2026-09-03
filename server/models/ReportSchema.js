import mongoose from "mongoose";

const mouseReportSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  doubleClicks: { type: Number, default: 0 },
  clickCount: { type: Number, default: 0 },
  scrollPixels: { type: Number, default: 0 },
  scrollGlitches: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

export const Report = mongoose.model("Report", mouseReportSchema);
