const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String, unique: true },
});

BatchSchema.pre("save", async function (next) {
  const slug = this.name
    .replace(/\s+/g, "-")
    .replace(":", "-")
    .replace("&", "-")
    .replace(/[<>,?\/|\\{}[\](),||]/g, "-")
    .toLowerCase();
  let baseSlug = `${slug}`;

  while (true) {
    const randomNo = Math.floor(Math.random() * 10000);
    const existing = await this.constructor.findOne({ slug: `${baseSlug}-${randomNo}` }).exec();

    if (!existing) {
      this.slug = `${baseSlug}-${randomNo}`;
      break;
    }
  }
  next();
});

module.exports = mongoose.model("Batch", BatchSchema);
