CREATE DATABASE local_db;
ALTER TABLE postcodes ALTER COLUMN id DROP DEFAULT;

CREATE TABLE postcodes(
  id INTEGER PRIMARY KEY,
  postcode VARCHAR(255),
  lon DECIMAL(9, 6),
  lat DECIMAL(9, 6),
  postcode_extension_distance_group VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
