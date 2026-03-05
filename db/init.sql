
CREATE DATABASE harjoitus;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  role VARCHAR(20)
);

ALTER TABLE Users ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';

CREATE TABLE diaryentries (
  entry_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  mood VARCHAR(50),
  weight DECIMAL(5,2),
  sleep_hours INT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



CREATE TABLE dietplans (
  diet_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  target_calories INT NOT NULL,
  target_weight DECIMAL(5,2) NOT NULL,
  diet_started DATE NOT NULL,
  diet_ends DATE,
  days_in_diet INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_dietplans_user
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE dailyhealthstats (
  stat_id INT AUTO_INCREMENT PRIMARY KEY,
  calories_eaten INT NOT NULL,
  calories_used INT NOT NULL,
  steps INT NOT NULL,
  weight_today DECIMAL(5,2) NOT NULL,
  entry_date DATE NOT NULL,
  mood VARCHAR(50),
  weight DECIMAL(5,2),
  sleep_hours INT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_daily_stats_user
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO dietplans
(user_id, target_calories, target_weight, diet_started, diet_ends, days_in_diet)
VALUES
(1, 2200, 75.00, '2026-01-01', '2026-03-01', 60),
(2, 2000, 80.00, '2026-01-15', NULL, NULL);

INSERT INTO dailyhealthstats
(user_id, calories_eaten, calories_used, steps, weight_today)
VALUES
(1, 2300, 2600, 8500, 78.20),
(1, 2100, 2400, 10500, 77.90),
(2, 1950, 2100, 6500, 82.10),
(2, 2050, 2000, 7200, 82.00);


SELECT d.*, u.username FROM users d
JOIN users u on u.user_id = d.user_id
WHERE u.user_name LIKE '%mi%';

SELECT stat_id, user_id, created_at
FROM dailyhealthstats
WHERE user_id = 1
ORDER BY created_at DESC;

UPDATE dailyhealthstats
SET calories_eaten = 2100,
  calories_used = 2600,
  steps = 11000,
  weight_today = 77.50
WHERE user_id = 1
AND DATE(created_at) = '2026-01-26';

SELECT * FROM users;

SELECT * from dailyhealthstats;
