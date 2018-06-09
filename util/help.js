
const packageJson = require('../package.json');
const version = packageJson.version;

// cli options
const options = {
    env: {
        alias: 'e',
        type: 'number',
        desc: 'Specify current environment.'
    },
    local: {
        alias: 'l',
        type: 'string',
        desc: 'Specify current local name.'
    },
    out: {
        alias: 'o',
        type: 'bool',
        desc: 'Whether use out resolve alias.'
    }
};

// all commands
const commands = [
    {
        name: 'new',
        desc: 'Create a new project.'
    },
    {
        name: 'add',
        desc: 'Add a new module.'
    },
    {
        name: 'dev',
        desc: 'Watch files\' changes, with hot replacing and reloading, and start a local server for debug.'
    },
    {
        name: 'dist',
        desc: 'Pack source codes and static files into production, including minimizing, splitting, path correcting, etc.'
    },
    {
        name: 'sync',
        desc: 'Firstly do production tasks, and then sync production files to remote servers.'
    },
    {
        name: 'analyze',
        desc: 'Visualize size of webpack output files with an interactive zoomable treemap.'
    },
    {
        name: 'ana',
        desc: 'Alias of command analyze.'
    },
    {
        name: 'archive',
        desc: 'Archive dist directory on server side.'
    },
    {
        name: 'arc',
        desc: 'Alias of command archive.'
    },
    {
        name: 'clean',
        desc: 'Clean redundant files caused by revision(filename by each file\'s hash code).'
    },
    {
        name: 'revert',
        desc: 'Revert dist directory to last archive state.'
    }
];

/**
 * show help info
 */
module.exports = () => {
    // Ensure process.argv has 'h|help' argument.
    process.argv.indexOf('-h') < 0 && process.argv.indexOf('--help') < 0 && process.argv.push('-h');

    // Must import `yargs` in here, for ensuring -h/--help which used by yargs.
    const yargs = require('yargs');

    // Make an instance
    const yargsInstance = yargs.usage('\nUsage: lila <command> [args]');

    // Show all commands
    commands.forEach(cmd => {
        yargsInstance.command(cmd.name, cmd.desc);
    });

    // Make argv
    const argv = yargsInstance.help('help')
        .alias('help', 'h')
        .version('version', version)
        .alias('version', 'v')
        .options(options)
        .argv;

    // print all
    console.dir(argv);
};
