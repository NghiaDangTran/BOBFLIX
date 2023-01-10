const Favorite = require('../models/Favorite')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const User = require('../models/User');
const Movies = require('../models/Movies');
const { create } = require('../models/User');

const AddFarvorite = async (req, res) => {
    const { userId, movieId } = req.body;

    // Find the user in the database
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new CustomError.BadRequestError('no user found');

    }
    let movie = await Movies.findOne({ MovieID: movieId });
    if (!movie) {
        movie = await Movies.create({ MovieID: movieId })
    }
    let favorites = await Favorite.findOne({ userID: userId });
    if (!favorites) {
        const newFavorites = await Favorite.create({ userID: userId, favorites: [movie._id] })
        res.status(StatusCodes.CREATED).json({ msg: 'Sucess! add your favorite movie' })

    }


    if (favorites.favorites.includes(movie._id)) {
        throw new CustomError.BadRequestError('Id already in the database');
    }
    // If the user already has a favorites document, add the new favorite movie
    favorites.favorites.push(movie._id);
    await favorites.save();
    res.status(StatusCodes.CREATED).json({ msg: 'Sucess! add your favorite movie' })

};

const CheckFavorite = async (req, res) => {
    const { userId } = req.body;

    // Find the movie in the database
    // let movie = await Movies.findOne({ MovieID: movieId });
    // if (!movie) {
    //     return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Movie not found' });
    // }

    // Find the user's favorites document
    const favorites = await Favorite.findOne({ userID: userId });
    if (!favorites) {
        return res.status(StatusCodes.OK).send({ favorites:[] });
    }
    else {
        let tempFavor = []
        for (let i = 0; i < favorites.favorites.length; i++) {
            const tempData = await Movies.findOne({ _id: favorites.favorites[i] })
            tempFavor.push(tempData.MovieID)
        }
        return res.status(StatusCodes.OK).send({ favorites: tempFavor })
    }

    // Check if the movie is in the user's favorites list
    if (favorites.favorites.includes(movie._id)) {
        return res.status(StatusCodes.OK).send({ success: true, message: 'Movie is in favorites' });
    } else {
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, message: 'Movie is not in favorites' });
    }
}
module.exports = { AddFarvorite, CheckFavorite }



