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

    /**
     * Return a review per id
     * @param {object} _
     * @param {object} param1
     */
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

    /**
     * Return list of reviews
     * @param {object} _
     * @param {object} param1
     */
    async reviewList(_, {input: {pagination, ...filters}}) {

        /**
         * 'filters' can contain 'postId', 'name', 'email' key:value pairs
         * that are used to be filtered when the .get request occurs
         */
        const payload = {
            ...filters
        }

        const substract = {
          perPage : get(pagination, 'perPage', 10),
          page : get(pagination, 'page', 0)
        }

        return this.get('', payload, {
            context: {
                didReceiveResult: (result, res) => {
                    return result ? this.processReviewsList(result, substract) : null;
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
        perPage,
        page
    }) {
        const start = page * perPage;
        const end = start + perPage;
        const totalItems = reviews.length;
        const totalPages = ceil(totalItems / perPage);
        const items =  slice(reviews, start, end);

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