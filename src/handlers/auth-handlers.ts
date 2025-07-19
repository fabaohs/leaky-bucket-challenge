const signinHandler = async (ctx) => {
  ctx.body = {
    message: "signin endpoint works",
  };

  return ctx;
};

export default {
  signinHandler,
};
