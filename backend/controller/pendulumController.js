const Pendulum = require('../models/pendulumModel');

const AddPendulum = async (req, res) => {
    try {
        const {
            Length1,
            Mass1,
            Length2,
            Mass2,
            twoPendulums,
        } = req.body;
        
        const newPendulum = new Pendulum({
            Length1,
            Mass1,
            Length2,
            Mass2,
            twoPendulums,
        });
        
        await newPendulum.save();
        res.status(201).json(newPendulum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const GetPendulum = async (req, res) => {
    try {
        const { id } = req.params;
        const pendulum = await Pendulum.findById(id);
        
        if (!pendulum) {
            return res.status(404).json({ message: 'Pendulum not found' });
        }

        res.json(pendulum);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    AddPendulum,
    GetPendulum
}
