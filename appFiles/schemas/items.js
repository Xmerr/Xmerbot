var itemTypes = require('./itemTypes');

module.exports = mongoose => {
    var itemSchema = mongoose.Schema({
        name: {
            type: String,
            lowercase: true,
            required: true,
            index: true,
            unique: true,
            trim: true,
            sparse: true
        },
        type: {
            type: String,
            required: true,
            lowercase: true,
            enum: itemTypes
        },
        weight: {
            type: Number,
            required: true,
            default: 0
        },
        text: {
            type: Array
        },
        roll: {
            type: mongoose.Schema.Types.Mixed
        },
        dmg1: {
            type: String
        },
        dmg2: {
            type: String
        },
        dmgType: {
            type: String
        },
        property: {
            type: String
        },
        range: {
            type: String
        },
        modifier: {
            type: Array
        },
        ac: {
            type: String
        },
        source: {
            type: String
        },
        stealth: {
            type: String
        },
        strength: {
            type: Number
        }
    });
    
    return mongoose.model('Items', itemSchema);
};