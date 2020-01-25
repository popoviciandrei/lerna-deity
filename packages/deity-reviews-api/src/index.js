const url = require('url');
const qs = require('qs');
const pick = require('lodash/pick');
const isEmpty = require('lodash/isEmpty');
const isObject = require('lodash/isObject');
const {
    ApiDataSource,
    stripHtmlEntities,
    stripHtmlTags,
    generateExcerpt
} = require('@deity/falcon-server-env');

module.exports = class ReviewsApi extends ApiDataSource {
    constructor(params) {
        super(params);
        this.reviewConfig = {}
    }

    async resolveURL(req) {
        const {
            path
        } = req;
        const {
            apiPrefix
        } = this.config;
    }

    async reviewList(_, params) {
        // @TODO implement proper return
        return ['items'];
    }

};