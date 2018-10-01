const tasks = {};

export default tasks;

/**
 * Register a task
 * @param name
 * @param generator
 */
export const registerTask = (name, generator) => {
  if (!name || typeof name !== 'string')
    throw new Error('Task name should be a non-empty string');
  if (typeof generator !== 'function')
    throw new Error('Task generator should be a function');
  if (tasks[name])
    throw new Error(`Task [${name}] has already been registered`);

  tasks[name] = { name, generator };
};

/**
 * Unregister a task
 * @param name
 */
export const unregisterTask = name => {
  delete tasks[name];
};

/**
 * Get a task
 * @param name
 * @returns {*}
 */
export const getTask = name => tasks[name];

/**
 *
 * @param keys
 * @returns {[]}
 */
export const getTasks = keys => keys.map(key => tasks[key]);

/**
 * Get all tasks
 * @returns {{}}
 */
export const getAllTasks = () => tasks;
