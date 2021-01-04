const sourcemaps = require('rollup-plugin-sourcemaps');

/**
 * Handles interfacing with the plugin manager adding event bindings to pass back a configured
 * instance of `rollup-plugin-sourcemaps`.
 */
class PluginHandler
{
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
      // ev.eventbus.on('typhonjs:oclif:bundle:plugins:main:input:get', PluginHandler.getInputPlugin, PluginHandler);

      ev.eventbus.on('typhonjs:oclif:bundle:plugins:npm:input:get', PluginHandler.getInputPlugin, PluginHandler);
   }
}

/**
 * Oclif init hook to add PluginHandler to plugin manager.
 *
 * @param {object} opts - options of the CLI action.
 *
 * @returns {Promise<void>}
 */
module.exports = async function(opts)
{
   try
   {
      global.$$pluginManager.add({ name: '@typhonjs-node-rollup/plugin-sourcemaps', instance: PluginHandler });

      global.$$eventbus.trigger('log:debug', `plugin-sourcemaps init hook running '${opts.id}'.`);
   }
   catch (error)
   {
      this.error(error);
   }
};
