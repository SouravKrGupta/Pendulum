const mongoose = require('mongoose');

const energySchema = new mongoose.Schema({
    potentialEnergy1: {
        type: Number,
        required: true
    },
    kineticEnergy1: {
        type: Number,
        required: true
    },
    mechanicalEnergy1: {
        type: Number,
        required: true
    },
    potentialEnergy2: {
        type: Number,
        default: 0
    },
    kineticEnergy2: {
        type: Number,
        default: 0
    },
    mechanicalEnergy2: {
        type: Number,
        default: 0
    },
    airResistance: {
        type: Boolean,
        required: true
    }
});

const Energy = mongoose.model('Energy', energySchema);

module.exports = Energy;
