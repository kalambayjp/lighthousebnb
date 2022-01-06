
INSERT INTO users (name, email, password)
VALUES
  ('Peter Parker', 'pete@webslinger.net', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Thor Odinson', 'pointbreak@azgard.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Steve Rodgers', 'icandothisallday@cap.org', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
;

INSERT INTO properties (
  title,
  description,
  owner_id,
  cover_photo_url,
  thumbnail_photo_url,
  cost_per_night,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms,
  province,
  city,
  country, 
  street,
  post_code
)
VALUES 
  ('Speed lamp','description', 1, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 500, 2, 2, 4, 'British Colombia', 'Anmore', 'Canada', '513 Powov Grove', 'v7e2h8'),

  ('Blank corner', 'description', 2, 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg', 500, 2, 2, 4, 'British Colombia',  'Burnaby','Canada', '169 Nuwug Circle', 'h4d7g5'),

  ('Habit mix', 'description', 2, 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg', 500, 2, 2, 4,'British Colombia', 'Delta',  'Canada', '834 Buwmi Road', 'c6s9g6')
;

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 3, 1), ('2015-09-13', '2015-09-30', 1, 3), ('2021-10-01', '2021-10-14', 2, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 1, 5, 'message'), (3, 1, 2, 4, 'message'), (3, 2, 3, 1, 'message');