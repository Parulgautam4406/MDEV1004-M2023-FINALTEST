import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a TVShow document.
 */
export interface TVShow extends Document {
  title: string;
  genres: string[];
  creators: string[];
  composers: string[];
  description: string;
  cast: string[];
  language: string;
  network: string;
  seasons: number;
  episodes: number;
  imageURL: string;
  originalRelease: string;
}

// Define the TVShow schema
const tvShowSchema: Schema = new mongoose.Schema({
  title: String,
  genres: [String],
  creators: [String],
  composers: [String],
  description: String,
  cast: [String],
  language: String,
  network: String,
  seasons: Number,
  episodes: Number,
  imageURL: String,
  originalRelease: String,
});

// Create and export the TVShow model
export default mongoose.model<TVShow>('TVShow', tvShowSchema);
