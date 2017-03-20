let glob = require('glob-promise'),
    chalk = require('chalk'),
    rootRequire = require('rfr'); // Used to require relative to the root path

exports.requireAll = (globPath, debug = true) => {
    return glob(globPath, {relative: true})
        .then(files => {
            // Function that we call on every file
            let fn = x => new Promise((resolve, reject) => {
                try {
                    let promise = rootRequire(`./${x}`);
                                    
                    if(debug)
                        console.log(chalk.green(`   Loaded file: ${x}`));

                    // Check for empty object + check if promise
                    if(promise != null || Object.keys(promise).length > 0 &&
                            promise.constructor === Promise) 
                        resolve(promise);

                } catch (e) {
                    throw e + ` [${x}]`;
                    reject(e + ` [${x}]`);
                }
            });

            // use .map() so we can iterate through the files and make a Promise of every file request.
            // use Promise.all to make a chain of promises of all file requests
            return Promise.all(files.map(fn));
        })
        .catch(err => console.error(chalk.red(`Something went wrong when loading file(s): ${err}`)))
}