\c g19_restaurants

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS restaurants;


CREATE TABLE restaurants(
  restaurant_id serial PRIMARY KEY,
  name varchar(255),
  city varchar(255),
  state varchar(255),
  cuisine varchar(255),
  description text,
  image text
);

CREATE TABLE reviews(
  review_id serial PRIMARY KEY,
  first_name text DEFAULT null,
  last_name text DEFAULT null,
  date text,
  review text DEFAULT null,
  rating decimal DEFAULT 0,
  res_id integer REFERENCES restaurants(restaurant_id)
);

INSERT INTO restaurants(name,city,state,cuisine,description, image)
VALUES
('Torchys Tacos', 'Denver', 'CO', 'Mexican', 'Who says you need a business plan to start a taco joint? With a head full of ideas and a slight ache from partying all summer, Michael Rypka left his fancy executive chef job to chase his dreams. He soon found them in Austin with a newly acquired food trailer and a red Vespa scooter. A house was mortgaged. Credit cards were maxed out. And in 2006, Torchys Tacos opened on Bouldin Creek at South 1st.', '/images/mexican.png'),
('Plan B Burger Bar', 'West Hartford', 'CT', 'American', 'So we had this idea. That food can bring people together in a bunch of different ways. Neighbors with neighbors. Locals with local ingredients. And bourbon lovers with bourbons worth oving. In 2006, our idea became;b -- Burgers -- Beer -- Bourbon.', '/images/burger.png'),
('Panzano', 'Denver', 'CO', 'Italian', '“Chi mangia bene, vive bene”: Those who eat well, live well. That’s our motto at Panzano in downtown Denver, where the Northern Italian cooking of Chef Elise Wiggins has garnered accolades that are stacked up a mile high. While the menu reflects the flavors of far-off Italy, Panzano’s organic and sustainable ingredients come from close to home, and the restaurant’s warm and lively atmosphere is beloved by diners and critics alike.', '/images/italian.png'),
('Number 1 China Buffet', 'Carmel', 'IN', 'Chinese', 'This place is really cheap. And pretty OK. There have been some curious happenings regarding possible food poisoning and maybe rats tales being put into the foo young, but for the price, what are you gonna do. I have not heard of anyone dying from the food.', '/images/thai.jpg'),
('Pho Bac', 'Seattle', 'WA', 'Vietnamese', 'pho ( pronounced “fuh” ) is the national dish of Vietnam. The art of making a hot, steaming bowl of pho lies in the broth. At Pho Bac Restaurant, we simmer beef bone marrows with our own special spices for ten hours to produce our aromatic and savory beef broth. Silky rice noodles, slices of rare strip loin, slow cooked brisket, green onions, fresh cilantro, and other garnishes are combined to provide a delectably robust meal.', '/images/pho.jpg'),
('Sanchos Mexican Restaurant', 'Boulder', 'CO', 'Mexican', 'Sancho’s Mexican was founded by local business entrepreneur Shawn Camden and his team of expert cooks from Mexico: Jose Serna, Arturo Sanchez, and Jesus. We work as a team to come up with the tastiest and most authentic Mexican food in Boulder. We guarantee fresh tasting food as everything is made from scratch with the best quality ingredients. Sancho’s Mexican is best known for its authentic style street food, namely our tacos, tortas, and gorditas and our freshly made signature salsas. If you miss the authenticity in the word “Mexican,” then you will find it once again at Sancho’s Mexican. It’s the real deal!', '/images/mexican.png');

INSERT INTO reviews(first_name, last_name, date, review, rating, res_id)
VALUES
('Hoshi', 'Cat', '2017-02-07', 'This place was the cats meow', '9.9', 1),
('Astro', 'Beans', '2000-01-23', 'This place was OK', '5.3', 1),
('Hoshi', 'Cat', '2017-02-07', 'This place was the cats meow', '9.9', 2),
('Astro', 'Beans', '2000-01-23','This place was OK', '5.3', 2),
('Hoshi', 'Cat', '2017-02-07', 'This place was the cats meow', '9.9', 3),
('Astro', 'Beans', '2000-01-23','This place was OK', '5.3', 3),
('Hoshi', 'Cat', '2017-02-07', 'This place was the cats meow', '9.9', 4),
('Astro', 'Beans', '2000-01-23','This place was OK', '5.3', 4),
('Hoshi', 'Cat', '2017-02-07', 'This place was the cats meow', '9.9', 5),
('Astro', 'Beans', '2000-01-23','This place was OK', '5.3', 5),
('Hoshi', 'Cat', '2017-02-07', 'This place was the cats meow', '9.9', 6),
('Astro', 'Beans', '2000-01-23','This place was OK', '5.3', 6);
