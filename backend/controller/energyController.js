const Energy =require('../models/energyModule');


const AddEnergy=async(req,res)=>{
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

        const newEnergy = new Energy({
            potentialEnergy1,
            kineticEnergy1,
            mechanicalEnergy1,
            potentialEnergy2,
            kineticEnergy2,
            mechanicalEnergy2,
            airResistance
        });

        await newEnergy.save();
        res.status(201).json(newEnergy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports={
    AddEnergy
}