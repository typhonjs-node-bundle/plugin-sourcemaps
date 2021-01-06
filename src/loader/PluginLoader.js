const sourcemaps = require('rollup-plugin-sourcemaps');

/**
 * Handles interfacing with the plugin manager adding event bindings to pass back a configured
 * instance of `rollup-plugin-sourcemaps`.
 */
class PluginLoader
{
   /**
    * Returns the `package.json` module name.
    *
    * @returns {string}
    */
   static get pluginName() { return '@typhonjs-node-rollup/plugin-sourcemaps'; }

   /**
    * Returns the rollup plugins managed.
    *
    * @returns {string[]}
    */
   static get rollupPlugins() { return ['rollup-plugin-sourcemaps']; }

   /**
    * Returns the configured input plugin for `rollup-plugin-sourcemaps`
    *
    * @returns {object} Rollup plugin
    */
   static getInputPlugin()
   {
      return sourcemaps();
   }

   /**
    * Wires up PluginHandler on the plugin eventbus.
    *
    * @param {PluginEvent} ev - The plugin event.
    *
    * @see https://www.npmjs.com/package/typhonjs-plugin-manager
    *
    * @ignore
    */
   static onPluginLoad(ev)
   {
      // TODO: Note there is a conflict w/ @rollup/plugin-typescript if loaded before it.
      // ev.eventbus.on('typhonjs:oclif:bundle:plugins:main:input:get', PluginHandler.PluginLoader, PluginLoader);

      ev.eventbus.on('typhonjs:oclif:bundle:plugins:npm:input:get', PluginLoader.getInputPlugin, PluginLoader);
   }
}

module.exports = PluginLoader;