Package.describe({
  summary: "Manipulate the DOM using CSS selectors",
  version: "1.0.0",
  name: "newspring:junction",
  git: "https://github.com/NewSpring/junction.git",
  documentation: "README.md"
});

Package.onUse(function (api) {
  api.addFiles("junction.js", "client");
  api.export("junction", "client");
});
