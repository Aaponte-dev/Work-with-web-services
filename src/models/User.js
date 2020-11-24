import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseDelete from "mongoose-delete";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
        firstName: String,
        lastName: String,
        active: {
            type: Boolean,
            default: true,
        },
        registerToken: String,
        resetPasswordToken: {
            type: String,
            default: null,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(require('mongoose-bcrypt'));
userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseDelete, { deletedAt: true });

const User = mongoose.model("User", userSchema);

export default User;