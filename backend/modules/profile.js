const db = require('./../db/db.js'); 
const Profile = db.User;
const Pill = db.Pill;

const retrieve = async (profileParams) => {
   try {
      return {user: await Profile.findOne({userId: profileParams.userId}), msg: 'Success'};
   }
   catch (error) {
      throw `The User ${profileParams.userId} could not be retrieved`;
  }
}

const create = async (profileParams) => {
   try {
      await Profile.findOne({ userId: profileParams.userId})
      const profile = new Profile(profileParams);
      profile.save();
      return({msg: 'Success'});
   }
   catch (error) {
      throw 'The user ' + profileParams.userId + ' is already in the database';
   }
}

const update = async (profileParams) => {
   try {
      await Profile.findOneAndUpdate({userId: profileParams.userId}, profileParams);
      return {msg: 'Success'};
   }
   catch (error) {
      throw `The profile for ${profileParams.name} could not be updated`;
   }
}

const remove = async (profileParams) => {
   try {
      await Profile.deleteOne({userId: profileParams.userId});
	   await Pill.deleteMany({userId: profileParams.userId});
      return {msg: 'Success'};
   }
   catch (error) {
      throw `The profile for ${profileParams.name} could not be removed`;
   }

}

module.exports = {create, update, remove, retrieve};
