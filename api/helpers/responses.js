module.exports = {
    getGeneral: getGeneral,
    getSuccess: getSuccess,
    getError: getError
};

/**
 * Allows for the standardization of general responses
 * @param {Object} data
 * @returns {Object}
 */
function getGeneral(data){
    return data;
}

/**
 * Allows for the standardization of success responses
 * @param {Object} data
 * @returns {Object}
 */
function getSuccess(data){
    data = data || {};
    data.success = true;
    return data;
}

/**
 * Allows for the standardization of success responses
 * @param {Object} data
 * @returns {Object}
 */
function getError(data){
    data = data || {};
    data.success = false;
    return data;
}