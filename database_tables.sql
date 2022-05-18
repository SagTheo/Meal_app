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

INSERT INTO foods(name, calories, protein, carbs, sugar, fat, saturatedFat, fiber)
VALUES ('almond butter', 625, 22.5, 5.6, 5.6, 55.2, 4.6, 8)
;

INSERT INTO foods(name, calories, protein, carbs, sugar, fat, saturatedFat, fiber)
VALUES ('peanuts', 567, 26, 16, 4.7, 49, 6.3, 8.5),
       ('pasta', 371, 13, 75, 2.7, 1.5, null, 3.2),
       ('eggs', 143, 13, null, null, 9.5, 3.1, null),
       ('chicken', 143, 17, null, null, 8.1, 2.3, null),
       ('turkey', 148, 20, null, null, 7.7, 2, null),
       ('beef', 198, 19, null, null, 13, 5.3, null),
       ('carrots', 41, null, 9.6, 4.7, null, null, 2.8),
       ('tomatoes', 18, null, 3.9, 2.6, null, null, 2.6),
       ('apples', 52, null, 14, 10, null, null, 2.4)
;