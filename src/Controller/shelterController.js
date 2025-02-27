const Shelter = require("../Models/shelterModel");
 // Import the Shelter model

// ✅ Add a shelter
exports.addShelter = async (req, res) => {
    try {
        const shelter = new Shelter(req.body);
        await shelter.save();
        res.status(201).json({ message: "Shelter added successfully", shelter });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Get all shelters
exports.getAllShelters = async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.json({ shelters });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Get shelters by disaster location (Updated function)
exports.getNearbyShelters = async (req, res) => {
    try {
        const { location } = req.params;

        // Fetch shelters from MongoDB where location matches (case-insensitive)
        const shelters = await Shelter.find({ location: { $regex: location, $options: "i" } });

        if (shelters.length === 0) {
            return res.json({ message: `No shelters found near ${location}`, shelters: [] });
        }

        res.json({ message: `Shelters near ${location}`, shelters });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Delete a shelter
exports.deleteShelter = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedShelter = await Shelter.findByIdAndDelete(id);
        if (!deletedShelter) return res.status(404).json({ message: "Shelter not found" });

        res.json({ message: "Shelter deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Update shelter details
exports.updateShelter = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShelter = await Shelter.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedShelter) return res.status(404).json({ message: "Shelter not found" });

        res.json({ message: "Shelter updated successfully", updatedShelter });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Find shelters based on available capacity
exports.getSheltersWithSpace = async (req, res) => {
    try {
        const { capacity } = req.query;
        const shelters = await Shelter.find({ capacity: { $gte: capacity } });

        res.json({ message: `Shelters with capacity >= ${capacity}`, shelters });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Add multiple shelters
exports.addMultipleShelters = async (req, res) => {
    try {
        const shelters = req.body;
        if (!Array.isArray(shelters) || shelters.length === 0) {
            return res.status(400).json({ message: "Invalid shelter list" });
        }

        const addedShelters = await Shelter.insertMany(shelters);
        res.status(201).json({ message: "Shelters added successfully", shelters: addedShelters });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
