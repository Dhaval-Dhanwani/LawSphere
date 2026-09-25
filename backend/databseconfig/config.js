
import mongo from 'mongoose'



async function makeconnection(){
    try{

        // this only connect to the localhost ,nothing to do with database
       await mongo.connect("mongodb://localhost/lawsphere")
       console.log("database connected");
    }
    catch(error)
    {
        console.log("mongo datavse not connected");
        throw error
    }
}


export default makeconnection