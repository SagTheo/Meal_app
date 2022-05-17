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

INSERT INTO foods(name, calories, protein, carbs, sugar, fat, saturatedFat, fiber)
VALUES ('almonds', 608, 23.6, 5.6, 4, 52.9, 4.3, 7.6),
       ('salmon', 168, 22, null, null, 8.9, 1.5, null),
       ('peanut butter', 625, 29, 12, 5.1, 50, 9.7, 5.5),
       ('couscous', 365, 12, 73, 3, 2, null, 3.4)
; 