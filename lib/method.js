var Q = require('q');

var Method = function(specs, client) {
    'use strict';
    var self = this;

    self.specs = specs;

    self.exec = function(params, callback) {
        var deferred = Q.defer(),
            data = {},
            attributes = {},
            dataFieldsArray = self.specs.dataFields,
            attributesFieldsArray = self.specs.attributesFields,
            requiredFields = self.specs.requiredFields;

        Q.fcall(function() {
            var keys = Object.keys(params), requiredParams = 0;
            for (var i = 0; i < keys.length; i++) {
                var ky = keys[i];

                if (requiredFields.indexOf(ky) > -1) {
                    requiredParams++;
                }
                if (dataFieldsArray.indexOf(ky) > -1) {
                    data[ky] = params[ky];
                }
                if (attributesFieldsArray.indexOf(ky) > -1) {
                    attributes[ky] = params[ky];
                }
            }

            if (requiredParams < requiredFields.length) {
                throw new Error(
                    'You dont send all required params. [' +
                        requiredFields.toString() +
                        ']'
                );
            }

            return client._prepareRequest(self.specs.method, data, attributes);
        })
            .then(client._makeRequest)
            .then(function(response) {
                deferred.resolve(response);
            })
            .fail(function(error) {
                deferred.reject(error);
            });

        deferred.promise.nodeify(callback);
        return deferred.promise;
    };
};
module.exports = Method;
