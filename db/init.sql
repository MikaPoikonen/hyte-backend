
CREATE DATABASE harjoitus;
USE harjoitus;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_level VARCHAR(10) DEFAULT 'regular'
);

CREATE TABLE dailyhealthstats (
  stat_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
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
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO dailyhealthstats
(user_id, calories_eaten, calories_used, steps, weight_today, entry_date, mood, weight, sleep_hours, notes)
VALUES
(1, 2300, 2600, 8500, 78.20, '2026-03-01', 'hyvä', 80.00, 7, 'Kevyt treeni ja iltakävely'),
(1, 2100, 2400, 10500, 77.90, '2026-03-02', 'energinen', 80.00, 8, 'Juoksulenkki aamulla'),
(1, 2500, 2300, 9000, 77.80, '2026-03-03', 'ok', 80.00, 6, 'Normaali työpäivä, vähän liikuntaa'),

(2, 1950, 2100, 6500, 82.10, '2026-03-01', 'väsynyt', 84.00, 5, 'Huono yöuni'),
(2, 2050, 2000, 7200, 82.00, '2026-03-02', 'parempi', 84.00, 7, 'Kävelylenkki illalla'),
(2, 2200, 2150, 8000, 81.90, '2026-03-03', 'hyvä', 84.00, 8, 'Hyvä päivä ja paljon liikuntaa');


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
