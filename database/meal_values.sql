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

-- To add ON DELETE CASCADE instruction (Todo.txt->Issue#4)
ALTER TABLE meal_values DROP FOREIGN KEY meal_values_ibfk_1;

ALTER TABLE meal_values ADD FOREIGN KEY (meal_id) REFERENCES meal_user(id) ON DELETE CASCADE;