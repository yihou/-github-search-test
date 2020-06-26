import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import {Document} from 'mongoose';

export interface UserType extends Document {
    email: string;
    password: string;
    comparePassword?: (password, callback) => any;
}

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
});

UserSchema.pre<UserType>('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

export const User = mongoose.model<UserType>('user', UserSchema);
