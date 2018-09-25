/**
 * Handle server
 *
 * @example
 *
 * ```
 * [{
 *   type: 'web/static',
 *   option: {...}
 * }]
 * ```
 *
 * @param config
 */
module.exports = config => {
  if (!config.servers || !config.servers.length) {
    return;
  }

  // All web servers.
  config.webServers = [];
  // All static servers.
  config.staticServers = [];

  config.servers.forEach(server => {
    if (server.type === 'web') {
      config.webServers.push(server);
    } else {
      config.staticServers.push(server);
    }
  });
};
