const router = require("express").Router();

const routes = [
  {
    path: "/post",
    route: require("./post.route"),
  },
  {
    path: "/tag",
    route: require("./tag.route"),
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
