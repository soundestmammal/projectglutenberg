const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true
            }
        },
        id: {
            type: String,
            required: true,
            unique: true
        },
        categories: [
            { type: Object }
        ],
        display_phone: {
            type: String
        },
        hours: [
            {
                hours_type: {
                    type: String,
                },
                is_open_now: {
                    type: Boolean
                },
                open: [
                    {
                        is_overnight: {
                            type: Boolean
                        },
                        start: {
                            type: String,
                        },
                        end: {
                            type: String,
                        },
                        day: {
                            type: Number,
                        }
                    }
                ]
            }
        ],
        image_url: {
            type: String
        },
        is_closed: {
            type: Boolean,
        },
        location: {
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            address3: {
                type: String,
            },
            city: {
                type: String,
            },
            country: {
                type: String,
            },
            display_address: [
               { type: String },
            ],
            state: {
                type: String,
            },
            zip_code: {
                type: String,
            }
        },
        phone: {
            type: String,
        },
        price: {
            type: String,
        },
        rating: {
            type: Number,
        },
        photos: [
            { type: String }
        ],
        score: {
            type: Number
        }
    }
);

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;