const Alert = require("../Models/alertModel");

// Create a single alert
exports.createAlert = async (req, res) => {
  try {
    const { title, description, location, severity } = req.body;
    const newAlert = new Alert({ title, description, location, severity });
    await newAlert.save();
    res.status(201).json({ message: "Alert created successfully!", alert: newAlert });
  } catch (error) {
    res.status(500).json({ error: "Failed to create alert", details: error.message });
  }
};

// Create multiple alerts at once
exports.createAlerts = async (req, res) => {
  try {
    const alerts = req.body; // Expecting an array of alerts
    if (!Array.isArray(alerts)) {
      return res.status(400).json({ error: "Request body must be an array of alerts" });
    }
    const savedAlerts = await Alert.insertMany(alerts);
    res.status(201).json({ message: "Alerts added successfully!", data: savedAlerts });
  } catch (error) {
    res.status(500).json({ error: "Failed to add alerts", details: error.message });
  }
};

// Get all alerts
exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts", details: error.message });
  }
};

// Delete an alert by ID
exports.deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    await Alert.findByIdAndDelete(id);
    res.status(200).json({ message: "Alert deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete alert", details: error.message });
  }
};

// Get an alert by title
exports.getAlertByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const alert = await Alert.findOne({ title: { $regex: new RegExp(title, "i") } });

    if (!alert) {
      return res.status(404).json({ message: "No alert found with this title" });
    }

    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alert", details: error.message });
  }
};