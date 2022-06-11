CREATE TABLE meal_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calories INT,
    protein INT,
    carbs INT,
    sugar INT,
    fat INT,
    saturatedFat INT,
    fiber INT,
    meal_id INT,
    FOREIGN KEY (meal_id) REFERENCES meal_user (id)
);