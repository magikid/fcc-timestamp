'use strict';

var Users = require('../models/users.js');
var moment = require('moment');

function DateHandler(){
    this.getDate = function(req, res){
        Users
            .findOne({'github.id': req.user.github.id}, {'_id': false})
            .exec(function(err, result){
                if (err){ throw err; }

                var date = moment(req.params['date']);

                var output = {unix: '', natural: ''};
                if (date.isValid()){
                    output.unix = date.format('X');
                    output.natural = date.format('LL');
                }else{
                    var timestamp = moment(req.params['date'], 'X');

                    if(timestamp.isValid()){
                        output.unix = timestamp.format('X');
                        output.natural = timestamp.format('LL');
                    }
                }
                res.json(output);
            })
    }
}

module.exports = DateHandler;