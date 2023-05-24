const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "646baf1ef779a806f8a32216",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dqrt7ghqi/image/upload/v1684926869/yelp-camp/iku5a5x7tykjec463cuu.jpg',
                    filename: 'yelp-camp/iku5a5x7tykjec463cuu',
                },
                {
                    url: 'https://res.cloudinary.com/dqrt7ghqi/image/upload/v1684926871/yelp-camp/tb56mkwdjm0v7ahonsqa.jpg',
                    filename: 'yelp-camp/tb56mkwdjm0v7ahonsqa',
                }
            ],
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
            price: price,
            geometry: {
                type: 'Point',
                coordinates:
                    [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                    ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});