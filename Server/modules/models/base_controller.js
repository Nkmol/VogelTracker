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

    update(conditions, doc) {
        return this._Model.update(conditions, doc);
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
        if(input === undefined || !input.match(/^[0-9a-fA-F]{24}$/))
            return false;
        else
            return true
    }

    get(req, res, next, populate = '') {
        if(!objIsEmpty(req.params)) return this.getOne(req,res,next,populate); // reroute

        // Remove deep filters from normal filter
        let deepFilters = Object.keys(req.filter).map(f => {
            if(f.indexOf('.') > 0) {
                let response = {};
                response[f] = req.filter[f];

                // Remove from default filter
                delete req.filter[f];

                return response;
            }
        });

        return this.find(req.filter)
            .sort(req.sort)
            .skip(req.page.value > 0 ? ((req.page.value-1)*req.page.limit) : 0)
            .limit(req.page.limit)
            .populate(populate)
            .then(docs => {
                if(deepFilters && deepFilters[0] != null) {
                    deepFilters.forEach(filter => {
                                let key = Object.keys(filter)[0];
                                let props = key.split('.');         
                                docs = docs.filter(doc => {
                                    let entitie = doc;
                                    for(var i = 0; i < props.length-1; i++) {
                                        entitie = entitie[props[i]];
                                        
                                        if(entitie == null) {
                                            return false;
                                        }
                                    }

                                    // console.log(i, props[i], entitie[props[i]], filter[key]);
                                    // console.log(filter[key].$ne, entitie[props[i]] != filter[key].$ne)
                                    if(filter[key].$ne) {
                                        return entitie[props[i]] != filter[key].$ne;
                                    }
                                    else {
                                        return entitie[props[i]] == filter[key];
                                    }
                                })
                            });
                }
      
                return docs;
            })
            .then(doc => {
                if(doc.length <= 0) {
                    return this.errorResponse(`Could not find entity with ${JSON.stringify(req.params)}`, res, 404);
                }
                else {
                    // console.log(req.headers);
                    let type = req.headers['accept'];

                    if(type === 'txt/html') {
                        res.send(JSON.stringify(doc));
                    }
                    else {
                         res.json(doc)
                    }
                }
            })
            .catch(console.log);
    }

    getOne(req, res, next, populate = '') {
        if(objIsEmpty(req.params) || !this._isValidId(req.params._id))
            return this.errorResponse(`Please provide a valid '_id'`, res);

        let query = Object.assign({}, qs.parse(req.query), req.params);

        return this.findOne(query)
            .populate(populate)
            .then(doc => doc === null
                ? this.errorResponse(`Could not find entity with ${JSON.stringify(req.params)}`, res, 404) 
                : res.json(doc)
            );
    }

    delete(req, res, next) {
        let paramsQuery = objIsEmpty(req.params) ? {} : req.params;

        if(!this._isValidId(paramsQuery._id))
            return this.errorResponse(`Please provide a valid '_id'`, res);

        return this.findOne(paramsQuery)
            .then(doc => doc == null ? 
                this.errorResponse(`Could not find entity with ${JSON.stringify(req.params)}`, res, 404) : doc
            )
            .then(doc => doc.remove())
            .then(() => res.json({message: "ok"}))
    }

    put(req, res, next) {
        // start Validate
        if(objIsEmpty(req.body))
            return this.errorResponse('Please provide values with your PUT request', res, 204);

        if(objIsEmpty(req.params))
            return this.errorResponse('Please provide a valid parameter to this PUT request', res);

        if(!this._isValidId(req.params._id))
            return this.errorResponse(`Please provide a valid '_id'`, res);
        // end Validate

        // Create default empty object
        let emptyObj = Object.keys(this._Model.schema.obj)
            .reduce((acc, val) => 
                Object.assign({}, acc, {[val]: undefined})
            , {});
        
        // Override given information
        let newObject = Object.assign({}, emptyObj, req.body);
        
        return this.update({_id: req.params._id}, newObject, { upsert: true })
            .then(() => res.json(Object.assign(newObject, {_id: req.params._id}) ))
    }

    patch(req, res, next) {
        // start Validate
        if(objIsEmpty(req.body))
            return this.errorResponse('Please provide values with your PUT request', res, 204);

        if(objIsEmpty(req.params))
            return this.errorResponse('Please provide a valid parameter to this PUT request', res);

        if(!this._isValidId(req.params._id))
            return this.errorResponse(`Please provide a valid '_id'`, res);
        // end Validate

        return this.findOne({_id: req.params._id})
            .then(doc => doc === null 
                ? this.errorResponse(`Could not find entity with ${JSON.stringify(req.params)}`, res, 404)
                : doc
            )
            .then(doc => Object.assign(doc, req.body))
            .then(newDoc => this.update({_id: req.params._id}, newDoc).then(() => newDoc))
            .then(newDoc => res.json(Object.assign(newDoc, {_id: req.params._id}) ))
    }
}

module.exports = BaseController;