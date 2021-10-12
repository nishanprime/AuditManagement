import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const clientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dp: {
      type: String,
      required: true,
      default:
        "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    },
    clientId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

clientSchema.methods.matchPassword = async function (enteredPassword) {
  const client = await Client.findOne({ email: this.email }, "password").exec();
  return await bcrypt.compare(enteredPassword, client.password);
};

clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
