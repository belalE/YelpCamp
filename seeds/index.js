const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60dfe51c6148cc0feab7ecd1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dtt2yhson/image/upload/v1625875031/YelpCamp/pfwedudwonqfy0lzezw8.jpg',
                    filename: 'YelpCamp/pfwedudwonqfy0lzezw8'
                },
                {
                    url: 'https://res.cloudinary.com/dtt2yhson/image/upload/v1625875035/YelpCamp/jqypkncajw20bn68puiv.jpg',
                    filename: 'YelpCamp/jqypkncajw20bn68puiv'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quasi delectus ratione quod quia? Iusto voluptas cupiditate aut temporibus architecto! Soluta aut rem quis qui repudiandae quas accusantium libero nulla.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})