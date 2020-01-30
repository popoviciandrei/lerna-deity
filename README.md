# Product Reviews Plugin for falcon.deity.io platform
This plugin was written as an example on how we can implement different business requirements on a shop that has the FE built using falcon.de

## Client requirements
On the product page (PDP) business wants to render the last 10 reviews of that product given by past clients.
Display will be made as an accordion ( displaying only the email with button to show/hide the rest of the review )

## Tech stach used
* The components is composed of 4 packages that are using Lerna [https://github.com/lerna/lerna] to deploy them on npmjs.com.

## List of packages
* deity-reviews-api - package that does the communication with the reviews servers to pull the reviews and give them back to the grapql client
* deity-reviews-data - contains the graphql queries wrappers used by React frontend compoents to fetch info from graphql server
* deity-reviews-extension - contains the graphql schema definition
* deity-reviews-ui -  implements the React components that displays the reviews received from graphql server

## Quick start
Steps to quick install and use this component.
* Clone the example shop falcon.deity from here: https://github.com/deity-io/falcon
    * use `yarn` instead of `npm`  ( via `npm` can throuh some errors)
* Inside the cloned folder navigate to `examples/shop-with-blog/server` folder.
    *  Edit `package.json` and add these 2 packages under `dependencies` node:

        ```json
        "dependencies": {
            ...
            "@npmapopovici/deity-reviews-extension": "0.0.16",
            "@npmapopovici/deity-reviews-api": "0.1.1"
        }
        ```
        * Please update 0.0.16 and 0.0.6 with the latest version of these packages if different
    * Edit `config/default.json` file. Under `apis` node add the `reviewsapi` node:
        ```json
        "apis": {
            ...
            "reviewsapi": {
                "package": "@npmapopovici/deity-reviews-api",
                "config": {
                    "host": "jsonplaceholder.typicode.com",
                    "protocol": "https",
                    "apiPrefix": "/comments"
                }
            }
        ```
        and under `extensions` node add the `reviews` node:
        ```json
        "extensions": {
            ...
            "reviews": {
                "package": "@npmapopovici/deity-reviews-extension",
                "config": {
                    "api": "reviewsapi"
                }
            }
        ```
    * From command line under ``examples/shop-with-blog/server` install server dependencies
        ```cli
        yarn install
        ```
* Navigate to the `examples/shop-with-blog/client` folder.
    * Edit `package.json` file, under `devDependencies` node add 2 packages:
        ```json
        "devDependencies": {
            ...
            "@npmapopovici/deity-reviews-data": "^0.0.18",
            "@npmapopovici/deity-reviews-ui": "^0.1.1"
        }
        ```
    * Install the newly added packages from command line inside `client` folder:
        ```cli
        yarn install
        ```
    *  Edit this React file under `client` folder: `src/pages/shop/Product.js`. 
        * Import the 'ProductReviews' component after the other imports but before const ProductPage:
            ```React
            ...
            import { ProductReviews } from '@npmapopovici/deity-reviews-ui';

            const ProductPage = ({ match: { params } }) => (
                ...
            ```
        * Navigate throught the code and around line 57 after the `<ProductDescription ... />` line add our `ProductReviews`:
            ```React
            ...
            <ProductReviews productId={parseInt(product.id)} />
            ...
            ```
        * Try to see the network requests. The product.id is being matched to the postId on the reviews api. But the test reviews list only has postId's up to 100. If no reviews are being displayed on the page, replace `parseInt(product.id)` with any int value under `100`. Usually browsing categories under "Gear" have products with id under 100.

* Go to the root of the project where it was cloned ( you should see files like lerna.json, package.json) and from command line in this folder run "yarn run start". Once the server are up naviate to http://localhost:3000 and go to any PDP page.








