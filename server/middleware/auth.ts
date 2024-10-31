export default defineEventHandler(async (event) => {
  console.log("testt", event.path);
  if (event.path.startsWith("/profile")) {
    console.log("auth");
  }
});
