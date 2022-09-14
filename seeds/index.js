const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities.js');
const {places, descriptors} = require('./seedHelpers');

mongooseConnect().catch(err => console.log(err)).then(console.log('database connected!'));

async function mongooseConnect() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });

        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});