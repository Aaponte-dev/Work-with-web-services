import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate";

const countrySchema = new mongoose.Schema(
  {
    isoCode: {
      type: String,
      required: true,
      unique: true,
    },
    callPrefix: {
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
        },
        name: {
          type: String,
          required: true,
          index: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

countrySchema.plugin(mongoosePaginate);
countrySchema.plugin(mongooseDelete, { deletedAt: true });

const Country = mongoose.model("Country", countrySchema);

export default Country;
