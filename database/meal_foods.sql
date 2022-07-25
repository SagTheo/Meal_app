CREATE TABLE meal_foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    meal_id INT,
    FOREIGN KEY (meal_id) REFERENCES meal_user (id)
);

-- To add ON DELETE CASCADE instruction (Todo.txt->Issue#4)
ALTER TABLE meal_foods DROP FOREIGN KEY meal_foods_ibfk_1;

ALTER TABLE meal_foods ADD FOREIGN KEY (meal_id) REFERENCES meal_user(id) ON DELETE CASCADE; 

-- When deploying the app
CREATE TABLE meal_foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    meal_id INT,
    FOREIGN KEY (meal_id) REFERENCES meal_user (id) ON DELETE CASCADE:
);