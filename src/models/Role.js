import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.plugin(mongooseDelete, {deletedAt: true});
const Role = mongoose.model("Role", roleSchema);

export default Role;
