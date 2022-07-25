CREATE TABLE users (
    -- id BINARY(16) PRIMARY KEY, 
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

-- To replace auto-increment id by a uuid
ALTER TABLE users MODIFY COLUMN id BINARY(16);


-- When deploying the app:
CREATE TABLE users (
    id BINARY(16) PRIMARY KEY, 
    email VARCHAR(255),
    password VARCHAR(255)
);