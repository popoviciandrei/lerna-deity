const url = require('url');
const qs = require('qs');
const pick = require('lodash/pick');
const slice = require('lodash/slice');
const get = require('lodash/get');
const ceil = require('lodash/ceil');
const pipe = require('lodash/fp/pipe');
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

    /**
     * Build the reviews URL string
     * @param {object} req
     */
    async resolveURL(req) {
        const {
            apiPrefix
        } = this.config;
        return super.resolveURL({
            path: apiPrefix
        });
    }

    async review(_, {
        id
    }) {
        const payload = {
            id
        }

        return this.get('', payload, {
            context: {
                didReceiveResult: (result, res) => {
                    return !!result ? result.find(item => item.id = id) : null;
                }
            }
        })
    }

    async reviewList(_, {
        query,
        pagination
    }) {

        const payload = {
            ...query
        }

        payload.perPage = get(pagination, 'perPage', 10);
        payload.page = get(pagination, 'page', 0);

        return this.get('', payload, {
            context: {
                didReceiveResult: (result, res) => {
                    return result ? this.processReviewsList(result, payload) : null;
                }
            }
        })
    }

    /**
     *
     * @param {object} reviews
     * @param {object} payload
     * @returns {object}
     */
    processReviewsList(reviews, {
        postId,
        name,
        email,
        perPage,
        page
    }) {
        const start = page * perPage;
        const end = start + perPage;
        let totalItems = reviews.length;
        let totalPages = ceil(totalItems / perPage);
        const items = pipe(
            (result) => postId ? result.filter(item => get(item, 'postId') === postId) : result,
            (result) => name ? result.filter(item => get(item, 'name') === name) : result,
            (result) => email ? result.filter(item => get(item, 'email') === email) : result,
            (result) => {
                totalItems = result.length;
                totalPages = ceil(totalItems / perPage);
                return slice(result, start, end);
            }
        )(reviews)


        return {
            items,
            pagination: {
                perPage,
                totalItems,
                totalPages,
                currentPage: page
            }
        };
    }


};