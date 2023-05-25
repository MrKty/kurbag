CREATE DATABASE IF NOT EXISTS kurbagdb;
USE kurbagdb;

CREATE TABLE IF NOT EXISTS User
(
    id       int AUTO_INCREMENT,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    email    varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS TaskType
(
    type varchar(100),
    PRIMARY KEY (type)
);


CREATE TABLE IF NOT EXISTS Task
(
    id            int AUTO_INCREMENT,
    title         varchar(100),
    description   text,
    status        varchar(100),
    deadline      datetime,
    creation_time datetime,
    done_time     datetime,
    user_id       int,
    task_type     varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY (task_type) REFERENCES TaskType (type),
    FOREIGN KEY (user_id) REFERENCES User (id)
);

INSERT INTO TaskType
VALUES ('Health'),
       ('Job'),
       ('Lifestyle'),
       ('Family'),
       ('Hobbies');

INSERT INTO User(id, password, username, email)
VALUES (1, 'pass123', 'user1', 'user1@example.com');

INSERT INTO User(id, password, username, email)
VALUES (2, 'password', 'user2', 'user2@example.com');



INSERT INTO Task (id, title, description, status, deadline, creation_time, done_time, user_id, task_type)
VALUES (1, 'Go for a walk', 'Walk for at least 30 mins', 'Done', '2023-03-20 17:00:00', '2023-03-15 10:00:00',
        '2023-03-20 10:00:00', 1, 'Health');

INSERT INTO Task (id, title, description, status, deadline, creation_time, done_time, user_id, task_type)
VALUES (2, 'Clean the house', 'Clean the whole house', 'Done', '2023-03-18 12:00:00', '2023-03-14 09:00:00',
        '2023-03-18 17:00:00', 1, 'Lifestyle');

INSERT INTO Task (id, title, description, status, deadline, creation_time, user_id, task_type)
VALUES (3, 'Submit report', 'Submit quarterly report', 'Todo', '2023-04-12 17:00:00', '2023-03-21 13:00:00', 1, 'Job');

INSERT INTO Task (id, title, description, status, deadline, creation_time, user_id, task_type)
VALUES (4, 'Call Mom', 'Call Mom and wish her', 'Todo', '2023-04-06 11:00:00', '2023-03-23 12:00:00', 1, 'Family');

INSERT INTO Task (id, title, description, status, deadline, creation_time, done_time, user_id, task_type)
VALUES (5, 'Gym workout', 'Do weight training for an hour', 'Done', '2023-03-19 14:00:00', '2023-03-12 10:00:00',
        '2023-03-19 11:00:00', 1, 'Health');



INSERT INTO Task (id, title, description, status, deadline, creation_time, user_id, task_type)
VALUES (6, 'Play guitar', 'Learn new song for an hour', 'Todo', '2023-04-05 20:00:00', '2023-03-20 14:00:00', 2,
        'Hobbies');

INSERT INTO Task (id, title, description, status, deadline, creation_time, done_time, user_id, task_type)
VALUES (7, 'Book flights', 'Book flights for summer vacation', 'Done', '2023-03-16 09:00:00', '2023-03-13 13:00:00',
        '2023-03-16 11:00:00', 2, 'Lifestyle');

INSERT INTO Task (id, title, description, status, deadline, creation_time, user_id, task_type)
VALUES (8, 'Write a blog post', 'Write about recent project', 'Todo', '2023-04-11 17:00:00', '2023-03-22 09:00:00', 2,
        'Job');

INSERT INTO Task (id, title, description, status, deadline, creation_time, user_id, task_type)
VALUES (9, 'Grocery shopping', 'Buy groceries for the week', 'Todo', '2023-04-05 18:00:00', '2023-03-31 10:00:00', 2,
        'Family');

INSERT INTO Task (id, title, description, status, deadline, creation_time, done_time, user_id, task_type)
VALUES (10, 'Painting', 'Paint a landscape for 2 hours', 'Done', '2023-03-23 15:00:00', '2023-03-18 14:00:00',
        '2023-03-23 16:00:00', 2, 'Hobbies');
