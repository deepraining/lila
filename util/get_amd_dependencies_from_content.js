
var _ = require("lodash");
var acorn = require("acorn");
var escodegen = require("escodegen");
var walk = require("acorn/util/walk");

var valuesFromArrayExpression = (expression) => {
  return expression.elements.map((el) => {
    return el.value;
  });
};

module.exports = (content) => {
  var deps = [];
  var ast = acorn.parse(content);

  var definitionCount = 0;

  walk.ancestor(ast, {
    CallExpression: function(node, state) {
      if (node.callee.name != "define") return;

      definitionCount += 1;
      if (definitionCount > 1) throw new Error("A module must not have more than one anonymous 'define' calls.");

      switch (node["arguments"].length) {
        case 2:
          switch (node["arguments"][0].type) {
            case "ArrayExpression":
              deps = valuesFromArrayExpression(node["arguments"][0]);
          }
          break;
        case 3:
          deps = valuesFromArrayExpression(node["arguments"][1]);
      }
    }
  });

  return deps;
};
