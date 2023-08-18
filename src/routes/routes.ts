import { Router } from 'express';
import Controller from '../controllers/Controller';
import { register, login } from '../controllers/Auth';
import { authenticateToken } from '../utils/JwtUtils';

const router = Router();
const controller = new Controller();
//user login
router.post('/user_login', login);
//user registeration
router.post('/user_register', register);

// Get all favourite TVShow
router.get('/get_TVShow',authenticateToken, controller.getAllFavouriteTVShows);

// Get favourite TVShow by ID
router.get('/get_TVShow/:id',authenticateToken, controller.getFavouriteTVShowByID);

// Add a new TVShow
router.post('/add_TVShow',authenticateToken, controller.addFavouriteTVShow);

// Update an existing TVShow by ID
router.put('/update_TVShow/:id',authenticateToken, controller.updateFavouriteTVShow);

// Delete an existing TVShow by ID
router.delete('/delete_TVShow/:id',authenticateToken, controller.deleteFavouriteTVShow);

export default router;
