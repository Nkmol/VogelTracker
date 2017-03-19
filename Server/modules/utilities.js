let glob = require('glob-promise'),
    chalk = require('chalk'),
    rootRequire = require('rfr'); // Used to require relative to the root path

exports.requireAll = (globPath, debug = true) => {
    return glob(globPath, {relative: true})
        .then(files => {
            files.forEach(x => {
                // Load files
                try {
                    rootRequire(`./${x}`);
                                    
                    if(debug)
                        console.log(chalk.green(`   Loaded file: ${x}`));
                } catch (e) {
                    throw e;
                }
            })
        })
        .catch(err => console.error(chalk.red(`Something went wrong when loading file(s): ${err}`)))
}