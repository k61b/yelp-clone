# Yelp Clone
This is a clone project. But it's a simple project because it was made to learn pern stack.
You can follow the [instructions](#build-setup) if you want to develop this project.

## Want to Contribute
- You can help me understand my mistakes by opening an issue.
- You can help the project develop by forking.

## Build Setup
1) Create PSQL DATABASE
````bash
CREATE DATABASE yelp-clone;
````
2) Create PSQL Main Table
````bash
CREATE TABLE places (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    place_type VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);
````
3) Create PSQL Review Table
````bash
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    place_id BIGINT NOT NULL REFERENCES places(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);
````
4) Install Packages
````bash
cd server
yarn add
yarn run dev
cd ..
cd client
yarn add
yarn run dev
````
