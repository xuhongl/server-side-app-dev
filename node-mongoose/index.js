const mongoose = require ('mongoose');
const Dishes = require ('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('connected correctly buddy!');

    // //exercise 1
    // var newDish = Dishes({name: 'name1', description: 'description2'});
    // newDish.save()
    // .then((dish) => {console.log(dish); return Dishes.find()})
    // .then((dishes) => {
    //     console.log(dishes);

    //     return Dishes.remove({});
    // })
    // .then(() => {
    //     return mongoose.connection.close();
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

    //exercise 2
    Dishes.create({
        name: 'name5',
        description: 'description5'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });


});