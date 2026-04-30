CREATE DATABASE academic_city_trade;

USE academic_city_trade;



CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(100),
email VARCHAR(100) UNIQUE,
password VARCHAR(100),
skills_offered TEXT,
skills_needed TEXT,
role VARCHAR(20) DEFAULT 'student',
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE listings(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
title VARCHAR(150),
description TEXT,
category VARCHAR(50),
status VARCHAR(30) DEFAULT 'Available',
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(user_id) REFERENCES users(id)
);



CREATE TABLE requests(
id INT AUTO_INCREMENT PRIMARY KEY,
listing_id INT,
sender_id INT,
status VARCHAR(30) DEFAULT 'Pending',
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(listing_id) REFERENCES listings(id),
FOREIGN KEY(sender_id) REFERENCES users(id)
);



CREATE TABLE messages(
id INT AUTO_INCREMENT PRIMARY KEY,
sender_id INT,
receiver_id INT,
message_text TEXT,
date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(sender_id) REFERENCES users(id),
FOREIGN KEY(receiver_id) REFERENCES users(id)
);



CREATE TABLE notifications(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
text_message TEXT,
seen VARCHAR(10) DEFAULT 'No',
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(user_id) REFERENCES users(id)
);



CREATE TABLE reports(
id INT AUTO_INCREMENT PRIMARY KEY,
listing_id INT,
reason TEXT,
status VARCHAR(20) DEFAULT 'Open',
date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(listing_id) REFERENCES listings(id)
);