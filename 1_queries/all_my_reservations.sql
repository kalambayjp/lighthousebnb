-- tables needed: reservations, properties, property_reviews (giving userid within the SELECT so no need for users)

-- steps:
-- SELECT reservations.*, properies.*, AVG(property_reviews.rating)
-- FROM reservations table
-- JOIN properties table ON properties.id = reservations.property_id
-- JOIN property_reviews ON property_reviews.property_id = properties.id
-- WHERE reservations.guest_id = x                       -- only select data from the specific user
-- AND reservations.end_date is < now()::date            -- only past reservations
-- GROUP BY properties.id
-- ORDER BY reservatrions.start_date (ascending)
-- LIMIT to 10 rows;

SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS avg_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = 1
AND reservations.end_date < NOW()::DATE
GROUP BY properties.id, reservations.id 
ORDER BY reservations.start_date
LIMIT 10;