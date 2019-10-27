const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({

    watson_audio: {
        type: String,
    },
    watson_personalities: {
        type: Object,
        require:true
    },
    watson_tech: {
        type: Object
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    is_active: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('tests', TestSchema);
