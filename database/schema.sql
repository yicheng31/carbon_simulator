-- Create tables for Carbon Footprint Simulator (SQLite Version)

DROP TABLE IF EXISTS simulation_answers;
DROP TABLE IF EXISTS simulations;
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS questions;

-- Questions Table
CREATE TABLE questions (
    id INTEGER PRIMARY KEY,
    category TEXT NOT NULL,
    icon TEXT NOT NULL,
    source_key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Options Table
CREATE TABLE options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    icon TEXT NOT NULL,
    kg REAL NOT NULL,
    badge TEXT NOT NULL,
    note TEXT NOT NULL,
    src TEXT NOT NULL,
    alt_label TEXT
);

-- Simulations (History) Table
CREATE TABLE simulations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_co2 REAL NOT NULL,
    verdict TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Simulation Answers Table for detail storage
CREATE TABLE simulation_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    simulation_id INTEGER REFERENCES simulations(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    chosen_option_label TEXT NOT NULL,
    chosen_option_kg REAL NOT NULL
);
