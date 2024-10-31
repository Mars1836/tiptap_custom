export default defineEventHandler(async (event) => {
  const res = event.node.res;
  res.setHeader("Set-Cookie", "token=123; Path=/; HttpOnly");
  return {
    message: "Token set successfully",
  };
});
