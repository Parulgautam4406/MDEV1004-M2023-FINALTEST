"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TVShowModel_1 = __importDefault(require("../model/TVShowModel"));
const logger_1 = __importDefault(require("../logger"));
class Controller {
    /**
     * Get all favourite TVShows.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getAllFavouriteTVShows(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favouriteTVShows = yield TVShowModel_1.default.find().lean();
                if (favouriteTVShows.length === 0) {
                    logger_1.default.info('Favourite TVShows not found');
                    res.status(404).json({ message: 'No favourite TVShows found' });
                }
                else {
                    res.json(favouriteTVShows);
                    logger_1.default.info('Favourite TVShows found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getAllFavouriteTVShows method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Get a favourite TVShow by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getFavouriteTVShowByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const favouriteTVShow = yield TVShowModel_1.default.findById(id).lean();
                if (!favouriteTVShow) {
                    res.status(404).json({ message: 'TVShow not found' });
                }
                else {
                    res.json(favouriteTVShow);
                    logger_1.default.info('Favourite TVShow found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getFavouriteTVShowByID method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Add a new TV show.
     *
     * @param req The request object.
     * @param res The response object.
     */
    addFavouriteTVShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, genres, creators, composers, description, cast, language, network, seasons, episodes, imageURL, originalRelease, } = req.body;
            try {
                const newFavouriteTVShow = new TVShowModel_1.default({
                    title,
                    genres,
                    creators,
                    composers,
                    description,
                    cast,
                    language,
                    network,
                    seasons,
                    episodes,
                    imageURL,
                    originalRelease,
                });
                yield newFavouriteTVShow.save();
                res.status(201).json(newFavouriteTVShow);
                logger_1.default.info('Favourite TV show added');
            }
            catch (error) {
                logger_1.default.error(`Error found in addFavouriteTVShow method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Update an existing favourite TVShow by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    updateFavouriteTVShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedData = req.body;
            try {
                const updatedFavouriteTVShow = yield TVShowModel_1.default.findByIdAndUpdate(id, updatedData, { new: true }).lean();
                if (!updatedFavouriteTVShow) {
                    res.status(404).json({ message: 'TVShow not found' });
                }
                else {
                    res.json(updatedFavouriteTVShow);
                    logger_1.default.info('Favourite TVShow updated');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in updateFavouriteTVShow method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Delete an existing favourite TVShow by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    deleteFavouriteTVShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedFavouriteTVShow = yield TVShowModel_1.default.findByIdAndDelete(id).lean();
                if (!deletedFavouriteTVShow) {
                    res.status(404).json({ message: 'TVShow not found' });
                }
                else {
                    res.json({ message: 'Favourite TVShow deleted successfully' });
                    logger_1.default.info('Favourite TVShow deleted');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in deleteFavouriteTVShow method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = Controller;
