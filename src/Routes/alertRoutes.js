const express = require("express"); 
const router = express.Router();
const alertController = require("../Controller/alertController");

// Create a single alert
router.post("/addAlert", alertController.createAlert);

// Create multiple alerts at once
router.post("/addAlerts", alertController.createAlerts);

// Get all alerts
router.get("/allAlerts", alertController.getAllAlerts);

// Delete an alert by ID
router.delete("/deleteAlert/:id", alertController.deleteAlert);

// View Alert by Title
router.get("/alertByTitle/:title", alertController.getAlertByTitle);


module.exports = router;
