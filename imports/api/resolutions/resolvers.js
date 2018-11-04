import Resolutions from './resolutions';
import Goals from '../goals/goals';

export default {
  Query: {
    resolutions(obj, args, { user }) {
      return Resolutions.find({
        userId: !!user ? user._id : null
      }).fetch();
    }
  },

  Resolution: {
    goals: (resolution) => {
      return Goals.find({ resolutionId: resolution._id }).fetch()
    },
    completed: (resolution) => {
      return Goals.find({ resolutionId: resolution._id, completed: false }).count() == 0
    }
  },

  Mutation: {
    createResolution(obj, { name }, { user }) {
      if (!!user._id) {
        const resolutionId = Resolutions.insert({
          name,
          userId: !!user ? user._id : null
        });
        return Resolutions.findOne(resolutionId);
      }
      throw new Error('No-Auth');
    }
  }
};
