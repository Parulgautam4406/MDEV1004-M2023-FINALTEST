"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../controllers/Controller"));
const Auth_1 = require("../controllers/Auth");
const JwtUtils_1 = require("../utils/JwtUtils");
const router = (0, express_1.Router)();
const controller = new Controller_1.default();
//user login
router.post('/user_login', Auth_1.login);
//user registeration
router.post('/user_register', Auth_1.register);
// Get all favourite TVShow
router.get('/get_TVShow', JwtUtils_1.authenticateToken, controller.getAllFavouriteTVShows);
// Get favourite TVShow by ID
router.get('/get_TVShow/:id', JwtUtils_1.authenticateToken, controller.getFavouriteTVShowByID);
// Add a new TVShow
router.post('/add_TVShow', JwtUtils_1.authenticateToken, controller.addFavouriteTVShow);
// Update an existing TVShow by ID
router.put('/update_TVShow/:id', JwtUtils_1.authenticateToken, controller.updateFavouriteTVShow);
// Delete an existing TVShow by ID
router.delete('/delete_TVShow/:id', JwtUtils_1.authenticateToken, controller.deleteFavouriteTVShow);
exports.default = router;
