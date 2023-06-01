# -*- coding: utf-8 -*-
"""
Created on Sat Jul 25 13:34:18 2020

@author: hp
"""
import textwrap

import pymysql

conn = pymysql.connect(
    host="kurbagdb.crhbzjj4nyp2.us-east-1.rds.amazonaws.com",  # endpoint link
    port=3306,  # 3306
    user="mrkty",  # admin
    password="12345678",  # adminadmin
    db="kurbagdb",  # test
)


def create_tables():
    # Table Creation
    cursor = conn.cursor()
    create_tables_entity = textwrap.dedent("""
            CREATE TABLE IF NOT EXISTS User
            (
                user_id int AUTO_INCREMENT,
                mail_addr varchar(50),
                password varchar(100) NOT NULL,
                phone_no varchar(20),
                about_info varchar(150),
                profile_pic varchar(128),
                bg_pic varchar(128),
                user_type int,
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
                e_id int AUTO_INCREMENT,
                e_name varchar(20),
                organizer_id int,
                cover_photo varchar(128),
                platform varchar(20),
                e_start_date datetime,
                e_end_date datetime,
                e_limit INT,
                e_link varchar(30),
                e_content TEXT,
                e_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                e_speakers TEXT,
                PRIMARY KEY (e_id),
                FOREIGN KEY (organizer_id) REFERENCES User (user_id)
            );

            CREATE TABLE IF NOT EXISTS Post (
                user_id int,
                p_id int AUTO_INCREMENT,
                p_title varchar(20),
                p_content TEXT,
                p_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                p_like_count INT DEFAULT 0,
                p_com_count INT DEFAULT 0,
                PRIMARY KEY (p_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );

            CREATE TABLE IF NOT EXISTS Person
            (
                user_id int,
                first_name varchar(20),
                last_name varchar(20),
                current_country varchar(20),
                current_city varchar(20),
                current_position varchar(20),
                current_sector varchar(20),
                birth_date DATE,
                gender varchar(20),
                connections INT,
                liked_post int,
                works_for int,
                works_since DATE,
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id),
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
                expert_in_tag char(20),
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );

            CREATE TABLE IF NOT EXISTS Tag (
                tag_name varchar(20),
                PRIMARY KEY (tag_name)
            );

            CREATE TABLE IF NOT EXISTS Skill (
                s_id int AUTO_INCREMENT,
                s_lvl int,
                s_name varchar(20),
                PRIMARY KEY (s_id)
            );

            CREATE TABLE IF NOT EXISTS Job_Opening (
                j_id int AUTO_INCREMENT,
                j_desc varchar(250),
                j_title varchar(50),
                j_type varchar(20),
                j_organization varchar(20),
                j_location varchar(20),
                j_mode varchar(20),
                due_date_apply datetime,
                j_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                recruiter_id int,
                PRIMARY KEY (j_id),
                FOREIGN KEY (recruiter_id) REFERENCES User (user_id)
            );

            CREATE TABLE IF NOT EXISTS Blog_Post (
                b_id int AUTO_INCREMENT,
                owner_id int,
                b_title varchar(20),
                b_content TEXT,
                b_summary TEXT,
                b_cover varchar(128),
                b_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                b_tag   char(20),
                b_like_count INT DEFAULT 0,
                b_com_count INT DEFAULT 0,
                PRIMARY KEY (b_id),
                FOREIGN KEY (owner_id) REFERENCES Career_Expert (user_id)
            );

            CREATE TABLE IF NOT EXISTS Comment (
                c_id int AUTO_INCREMENT,
                owner_id int,
                root_blog_id int,
                root_post_id int,
                c_content varchar(512),
                c_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (c_id),
                FOREIGN KEY (owner_id) REFERENCES User (user_id),
                FOREIGN KEY (root_blog_id) REFERENCES Blog_Post (b_id),
                FOREIGN KEY (root_post_id) REFERENCES Post (p_id)
            );

            CREATE TABLE IF NOT EXISTS Message (
                m_id int AUTO_INCREMENT,
                sender_id int NOT NULL,
                receiver_id int NOT NULL,
                m_content TEXT,
                m_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                m_status BOOLEAN,
                PRIMARY KEY (m_id),
                FOREIGN KEY (sender_id) REFERENCES Person (user_id),
                FOREIGN KEY (receiver_id) REFERENCES Person (user_id)
            );

            CREATE TABLE IF NOT EXISTS Organization (
                user_id int,
                org_name varchar(20),
                size varchar(20),
                location varchar(100),
                website varchar(64),
                num_followers INT,
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES User (user_id)
            );

            CREATE TABLE IF NOT EXISTS Company (
                user_id int,
                c_industry varchar(20),
                c_type varchar(20),
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES Organization (user_id)
            );

            CREATE TABLE IF NOT EXISTS Institution (
                user_id int,
                i_ranking INT,
                i_type varchar(20),
                PRIMARY KEY (user_id),
                FOREIGN KEY (user_id) REFERENCES Organization (user_id)
            );

            CREATE TABLE IF NOT EXISTS CV_Component (
                user_id int,
                exp_id int AUTO_INCREMENT,
                active BOOLEAN,
                description TEXT,
                location varchar(20),
                end_date DATE,
                start_date DATE,
                PRIMARY KEY (user_id, exp_id),
                INDEX (exp_id),
                FOREIGN KEY (user_id) REFERENCES Person (user_id)
            );

            CREATE TABLE IF NOT EXISTS Work_Experience (
                user_id int,
                exp_id int,
                work_mode varchar(20),
                work_type varchar(20),
                role varchar(20),
                profession varchar(20),
                job_end_date DATE,
                job_start_date DATE,
                org_name varchar(100),
                PRIMARY KEY (user_id, exp_id),
                FOREIGN KEY (user_id) REFERENCES Person (user_id),
                FOREIGN KEY (exp_id) REFERENCES CV_Component (exp_id)
            );

            CREATE TABLE IF NOT EXISTS Education (
                user_id int,
                exp_id int,
                gpa INT,
                dept varchar(20),
                degree varchar(20),
                edu_end_date DATE,
                edu_start_date DATE,
                inst_id int,
                PRIMARY KEY (user_id, exp_id),
                FOREIGN KEY (exp_id) REFERENCES CV_Component (exp_id),
                FOREIGN KEY (user_id) REFERENCES Person (user_id),
                FOREIGN KEY (inst_id) REFERENCES Institution (user_id)
            );

            CREATE TABLE IF NOT EXISTS Certificate (
                cert_id int AUTO_INCREMENT,
                applicant_id int,
                cert_url varchar(128),
                cert_name varchar(128),
                PRIMARY KEY (cert_id),
                FOREIGN KEY (applicant_id) REFERENCES Person (user_id)
            );

        """)

    create_tables_relation = textwrap.dedent("""

        CREATE TABLE IF NOT EXISTS Requires(
        	s_id    int,
            j_id    int,
            PRIMARY KEY (s_id, j_id),
            FOREIGN KEY (s_id) REFERENCES Skill(s_id),
            FOREIGN KEY (j_id) REFERENCES Job_Opening(j_id)
        );

        CREATE TABLE IF NOT EXISTS Applies_Job(
            user_id         int,
            j_id            int,
            resume 	        varchar(128),
            cover_letter 	varchar(128),
            address 	    varchar(100),
            photo 		    varchar(128),
            skills 		    TEXT,
            p_start_date 	DATE,
            p_end_date 	    DATE,
            PRIMARY KEY (user_id, j_id),
            FOREIGN KEY (user_id) REFERENCES Person(user_id),
            FOREIGN KEY (j_id) REFERENCES Job_Opening(j_id)
        );
        
        CREATE TABLE IF NOT EXISTS Follows_Tag(
        	user_id           INT,
            tag_name          char(20),
            PRIMARY KEY (user_id, tag_name),
            FOREIGN KEY (user_id) REFERENCES Person(user_id),
            FOREIGN KEY (tag_name) REFERENCES Tag(tag_name) 
        );
        
        CREATE TABLE IF NOT EXISTS Likes_Blog(
        	b_id              INT,
            user_id           INT,
            PRIMARY KEY (user_id, b_id),
            FOREIGN KEY (b_id) REFERENCES Blog_Post(b_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id) 
        );
        
        CREATE TABLE IF NOT EXISTS Has_Tag_Blog(
        	c_id              	INT,
            user_id	         	INT,
            PRIMARY KEY (user_id, c_id),
            FOREIGN KEY (c_id) REFERENCES Comment(c_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id) 
        );

        CREATE TABLE IF NOT EXISTS Has_Skill(
        	s_id    INT,
            user_id INT,
            PRIMARY KEY (user_id, s_id),
            FOREIGN KEY (s_id) REFERENCES Skill(s_id),
            FOREIGN KEY (user_id) REFERENCES Person (user_id) 
        );
        
        CREATE TABLE IF NOT EXISTS Has_Proficiency(
        	tag_name            char(20),
            user_id	         	INT,
            PRIMARY KEY (user_id, tag_name),
            FOREIGN KEY (tag_name) REFERENCES Tag(tag_name),
            FOREIGN KEY (user_id) REFERENCES Career_Expert(user_id) 
        );

        CREATE TABLE IF NOT EXISTS Follows_Org(
        	org_id         	INT,
            person_id	    INT,
            PRIMARY KEY (org_id, person_id),
            FOREIGN KEY (org_id) REFERENCES Organization(user_id),
            FOREIGN KEY (person_id) REFERENCES Person(user_id) 
        );

        CREATE TABLE IF NOT EXISTS Follows_Expert(
        	expert_id         	INT,
            user_id	         	INT,
            PRIMARY KEY (expert_id, user_id),
            FOREIGN KEY (expert_id) REFERENCES Career_Expert(user_id),
            FOREIGN KEY (user_id) REFERENCES Regular_User(user_id) 
        );

        CREATE TABLE IF NOT EXISTS Has_Tag_Feed(
        	p_id         	INT,
            tag_name	    char(20),
            PRIMARY KEY (p_id, tag_name),
            FOREIGN KEY (p_id) REFERENCES Post (p_id),
            FOREIGN KEY (tag_name) REFERENCES Tag (tag_name) 
        );

        CREATE TABLE IF NOT EXISTS Used_Skill(
        	exp_id         	    INT,
            s_id	         	INT,
            PRIMARY KEY (exp_id, s_id),
            FOREIGN KEY (exp_id) REFERENCES Work_Experience (exp_id),
            FOREIGN KEY (s_id) REFERENCES Skill (s_id) 
        );

        CREATE TABLE IF NOT EXISTS Sends_Request(
        	applicant_id       	INT,
            expert_id         	INT,
            isApproved 		    BOOLEAN DEFAULT FALSE,
            date        		datetime DEFAULT CURRENT_TIMESTAMP,
            motivation_letter 	text,
            tag_name 			char(20),
            PRIMARY KEY (applicant_id),
            FOREIGN KEY (applicant_id) REFERENCES Regular_User (user_id),
            FOREIGN KEY (expert_id) REFERENCES Career_Expert (user_id) 
        );
        
        CREATE TABLE IF NOT EXISTS Connected_With(
        	person1_id        	INT,
            person2_id         	INT,
            PRIMARY KEY (person1_id, person2_id),
            FOREIGN KEY (person1_id) REFERENCES Person (user_id),
            FOREIGN KEY (person2_id) REFERENCES Person (user_id) 
        );

        CREATE TABLE IF NOT EXISTS Has_Messaged(
        	person1_id        	INT,
            person2_id         	INT,
            PRIMARY KEY (person1_id, person2_id),
            FOREIGN KEY (person1_id) REFERENCES Person (user_id),
            FOREIGN KEY (person2_id) REFERENCES Person (user_id) 
        );

        CREATE TABLE IF NOT EXISTS Likes_Post(
        	user_id        		INT,
            post_id         	INT,
            PRIMARY KEY (user_id, post_id),
            FOREIGN KEY (user_id) REFERENCES User (user_id),
            FOREIGN KEY (post_id) REFERENCES Post (p_id) 
        );
    """)

    # Split the create_table string into individual CREATE TABLE statements
    create_statements_1 = create_tables_entity.split(';')
    create_statements_2 = create_tables_relation.split(';')

    # Execute each CREATE TABLE statement
    for statement in create_statements_1:
        # Skip empty statements
        if statement.strip():
            print(statement)
            cursor.execute(statement)

    for statement in create_statements_2:
        # Skip empty statements
        if statement.strip():
            print(statement)
            cursor.execute(statement)

    conn.commit()


def populate_table():
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM Tag')
    tag = fetch_one(cursor)
    if tag:
        return

    insert_tables = textwrap.dedent("""
        INSERT INTO Tag (tag_name) VALUES ('career');
        INSERT INTO Tag (tag_name) VALUES ('job-search');
        INSERT INTO Tag (tag_name) VALUES ('workplace');
        INSERT INTO Tag (tag_name) VALUES ('technology');
        INSERT INTO Tag (tag_name) VALUES ('engineering');
        INSERT INTO Tag (tag_name) VALUES ('job-skills');
        INSERT INTO Tag (tag_name) VALUES ('education');
        INSERT INTO Tag (tag_name) VALUES ('marketing');
    """)
    # Split the create_table string into individual CREATE TABLE statements
    insert_statements = insert_tables.split(';')

    # Execute each Insert statement
    for statement in insert_statements:
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


def fetch_one(cursor):
    row = cursor.fetchone()

    if row:
        # Get the column names from the cursor description
        column_names = [desc[0] for desc in cursor.description]

        # Create a dictionary using the column names and row values
        user = dict(zip(column_names, row))
    else:
        user = None
    return user


def fetch_all(cursor):
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    users = []

    for row in rows:
        user = dict(zip(column_names, row))
        users.append(user)

    return users
