// Generated by CoffeeScript 2.5.0
(function() {
  var CLUI, Spinner, c, checkFileExists, failCollection, fs, git, gitmodulesHandler, handleLevel, log, olog, ostr, pathHandler, print, printError, printFailCollection, pushLevel, pushcommandmodule;

  pushcommandmodule = {
    name: "pushcommandmodule"
  };

  //region modulesFromTheEnvironment
  //region node_modules
  fs = require("fs");

  gitmodulesHandler = require("gitmodules-file-handler");

  c = require("chalk");

  CLUI = require("clui");

  Spinner = CLUI.Spinner;

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
    var exists, levelModules, modules, modulesFile, name, nextLevelPaths, promises;
    log("handleLevel");
    modulesFile = pathHandler.resolve(path, ".gitmodules");
    exists = (await checkFileExists(modulesFile));
    if (exists) {
      log("moduleFile existed: " + modulesFile);
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
    }
    await pushLevel(path, message);
  };

  checkFileExists = async function(path) {
    var err, stat;
    log("checkFileExists");
    try {
      stat = (await fs.promises.stat(path));
    } catch (error) {
      err = error;
      return false;
    }
    return stat.isFile();
  };

  //endregion

  //region exposedFunctions
  pushcommandmodule.execute = async function(message) {
    var basePath, status, statusMessage;
    log("pushcommandmodule.execute");
    if (!message) {
      message = "thingysync push";
    }
    basePath = pathHandler.basePath;
    statusMessage = "pushing recursively...";
    status = new Spinner(statusMessage);
    status.start();
    try {
      await handleLevel(basePath, message);
    } finally {
      status.stop();
      printFailCollection();
    }
  };

  //endregion
  module.exports = pushcommandmodule;

}).call(this);