const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
      id: {
        required: true,
        trim: true,
        type: String
      },
      implemented: {
        required: true,
        type: Boolean
      },
      name: {
        required: true,
        type: String
      },
      description: {
        required: true,
        type: String
      },
      descriptionDetail: {
        required: true,
        type: String
      },
      category: {
        type: Map,
        of: String
      }
    },
    {
      timestamps: true
    }
);

const Feature = mongoose.connection.model(
    'Feature',
    Schema
);
export default Feature;