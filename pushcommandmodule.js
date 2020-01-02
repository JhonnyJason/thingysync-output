// Generated by CoffeeScript 2.5.0
(function() {
  var c, failCollection, git, gitmodulesHandler, handleLevel, log, olog, ostr, pathHandler, print, printError, printFailCollection, pushLevel, pushcommandmodule;

  pushcommandmodule = {
    name: "pushcommandmodule"
  };

  //region modulesFromTheEnvironment
  //region node_modules
  gitmodulesHandler = require("gitmodules-file-handler");

  c = require("chalk");

  //endregion

  //region localModules
  pathHandler = null;

  git = null;

  //endregion
  //endregion

  //region printLogFunctions
  //#############################################################################
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["pushcommandmodule"] != null) {
      console.log("[pushcommandmodule]: " + arg);
    }
  };

  print = function(arg) {
    return console.log(arg);
  };

  printError = function(arg) {
    return console.log(c.red(arg));
  };

  olog = function(arg) {
    return log(ostr(arg));
  };

  ostr = function(obj) {
    return JSON.stringify(obj, null, 4);
  };

  //endregion
  //#############################################################################
  pushcommandmodule.initialize = function() {
    log("pushcommandmodule.initialize");
    pathHandler = allModules.pathhandlermodule;
    git = allModules.gitmodule;
  };

  failCollection = [];

  //region internalFunctions
  printFailCollection = function() {
    var fail, i, len;
    log("printFailCollection");
    if (failCollection.length === 0) {
      print("Success! nothing has failed :-)");
      return;
    }
    for (i = 0, len = failCollection.length; i < len; i++) {
      fail = failCollection[i];
      print(" - - - ");
      printError("Fail on: " + fail.path);
      printError("\n> " + fail.err);
    }
  };

  pushLevel = async function(path, message) {
    var err, failObject;
    log("pushLevel");
    try {
      await git.checkoutMaster(path);
      await git.addCommitPush(path, message);
    } catch (error) {
      err = error;
      failObject = {
        path: path,
        err: err
      };
      failCollection.push(failObject);
    }
  };

  handleLevel = async function(path, message) {
    var levelModules, modules, modulesFile, name, nextLevelPaths, promises;
    log("handleLevel");
    modulesFile = pathHandler.resolve(path, ".gitmodules");
    levelModules = (await gitmodulesHandler.readNewGitmodulesFile(modulesFile));
    modules = levelModules.getAllModules();
    nextLevelPaths = (function() {
      var results;
      results = [];
      for (name in modules) {
        results.push(pathHandler.resolve(path, name));
      }
      return results;
    })();
    promises = nextLevelPaths.map(handleLevel);
    await Promise.all(promises);
    await pushLevel(path, message);
  };

  //endregion

  //region exposedFunctions
  pushcommandmodule.execute = async function(message) {
    var basePath;
    log("pushcommandmodule.execute");
    if (!message) {
      message = "thingysync push";
    }
    basePath = pathHandler.basePath;
    await handleLevel(basePath, message);
    printFailCollection();
  };

  //endregion
  module.exports = pushcommandmodule;

}).call(this);
