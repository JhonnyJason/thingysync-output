// Generated by CoffeeScript 2.5.0
(function() {
  var git, gitmodule, log, print;

  gitmodule = {
    name: "gitmodule"
  };

  //region modulesFromTheEnvironment
  git = require("simple-git/promise");

  //endregion

  //region printLogFunctions
  //#############################################################################
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["gitmodule"] != null) {
      console.log("[gitmodule]: " + arg);
    }
  };

  print = function(arg) {
    return console.log(arg);
  };

  //endregion
  //#############################################################################
  gitmodule.initialize = function() {
    log("gitmodule.initialize");
  };

  
  //region internalFunctions
  //endregion

  //region exposedFunctions
  gitmodule.pull = async function(base) {
    log("gitmodule.pull");
    await git(base).pull();
  };

  gitmodule.checkoutMaster = async function(base) {
    log("gitmodule.checkoutMaster");
    await git(base).checkout("master");
  };

  gitmodule.addCommitPush = async function(base, message) {
    log("gitmodule.addCommitPush");
    await git(base).add(".");
    await git(base).commit(message);
    await git(base).push("origin", "master");
  };

  //endregion
  module.exports = gitmodule;

}).call(this);
