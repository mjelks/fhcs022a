/**
 * Created by mjelks on 05/06/14.
 *
 * Simplified front-end for a business review site such as Yelp or Zagat
 *
 *
 *  Each business will have the following properties:
    name:  the business name, this is just a string.
    distance: the distance in miles from the current location.
    price:  the price will range from 1 for cheap to 5 for expensive.
    rating:  this will represent the average ‘star’ rating of the business by reviewers.
        A rating of 1 corresponds to ‘poor’ and a rating of 5 corresponds to ‘excellent’.

 */

var business = [
    {
        name: 'Red Apple',
        distance: 2,
        price: 3,
        rating: 1
    },
    {
        name: 'Everything Pizza',
        distance: 6,
        price: 1,
        rating: 2
    },
    {
        name: 'Zoe',
        distance: 1,
        price: 1,
        rating: 5
    },
    {
        name: 'Salad Place',
        distance: 2,
        price: 2,
        rating: 4
    },
    {
        name: 'Yumm',
        distance: 5,
        price: 2,
        rating: 3
    },
    {
        name: 'California Foods',
        distance: 8,
        price: 5,
        rating: 4
    }
];

// Return an array sorted in ascending alphabetical order
// based on the name.
business.alphaSort = function () {
    this.sort(function (a, b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });

    return this;
};

// Return an array sorted in ascending numerical order
// based on the price (low to high).
business.priceSort = function () {
    this.sort(function (a, b) {
        if(a.price < b.price) return -1;
        if(a.price > b.price) return 1;
        return 0;
    });

    return this;
};

// Return an array sorted in descending numerical order
// based on the rating (high to low).
business.ratingSort = function () {
    this.sort(function (a, b) {
        if(a.rating > b.rating) return -1;
        if(a.rating < b.rating) return 1;
        return 0;
    });

    return this;
};

// Return a subset of the array with only
// the businesses within the distance maxDistance,
// that have a rating of at least minRating
// and a price of at most maxPrice.
business.select = function (maxDistance, maxPrice, minRating) {
    var modified = this.filter(function(elem) {
        if (elem.distance <= maxDistance) {
            return true;
        } else {
            return false;
        }
    });

    modified = modified.filter(function(elem) {
        if (elem.price <= maxPrice) {
            return true;
        } else {
            return false;
        }
    });

    modified = modified.filter(function(elem) {
        if (elem.rating >= minRating) {
            return true;
        } else {
            return false;
        }
    });

    return modified;
};

/*
 * Testing
 * Make sure you open the Firebug console so that you can see and compare the output.
 * The expected output is ducumented in TestBReview.pdf
 */

// Test the select method.
// Get the businesses that satisfy the selection criteria and output the result.
console.table(business.select(2, 2, 3));
console.table(business.select(5, 4, 3));
console.table(business.select(7, 4, 2));
console.table(business.select(8, 5, 4));

// Test the alhpaSort method.
// Get the businesses sorted alphabetically by name and output the result.
console.table(business.alphaSort());

// Test the priceSort method.
// Get the businesses sorted by price (low to high) and output the result.
console.table(business.priceSort());

// Test the ratingSort method.
// Get the businesses sorted by rating (high to low) and output the result.
console.table(business.ratingSort());


