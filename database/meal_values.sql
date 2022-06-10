CREATE TABLE meal_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calories INT,
    protein INT,
    carbs INT,
    sugar INT,
    fat INT,
    saturatedFat INT,
    fiber INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);