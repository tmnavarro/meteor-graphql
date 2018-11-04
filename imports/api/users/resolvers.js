export default {
  Query: {
    user(obj, args, { user }) {
      return user || {};
    }
  },
  User: {
    email: (user) => {
      if (!!user.emails) {
        return user.emails[0].address
      }
    }
  }
}
