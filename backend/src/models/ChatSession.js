// src/models/ChatSession.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 4000,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSessionSchema = new mongoose.Schema(
  {

    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "transferred_whatsapp", "closed"],
      default: "active",
    },
    
    transferredTo: {
      type: String,
      default: null,
    },
  
    pageUrl: {
      type: String,
      default: null,
    },
    metadata: {
      userAgent: { type: String, default: null },
      ip:        { type: String, default: null },
    },
  },
  {
    timestamps: true, 
  }
);

chatSessionSchema.index({ createdAt: -1 });
chatSessionSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("ChatSession", chatSessionSchema);