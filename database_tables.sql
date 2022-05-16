CREATE TABLE foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    calories INT,
    protein INT,
    carbs INT,
    sugar INT,
    fat INT,
    saturatedFat INT,
    fiber INT
);

INSERT INTO foods(name, calories, protein, carbs, sugar, fat, saturatedFat, fiber) 
VALUES ('white rice', 358, 6, 79, null, 1, null, 2.8);

INSERT INTO foods(name, calories, protein, carbs, sugar, fat, saturatedFat, fiber) 
VALUES ('potato', 75, 5, 50, null, null, null, 3),
       ('lentils', 352, 25, 63, 2, 1, null, 11),
       ('oats', 374, 11, 60, 1, 8, 1.5, 9)
;