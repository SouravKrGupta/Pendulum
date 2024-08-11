const mongoose = require('mongoose');

const pendulumSchema = new mongoose.Schema({
    Length1: {
        type: Number,
        required: true
    },
    Mass1: {
        type: Number,
        required: true
    },
    Length2: {
        type: Number,
        required: true
    },
    Mass2: {
        type: Number,
        required: true
    },
  twoPendulums:{
    type:Boolean,
    required:true
  }
});

const Pendulum = mongoose.model('Pendulum', pendulumSchema);

module.exports = Pendulum;
