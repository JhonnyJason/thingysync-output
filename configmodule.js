// Generated by CoffeeScript 2.5.1
(function() {
  var configmodule, log;

  configmodule = {
    name: "configmodule"
  };

  //region exposedProperties
  configmodule.cli = {
    name: "thingysync"
  };

  //endregion

  //region logPrintFunctions
  //#############################################################################
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["configmodule"] != null) {
      console.log("[configmodule]: " + arg);
    }
  };

  //endregion
  //#############################################################################
  configmodule.initialize = function() {
    log("configmodule.initialize");
  };

  //region exposed functions
  //endregion
  module.exports = configmodule;

}).call(this);
