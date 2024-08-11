const mongoose = require('mongoose');
const Energy = require('../models/energyModule');

// Buffer to hold the latest energy data
let latestEnergyData = null;
let saveTimeout = null;

// Function to handle delayed saving
const saveEnergyWithDelay = (data, delay) => {
  // Clear existing timeout if any
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Update the latest energy data
  latestEnergyData = data;

  // Set a new timeout to save the latest data after the delay
  saveTimeout = setTimeout(async () => {
    if (latestEnergyData) {
      try {
        const newEnergy = new Energy(latestEnergyData);
        await newEnergy.save();
        console.log('Energy data saved after delay:', newEnergy);
        
        // Clear the latest data after saving
        latestEnergyData = null;
      } catch (error) {
        console.error('Error saving energy data:', error);
      }
    }
  }, delay);
};

const AddEnergy = async (req, res) => {
  try {
    const { 
      potentialEnergy1, 
      kineticEnergy1, 
      mechanicalEnergy1, 
      potentialEnergy2 = 0, 
      kineticEnergy2 = 0, 
      mechanicalEnergy2 = 0, 
      airResistance 
    } = req.body;

    const energyData = {
      potentialEnergy1,
      kineticEnergy1,
      mechanicalEnergy1,
      potentialEnergy2,
      kineticEnergy2,
      mechanicalEnergy2,
      airResistance
    };

    // Call the delayed save function with 5 minutes delay
    saveEnergyWithDelay(energyData, 300000); // 300000 ms = 5 minutes

    res.status(202).json({ message: 'Energy data will be saved after a delay' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  AddEnergy
};
