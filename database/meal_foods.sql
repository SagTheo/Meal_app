CREATE TABLE meal_foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    meal_id INT,
    FOREIGN KEY (meal_id) REFERENCES meal_user (id)
);