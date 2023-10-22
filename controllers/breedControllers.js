let mongoose = require('mongoose');
let breeds = require('../breed_list.json');
let async = require('async');
let Breed = require('../Models/Breeds');

let saveBreedsToDb = async () => {
    try {
        async.mapLimit(breeds,5,async function(breed) {
            const breeds = new Breed({
                name: breed.name,
                weight: breed.weight.metric,
                height: breed.height.metric,
                breed_group: breed.breed_group,
                life_span: breed.life_span,
                temperament: breed.temperament,
                image: breed.image.url
            });
            await breeds.save();
        },(err,result) => {
            if (err) throw err
        })
    } catch (error) {
        console.error('Error saving breeds:', error);
    }
}

module.exports = saveBreedsToDb;