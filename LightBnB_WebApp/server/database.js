const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {

  const values = [email];

  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1;`, values)
  .then(res => res.rows.length > 0 ? res.rows[0] : null)
  .catch(err => console.log('error:', err));
}


exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const values = [id];

  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1;`, values)
  .then(res => res.rows.length > 0 ? res.rows[0] : null)
  .catch(err => console.log('error:', err));
}

exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  console.log(user)
  const values = [user.name, user.email, user.password];

  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, values)
  .then(res => res.rows.length > 0 ? res.rows[0] : null)
  .catch(err => console.log(err));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  const values = [guest_id, limit]

  return pool.query(`
  SELECT * FROM reservations
  WHERE guest_id = $1
  LIMIT $2;`, values)
  .then(res => res.rows.length > 0 ? res.rows : null)
  .catch(err => console.log(err));

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;

    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `JOIN users ON properties.owner_id = users.id\n
      WHERE users.id = $${queryParams.length}\n`
    }

    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      if (queryParams.length > 0) {
        queryString += `AND`;
      } else {
        queryString += `WHERE`;
      }
      queryParams.push(`${options.minimum_price_per_night * 100}`,`${options.maximum_price_per_night * 100}`);         // * 100 for price in cents
      queryString += ` properties.cost_per_night >= $${queryParams.length - 1}\n AND properties.cost_per_night <= $${queryParams.length}\n`
    }

    queryString += `GROUP BY properties.id\n`
    
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}\n`
    }

    queryString += `;`;

    return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  const queryParams = [];
  
  for (key in property) {
    queryParams.push(property[key]);
  }

  return pool.query(`
  INSERT INTO properties (
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country, 
    city,
    province,
    post_code,
    owner_id
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, queryParams)
  .then(res => res.rows.length > 0 ? res.rows : null)
  .catch(err => console.log(err));
}

exports.addProperty = addProperty;