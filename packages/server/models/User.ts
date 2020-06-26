import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

export interface UserType extends Document {
    email: string;
    password: string;
    comparePassword?: (password) => any;
}

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
});

UserSchema.pre<UserType>('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        next();
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model<UserType>('user', UserSchema);
