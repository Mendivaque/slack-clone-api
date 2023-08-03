import mongoose from "mongoose";

interface OrganisationSchemaType {
  owner: mongoose.Schema.Types.ObjectId;
  name: string;
  hobbies: string[];
  coWorkers: string[];
  generateJoinLink: () => string;
  joinLink: string;
  url: string;
  // logo
}

const organisationSchema = new mongoose.Schema<OrganisationSchemaType>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter your organisation name"],
    },
    coWorkers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    joinLink: String,
    url: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Generate orgnaisation join link
organisationSchema.methods.generateJoinLink = function () {
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.STAGING_URL
      : process.env.PRODUCTION_URL;
  this.joinLink = `${url}/${this._id}`;
  this.url = `${url}/${this.name}`;
};

export default mongoose.model("Organisation", organisationSchema);