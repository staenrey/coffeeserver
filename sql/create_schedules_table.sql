DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  day_of_week SMALLINT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);