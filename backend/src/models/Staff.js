// src/models/Staff.js
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
  
    whatsappNumber: {
      type: String,
      required: true,
    },

    whatsappGreeting: {
      type: String,
      default: "Hi! I'd like to discuss a project with Logicsoft Technologies.",
    },

    avatarInitials: {
      type: String,
      required: true,
      maxlength: 2,
    },

    avatarColor: {
      type: String,
      default: "#1f6fb2",
    },
    isOnline: {
      type: Boolean,
      default: true,
    },

    workingHours: {
      start: { type: Number, default: 8  }, 
      end:   { type: Number, default: 18 }, 
    },
   
    showInWidget: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }

);

staffSchema.index({ showInWidget: 1, order: 1 });

export default mongoose.model("Staff", staffSchema);