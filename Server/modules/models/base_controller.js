let mongoose = require('mongoose'),
    chalk = require('chalk');

class BaseController {
    constructor() {
        this._Model = null;
        this.modelName = '';
    }

    set Model(val) {
        if(val !== null) 
            this.modelName = val.modelName;

        this._Model = val;
    }

    create(body) {
        let model = new this._Model(body);
        
        return model.save()
            .then(() => {
                console.log(chalk.blue(`Saved a ${this.modelName}`))}
                )
            .catch(err => {
                console.error(chalk.red(`Something went wrong saving a ${this.modelName}`));
                console.error(err); 
            });
    }

    remove(conditions) {
        return this._Model.remove(conditions)
            .then(removed => console.log(chalk.blue(`Removed ${removed.result.n} ${this.modelName}(s)`)))
            .catch(err => {
                console.error(chalk.red(`Something went wrong removing ${this.modelName}(s)`));
                console.error(err); 
            });
    }
}

module.exports = BaseController;