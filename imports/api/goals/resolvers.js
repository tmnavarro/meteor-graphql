import Goals from './goals';

export default {
  Mutation: {
    createGoal(obj, { name, resolutionId }, { user }) {
      if (!!user._id) {
        const goalId = Goals.insert({
          name,
          resolutionId,
          completed: false
        });
        return Goals.findOne(goalId);
      }
      throw new Error('No-Auth');
    },
    toggleGoal(obj, { _id }) {
      const goal = Goals.findOne(_id);
      Goals.update(_id, {
        $set: {
          completed: !goal.completed
        }
      });
      return Goals.findOne(_id);
    }
  }
}
