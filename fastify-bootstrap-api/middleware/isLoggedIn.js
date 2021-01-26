async function isLoggedIn(request) {
  try {
    const { userId, isLoggedIn } = request.session.user;

    if (isLoggedIn) {
      request.user = userId;
    }
  } catch (error) {
    throw new Error("Must be logged in to access this resource.")
  }
}

module.exports = {
  isLoggedIn
}