const Resource = require('../models/resource-model.js')

createResource = async (req, res) => {
    try {
        const { name, count } = req.body;
        const newResource = new Resource({ name, count });
        await newResource.save();
        res.status(201).json(newResource);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

getResourceById = async (req, res) => {
    console.log(`getResourceById`);
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json(resource);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

deleteResourceById = async (req, res) => {
    try {
        const result = await Resource.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json({ message: "Resource deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

getResourcePairs = async (req, res) => {
    console.log(`getResourcePairs`)
    try {
        const resources = await Resource.find({});
        const pairs = resources.map(resource => {
            return { id: resource._id, name: resource.name };
        });
        res.json(pairs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

updateResourceById = async (req, res) => {
    try {
        const { name, count, special_note } = req.body;
        const resource = await Resource.findByIdAndUpdate(req.params.id, { name, count, special_note }, { new: true });
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json(resource);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

getAvailableResources = (req,res) => {

}

getAvailableResourcesOnDate = async (req,res) => {
    console.log(req.body.date)
    console.log("XD")
    try {
        const resources = await Resource.find({});
        const filter = resources.filter((resource) => !resource.schedule.includes(req.body.date));
        res.json(filter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createResource,
    getResourceById,
    deleteResourceById,
    getResourcePairs,
    updateResourceById,
    getAvailableResources,
    getAvailableResourcesOnDate
}