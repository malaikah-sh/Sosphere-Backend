const express = require("express");
const router = express.Router();
const shelterController = require("../Controller/shelterController");

router.post("/addShelter", shelterController.addShelter);
router.get("/allShelters", shelterController.getAllShelters);
router.get("/nearbyShelters/:location", shelterController.getNearbyShelters);
router.delete("/deleteShelter/:id", shelterController.deleteShelter);
router.put("/updateShelter/:id", shelterController.updateShelter);
router.get("/findWithCapacity", shelterController.getSheltersWithSpace);
router.post("/addMultipleShelters", shelterController.addMultipleShelters);

module.exports = router;
