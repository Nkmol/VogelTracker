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

    get Model() {
        return this._Model;
    }

    create(body, debug = false) {
        let model = new this._Model(body);
        
        return model.save()
            .then(() => { 
                console.log(chalk.blue(`Saved a ${this.modelName}`)) 
                if(debug) console.log(chalk.blue(model));
                
                return model;
            })
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

    find(doc) {
        return this._Model.find(doc);
    }

    findOne(doc) {
        return this._Model.findOne(doc);
    }

    populate(doc, propPath) {
        return this._Model.populate(doc, propPath);
    }

    exists(doc) {
        return this.findOne(doc).then(result => result != null);
    }

    /* Start HTTP control methods */

    // HTTP promise reject respond, so all chains are canceled
    errorResponse(err, res, status = 400, when = true) {
        return new Promise((resolve, reject) => {
            console.log(when);
            if(when) {
                res.status(status).json({message: err});
                reject(err);
            } 
            else
                resolve(err);
        })
    }

    get(req, res, next) {
        let data = objIsEmpty(req.params) ? {} : req.params;

        if(!objIsEmpty(data || data._id) && !data._id.match(/^[0-9a-fA-F]{24}$/))
            return this.errorResponse(`Please provide a valid '_id'`, res);
        else 
            return this.find(data)
                .then(doc => doc.length <= 0 ? res.status(404)
                    .json({message: `Could not find entity with ${JSON.stringify(req.params)}`}) : res.json(doc)
                );
    }
}

module.exports = BaseController;