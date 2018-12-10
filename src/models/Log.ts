import * as mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now() },
    app: {
      type: String,
      default: 'Outside'
    },
    type: {
      type: String,
      default: 'info'
    },
    message: {
      type: String
    },
    payload: {
      type: Object
    }
  },
  {
    toObject: {
      transform: (_doc, ret) => {
        delete ret.__v;
      }
    }
  }
);

export default mongoose.model("Log", LogSchema);
