-- SELECT properties.* and property_ratings.avg(property_reviews.rating) as avg_rating
-- FROM properties table
-- JOIN property_reviews where property_id and properties.id match
-- (WHERE clause must go here for proper syntax) filter for city of vancouver use wildcards to bypass spelling discrepencies
-- GROUP BY is needed here so group by property.id
-- filter for rating >= 4, because its an aggregate, must use use HAVING and be after the GROUP BY for proper syntax
-- ORDER BY the prices (ascending)
-- LIMIT table to 10 rows;

SELECT properties.*, AVG(property_reviews.rating) AS avg_rating
FROM properties
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE properties.city LIKE '%ancouve%'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY properties.cost_per_night
LIMIT 10;