import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate";

const stateSchema = new mongoose.Schema(
  {
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    isoCode: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    lang: [
      {
        isoCode: {
          type: String,
          required: true,
          index: true
        },
        name: {
          type: String,
          required: true,
          index: true
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

stateSchema.plugin(mongoosePaginate);
stateSchema.plugin(mongooseDelete, { deletedAt: true });

const State = mongoose.model("State", stateSchema);

export default State;
