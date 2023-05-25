# -*- coding: utf-8 -*-
"""
Created on Sat Jul 25 13:34:18 2020

@author: hp
"""
import textwrap

import pymysql

conn = pymysql.connect(
    host="kurbag-database.cvcoj4rml3kh.eu-north-1.rds.amazonaws.com",  # endpoint link
    port=3306,  # 3306
    user="mrkty",  # admin
    password="12345678",  # adminadmin
    db="kurbagdb",  # test
)


def create_tables():
    # Table Creation
    cursor = conn.cursor()
    create_tables = textwrap.dedent("""
            CREATE TABLE IF NOT EXISTS User
            (
                user_id int AUTO_INCREMENT,
                mail_addr varchar(50),
                password varchar(20) NOT NULL,
                phone_no varchar(20),
                about_info varchar(150),
                profile_pic varchar(128),
                bg_pic varchar(128),
                PRIMARY KEY (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Admin
            (
                admin_id int AUTO_INCREMENT,
                admin_mail varchar(50),
                admin_password varchar(20) NOT NULL,
                a_name varchar(20),
                a_last_name varchar(20),
                PRIMARY KEY (admin_id)
            );
            
            CREATE TABLE IF NOT EXISTS Event (
                e_id int,
                e_name varchar(20),
                organizer int,
                cover_photo varchar(128),
                platform varchar(20),
                e_start_date DATE,
                e_end_date DATE,
                e_limit INT,
                e_link varchar(30),
                e_content TEXT,
                e_timestamp TIMESTAMP,
                e_speakers TEXT,
                PRIMARY KEY (e_id),
                FOREIGN KEY (organizer) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Post (
                user_id int,
                p_id int,
                p_title varchar(20),
                p_content TEXT,
                p_timestamp TIMESTAMP,
                p_like_count INT,
                p_com_count INT,
                PRIMARY KEY (user_id, p_id),
                INDEX (p_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Person
            (
                user_id int,
                first_name varchar(20),
                last_name varchar(20),
                birth_date DATE,
                gender varchar(20),
                connections INT,
                e_id integer,
                contacted_id int,
                liked_post int,
                works_for int,
                since DATE,
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id),
                FOREIGN KEY (e_id) REFERENCES Event(e_id),
                FOREIGN KEY (contacted_id) REFERENCES User (user_id),
                FOREIGN KEY (liked_post) REFERENCES Post(p_id),
                FOREIGN KEY (works_for) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Regular_User
            (
                user_id int,
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User(user_id) 
            );
            
            CREATE TABLE IF NOT EXISTS Recruiter
            (
                user_id int,
                org_id int,
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id),
                FOREIGN KEY (org_id) REFERENCES User (user_id) 
            );
            
            CREATE TABLE IF NOT EXISTS Career_Expert (
                user_id int,
                certificate varchar(128),
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Tag (
                tag_name varchar(20),
                category varchar(20),
                popularity_index INT,
                PRIMARY KEY (tag_name)
            );
            
            CREATE TABLE IF NOT EXISTS Skill (
                s_id int AUTO_INCREMENT,
                s_lvl varchar(20),
                s_name varchar(20),
                user_id int,
                PRIMARY KEY (s_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Job_Opening (
                j_id int,
                s_id int,
                j_desc varchar(250),
                j_title varchar(50),
                j_type varchar(20),
                j_mode varchar(20),
                due_date_apply DATE,
                j_timestamp TIMESTAMP,
                recruiter_id int,
                PRIMARY KEY (s_id, j_id),
                FOREIGN KEY (s_id) REFERENCES Skill (s_id),
                FOREIGN KEY (recruiter_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Blog_Post (
                user_id int,
                b_id int,
                b_title varchar(20),
                b_content TEXT,
                b_summary TEXT,
                b_cover varchar(128),
                b_timestamp TIME,
                b_like_count INT,
                b_com_count INT,
                PRIMARY KEY (user_id, b_id),
                INDEX (b_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Comment (
                user_id int,
                c_id int,
                b_id int,
                c_content varchar(512),
                c_timestamp TIME,
                subc_id int,
                PRIMARY KEY (user_id, c_id, b_id),
                INDEX (c_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id),
                FOREIGN KEY (b_id) REFERENCES Blog_Post (b_id),
                FOREIGN KEY (subc_id) REFERENCES Comment (c_id)
            );
            
            CREATE TABLE IF NOT EXISTS Message (
                m_id int AUTO_INCREMENT,
                sender_id int NOT NULL,
                receiver_id int NOT NULL,
                m_content TEXT,
                m_timestamp TIMESTAMP,
                m_status BOOLEAN,
                PRIMARY KEY (m_id, sender_id, receiver_id),
                FOREIGN KEY (sender_id) REFERENCES User (user_id),
                FOREIGN KEY (receiver_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Organization (
                user_id int,
                org_name varchar(20),
                size INT,
                location varchar(100),
                website varchar(64),
                org_type varchar(10),
                num_followers INT,
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Company (
                user_id int,
                c_industry varchar(20),
                c_type varchar(20),
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Institution (
                user_id int,
                i_ranking INT,
                i_type varchar(20),
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS CV_Component (
                user_id int,
                exp_id int,
                active BOOLEAN,
                description TEXT,
                location varchar(20),
                end_date DATE,
                start_date DATE,
                PRIMARY KEY (user_id, exp_id),
                INDEX (exp_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );
                
            CREATE TABLE IF NOT EXISTS Work_Experience (
                work_exp_id int,
                exp_id int,
                work_mode varchar(20),
                work_type varchar(20),
                role varchar(20),
                profession varchar(20),
                job_end_date DATE,
                job_start_date DATE,
                org_id int,
                PRIMARY KEY (exp_id, work_exp_id),
                FOREIGN KEY (exp_id) REFERENCES CV_Component (exp_id),
                FOREIGN KEY (org_id) REFERENCES User (user_id)
            );
            
            CREATE TABLE IF NOT EXISTS Education (
                edu_id int,
                exp_id int,
                gpa INT,
                dept varchar(20),
                degree varchar(20),
                edu_end_date DATE,
                edu_start_date DATE,
                inst_id int,
                PRIMARY KEY (edu_id, exp_id),
                FOREIGN KEY (exp_id) REFERENCES CV_Component (exp_id),
                FOREIGN KEY (inst_id) REFERENCES User (user_id)
            );
    """)

    # Split the create_table string into individual CREATE TABLE statements
    create_statements = create_tables.split(';')

    # Execute each CREATE TABLE statement
    for statement in create_statements:
        # Skip empty statements
        if statement.strip():
            print(statement)
            cursor.execute(statement)

    conn.commit()


def get_cursor():
    return conn.cursor()


def login(email, password):
    cur = conn.cursor()
    cur.execute("SELECT * FROM User WHERE mail_addr = %s AND password = %s", (email, password))
    result = cur.fetchone()  # Retrieve the first matching row

    if result:
        # Login successful
        user_id = result[0]  # Assuming the user_id is the first column in the User table
        # Perform any additional actions or return the user_id as needed
        return user_id
    else:
        # Login failed
        return None


def insert_details(name, email, comment, gender):
    cur = conn.cursor()
    cur.execute("INSERT INTO User (name,email,comment,gender) VALUES (%s,%s,%s,%s)", (name, email, comment, gender))
    conn.commit()


def get_details():
    cur = conn.cursor()
    cur.execute("SELECT *  FROM Person")
    details = cur.fetchall()
    return details
