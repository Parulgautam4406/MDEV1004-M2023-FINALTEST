import { Request, Response } from 'express';
import  TVShow, { TVShow as TVShowInterface } from '../model/TVShowModel';
import logger from '../logger';

class Controller {
  /**
   * Get all favourite TVShows.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getAllFavouriteTVShows(req: Request, res: Response): Promise<void> {
    try {
      const favouriteTVShows = await TVShow.find().lean();
      if (favouriteTVShows.length === 0) {
        logger.info('Favourite TVShows not found');
        res.status(404).json({ message: 'No favourite TVShows found' });
      } else {
        res.json(favouriteTVShows);
        logger.info('Favourite TVShows found');
      }
    } catch (error) {
      logger.error(`Error found in getAllFavouriteTVShows method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get a favourite TVShow by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getFavouriteTVShowByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const favouriteTVShow = await TVShow.findById(id).lean();
      if (!favouriteTVShow) {
        res.status(404).json({ message: 'TVShow not found' });
      } else {
        res.json(favouriteTVShow);
        logger.info('Favourite TVShow found');
      }
    } catch (error) {
      logger.error(`Error found in getFavouriteTVShowByID method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Add a new TV show.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async addFavouriteTVShow(req: Request, res: Response): Promise<void> { // Updated method name
    const {
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
    } = req.body;
    try {
      const newFavouriteTVShow: TVShowInterface = new TVShow({
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
      await newFavouriteTVShow.save();
      res.status(201).json(newFavouriteTVShow);
      logger.info('Favourite TV show added');
    } catch (error) {
      logger.error(`Error found in addFavouriteTVShow method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update an existing favourite TVShow by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async updateFavouriteTVShow(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedFavouriteTVShow = await TVShow.findByIdAndUpdate(id, updatedData, { new: true }).lean();
      if (!updatedFavouriteTVShow) {
        res.status(404).json({ message: 'TVShow not found' });
      } else {
        res.json(updatedFavouriteTVShow);
        logger.info('Favourite TVShow updated');
      }
    } catch (error) {
      logger.error(`Error found in updateFavouriteTVShow method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete an existing favourite TVShow by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async deleteFavouriteTVShow(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedFavouriteTVShow = await TVShow.findByIdAndDelete(id).lean();
      if (!deletedFavouriteTVShow) {
        res.status(404).json({ message: 'TVShow not found' });
      } else {
        res.json({ message: 'Favourite TVShow deleted successfully' });
        logger.info('Favourite TVShow deleted');
      }
    } catch (error) {
      logger.error(`Error found in deleteFavouriteTVShow method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default Controller;
