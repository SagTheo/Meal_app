CREATE TABLE meal_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Altering commands to delete everything related to a user when it is removed from database
ALTER TABLE meal_user DROP FOREIGN KEY meal_user_ibfk_1;
ALTER TABLE meal_user ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE; 
 
-- To change type of user_id column as the type of the column it references in table users has been changed
ALTER TABLE meal_user MODIFY COLUMN user_id BINARY(16);

-- When deploying the app
CREATE TABLE meal_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BINARY(16),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
);