"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the TVShow schema
const tvShowSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('TVShow', tvShowSchema);
