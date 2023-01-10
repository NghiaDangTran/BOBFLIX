const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favorites: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
            , unique: true
        }]

    }
});

FavoriteSchema.index({ user: 1, favoriteId: 1 }, { unique: true });


module.exports = mongoose.model('Favorite', FavoriteSchema);
