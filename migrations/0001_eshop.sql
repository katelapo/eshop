-- Migration number: 0001 	 2025-06-16T05:40:48.215Z

CREATE TABLE IF NOT EXISTS eshops (
  id TEXT PRIMARY KEY,
  name TEXT,
  place TEXT,
  time INTEGER
);

INSERT INTO eshops(id, name, place, time) VALUES 
('eshop1', 'Eshop 1', 'Jakarta', strftime('%s', 'now')),
('eshop2', 'Eshop 2', 'Bandung', strftime('%s', 'now'));