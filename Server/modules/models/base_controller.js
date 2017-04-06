let mongoose = require('mongoose'),
    chalk = require('chalk');
    qs = new (require('mongo-querystring'));

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
            if(when) {
                res.status(status).json({message: err});
                reject(err);
            } 
            else
                resolve(err);
        })
    }

    _isValidId(input) {
        if(!objIsEmpty(input || input._id) && !input._id.match(/^[0-9a-fA-F]{24}$/))
            return this.errorResponse(`Please provide a valid '_id'`, res); 
        else
            return true
    }

    get(req, res, next, populate = '') {
        let paramsQuery = objIsEmpty(req.params) ? {} : req.params;

        let isValidId = this._isValidId(paramsQuery)
        if(!isValidId) return isValidId;

        let urlQuery = qs.parse(req.query);
        let query = Object.assign({}, urlQuery, paramsQuery);

        return this.find(query)
            .populate(populate)
            .then(doc => doc.length <= 0 ? 
                this.errorResponse(`Could not find entity with ${JSON.stringify(req.params)}`, res, 404) : res.json(doc)
            );
    }

    delete(req, res, next) {
        let paramsQuery = objIsEmpty(req.params) ? {} : req.params;

        let isValidId = this._isValidId(paramsQuery)
        if(!isValidId) return isValidId;

        return this.findOne(paramsQuery)
            .then(doc => doc == null ? 
                this.errorResponse(`Could not find entity with ${JSON.stringify(req.params)}`, res, 404) : doc
            )
            .then(doc => doc.remove())
            .then(() => res.json({message: "ok"}))
    }
}

module.exports = BaseController;