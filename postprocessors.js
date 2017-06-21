'use strict';

const fetch         = require('node-fetch');
const plugin        = require('./plugin.json');
const { getByPath } = require('./util');

const baseURL = plugin.baseURL;

module.exports = {
    castCPUToPercentage(data, metricData) {
        return castToPercentage(data, metricData, `${baseURL}${data.url}/metrics/cpu/node_capacity`);
    },
    castMemoToPercentage(data, metricData) {
        return castToPercentage(data, metricData, `${baseURL}${data.url}/metrics/memory/node_capacity`);
    }
};

function castToPercentage(data, metricData, url) {
    return fetch(url)
    .then(res => res.json())
    .then(result => {
        let localResult = getByPath(metricData.resultPath || [], result);
        return { url: data.url, result: (data.result*100/localResult).toFixed(1) };
    });
}
