'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let userSchema = new Schema ({
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user_role: {
        type: Schema.Types.ObjectId, ref: 'Role',
        default: null
    }
});

// Used to load user role as the default role
userSchema.pre('save', function(next) {
    if(!this.user_role) 
        // Sync call
        mongoose.model('Role').findOne({role: 'user'}).then(res => {
            if(res) this.user_role = res._id;
            next();
        })
    else
        next();
});

mongoose.model('User', userSchema);
