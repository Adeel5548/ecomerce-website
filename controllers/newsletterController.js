import Newsletter from "../models/newsletterModel.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("📨 Newsletter subscribe hit. Email:", email);

    if (!email || !email.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const normalized = email.trim().toLowerCase();

    // check existing
    const existing = await Newsletter.findOne({ email: normalized });
    if (existing) {
      return res
        .status(200)
        .json({ success: true, message: "Already subscribed" });
    }

    await Newsletter.create({ email: normalized });

    return res
      .status(201)
      .json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    console.error("❌ Newsletter subscribe error:", err);

    // handle duplicate key (if race condition)
    if (err.code === 11000) {
      return res
        .status(200)
        .json({ success: true, message: "Already subscribed" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
