import mongo from 'mongoose'
import User from '../UserGeneric/userSchema.js'
let adminschema=mongo.Schema({})

let Admin=User.discriminator("Admin", adminschema);

export {Admin}