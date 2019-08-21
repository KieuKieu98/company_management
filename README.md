# htactive-insite

##### Adding and seeding the data into database

- Run **composer artisan migrate** to adding fields into database
- Run **composer artisan db:seed** to seeding data into the fields

##### Install JWT Authentication

- _Step 1_: Run **composer require tymon/jwt-auth:dev-develop --prefer-source** to install some packages in Laravel JWT

- _Step 2_: Run **php artisan jwt:secret** to set the key in .env file

##### Set Expired time for JWT token 10080 minutes

- add **JWT_TTL=10080** to .env and run **composer dump-autoload**
