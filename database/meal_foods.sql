CREATE TABLE meal_foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);