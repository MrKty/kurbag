import os
from datetime import datetime

import bcrypt as bcrypt
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import rds_db as db
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app)  # Initialize Flask-CORS
mysql = MySQL(app)

# Initiate database
db.create_tables()
db.populate_table()


@app.route('/')
@app.route('/login', methods=['POST'])
def login():
    # Retrieve the login data from the request
    login_data = request.get_json()
    # Extract the email and password from the login data
    email = login_data['email']
    password = login_data['password']

    # Perform authentication logic
    cursor = db.get_cursor()
    cursor.execute('SELECT user_id, mail_addr, password, user_type FROM User WHERE mail_addr = %s', email)

    user = db.fetch_one(cursor)

    if user:
        print(password)
        print(user)
        # Compare the hashed passwords
        if bcrypt.checkpw(password.encode(), user["password"].encode()):
            message = 'Logged in successfully!'
            response = {'message': message, 'id': user['user_id'], 'userType': user['user_type']}
            return jsonify(response)

        else:
            # Passwords don't match
            # Perform further actions or return an error response
            message = "Password mismatch"
    else:
        message = 'Please enter correct email / password !'

    # Create a response object
    response = {'message': message}

    # Return the response as JSON
    return jsonify(response)


@app.route('/signup', methods=['POST'])
def signup():
    form_data = request.json  # Get the form data from the request body
    # Process the form data and perform any necessary operations (e.g., database storage, validation, etc.)

    # Assuming the form data contains the fields: name, surname, email, phone, password, day, month, year, gender
    name = form_data['name']
    surname = form_data['surname']
    email = form_data['email']
    phone = form_data['phone']
    password = form_data['password']
    day = form_data['day']
    month = form_data['month']
    year = form_data['year']
    gender = form_data['gender']

    print(name, surname, email, phone, password, day, month, year, gender)

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Perform additional operations, such as storing the data in a database
    cursor = db.get_cursor()
    cursor.execute('SELECT * FROM User WHERE mail_addr = %s', (email,))
    account = cursor.fetchone()
    if account:
        message = 'This mail is already registered!'
    else:
        try:
            # Start a transaction
            cursor.execute('START TRANSACTION')

            # Insert the user data into the User table
            cursor.execute('INSERT INTO User (mail_addr, password, phone_no, user_type) VALUES (%s, %s, %s, %s)',
                           (email, hashed_password, phone, 0))
            user_id = cursor.lastrowid
            # Insert the person data into the Person table
            birth_date = f'{year}-{month}-{day}'  # Format birth date correctly
            print(birth_date)
            cursor.execute(
                'INSERT INTO Person (user_id, first_name, last_name, birth_date, gender) VALUES (%s, %s, %s, %s, %s)',
                (user_id, name, surname, birth_date, gender))

            # Insert the person data into the Regular User table
            cursor.execute(
                'INSERT INTO Regular_User (user_id) VALUES (%s)',
                (user_id,))

            # Commit the transaction
            cursor.execute('COMMIT')

            message = 'User successfully created!'
        except:
            # Rollback the transaction if an error occurs
            cursor.execute('ROLLBACK')
            message = 'Error occurred during signup. Please try again.'

    # Create a response object
    response = {'message': message}
    print(message)
    return jsonify(response)


@app.route('/create-organization', methods=['POST'])
def create_organization():
    form_data = request.json  # Get the form data from the request body
    # Process the form data and perform any necessary operations (e.g., database storage, validation, etc.)

    org_name = form_data['organizationName']
    org_type = form_data['organizationType']
    org_size = form_data['organizationSize']
    org_address = form_data['organizationAddress']
    org_website = form_data['organizationWebsite']
    org_phone = form_data['organizationPhoneNo']
    comp_industry = form_data['companyIndustry']
    comp_type = form_data['companyType']
    ins_type = form_data['institutionType']
    org_email = form_data['email']
    org_password = form_data['password']

    if org_type == 'Company':
        user_type = 4
    else:
        user_type = 5

    # Hash the password
    hashed_password = bcrypt.hashpw(org_password.encode('utf-8'), bcrypt.gensalt())

    # Perform additional operations, such as storing the data in a database
    cursor = db.get_cursor()
    cursor.execute('SELECT * FROM User WHERE mail_addr = %s', (org_email,))
    account = cursor.fetchone()
    if account:
        message = 'This email is already registered!'
    else:
        try:
            # Start a transaction
            cursor.execute('START TRANSACTION')

            # Insert the user data into the User table
            cursor.execute(
                'INSERT INTO User (mail_addr, password, phone_no, user_type) VALUES (%s, %s, %s, %s)',
                (org_email, hashed_password, org_phone, user_type))
            user_id = cursor.lastrowid

            # Insert the organization data into the Organization table
            cursor.execute(
                'INSERT INTO Organization (user_id, org_name, size, location, website) VALUES (%s, %s, %s, %s, %s)',
                (user_id, org_name, org_size, org_address, org_website))

            if org_type == 'Company':
                # Insert the company data into the Company table
                cursor.execute(
                    'INSERT INTO Company (user_id, c_industry, c_type) VALUES (%s, %s, %s)',
                    (user_id, comp_industry, comp_type))
                message = 'Company organization successfully created!'
            elif org_type == 'Institution':
                # Insert the institution data into the Institution table
                cursor.execute(
                    'INSERT INTO Institution (user_id, i_type) VALUES (%s, %s)',
                    (user_id, ins_type))
                message = 'Institution organization successfully created!'
            else:
                # Invalid org_type
                cursor.execute('ROLLBACK')
                message = 'Invalid organization type. Please try again.'

            # Commit the transaction
            cursor.execute('COMMIT')

        except Exception as e:
            print(f"An error occurred: {str(e)}")

            # Rollback the transaction if an error occurs
            cursor.execute('ROLLBACK')
            message = 'Error occurred during organization creation. Please try again.'

    print(message)
    # Create a response object
    response = {'message': message}
    return jsonify(response)


@app.route('/career-expert-application', methods=['POST'])
def apply_career_expert():
    form_data = request.json  # Get the form data from the request body
    # Process the form data and performs any necessary operations (e.g., database storage, validation, etc.)

    # Assuming the form data contains the fields: name, surname, email, phone, password, day, month, year, gender
    selected_tag = form_data['selectedTag']
    motivation = form_data['motivation']
    certificates = form_data['selectedCertificates']
    print(selected_tag, motivation, certificates)
    print(form_data["id"])

    cursor = db.get_cursor()
    try:
        # Start a transaction
        cursor.execute('START TRANSACTION')

        cursor.execute('SELECT * FROM Tag WHERE tag_name = %s', (selected_tag,))
        tag = db.fetch_one(cursor)

        cursor.execute('INSERT INTO Sends_request (applicant_id, motivation_letter, tag_id) VALUES (%s, %s, %s)',
                       (form_data["id"], motivation, tag["tag_id"]))

        for certificate in certificates:
            cursor.execute(
                'INSERT INTO Certificate (applicant_id, cert_url) VALUES (%s, %s)',
                (form_data["id"], certificate))

        # Commit the transaction
        cursor.execute('COMMIT')

        message = 'Successfully applied!'
    except:
        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')
        message = 'Error occurred during application. Please try again.'

    # Create a response object
    response = {'message': message}
    print(message)
    return jsonify(response)


@app.route('/career-expert-modal', methods=['POST'])
def fill_career_expert_modal():
    # Create a response object
    response = {
        'motivation_letter': "motivation-letter from back-end",
        'tag_name': "tag-name from back-end",
        'certificates': [
            {
                'certificate_name': 'Certificate 1 backendCertificate 1 backendCertificate 1 backendCertificate 1 backend',
                'certificate_url': 'https://example.com/certificates/certificate1.pdf'
            },
            {
                'certificate_name': 'Certificate 2 backend',
                'certificate_url': 'https://example.com/certificates/certificate2.pdf'
            },
            {
                'certificate_name': 'Certificate 3 backend',
                'certificate_url': 'https://example.com/certificates/certificate2.pdf'
            },
            # Add more certificate entries as needed
        ]
    }

    return jsonify(response)

#Endpoint for displaying jobs.@app.route('/jobs', methods=['POST'])
@app.route('/jobs', methods=['POST'])
def get_jobs():
    response = [
        {
            "jobId": 1,
            "jobTitle": "Data Scientist",
            "companyName": "Sony",
            "location": "Istanbul, Turkey",
            "employmentType": "Full-time",
            "jobDescription": "Sony Europe Ltd. is seeking a talented and motivated Data Scientist to join our team in Istanbul, Turkey. As a Data Scientist, you will be responsible for analyzing complex datasets, developing statistical models, and providing insights to drive business decisions. The ideal candidate should have a Bachelor's Degree in Computer Science, Economics, Statistics, or a related technical discipline, along with 3-4 years of practical experience in analytical processes and statistical analysis. Proficiency in Python programming and experience with Microsoft technologies such as MS SQL Server and MS Power BI are also required. Fluency in English is essential for this role.",
            "companyLogo": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ",
            "companyFollowers": 1097845,
            "dueDateApply": "2023-06-15 00:00:00",
            "jobTimestamp": "2023-05-30 10:30:00"
        },
        {
            "jobId": 2,
            "jobTitle": "SQL Developer",
            "companyName": "Amazon",
            "location": "Ankara, Turkey",
            "employmentType": "Part-time",
            "jobDescription": "Sony Europe Ltd. is seeking a talented and motivated Data Scientist to join our team in Istanbul, Turkey. As a Data Scientist, you will be responsible for analyzing complex datasets, developing statistical models, and providing insights to drive business decisions. The ideal candidate should have a Bachelor's Degree in Computer Science, Economics, Statistics, or a related technical discipline, along with 3-4 years of practical experience in analytical processes and statistical analysis. Proficiency in Python programming and experience with Microsoft technologies such as MS SQL Server and MS Power BI are also required. Fluency in English is essential for this role.",
            "companyLogo": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ",
            "companyFollowers": 109,
            "dueDateApply": "2023-06-30 00:00:00",
            "jobTimestamp": "2023-05-30 09:45:00"
        },
        {
            "jobId": 3,
            "jobTitle": "Web Developer",
            "companyName": "Google",
            "location": "İzmir, Turkey",
            "employmentType": "Remote",
            "jobDescription": "Sony Europe Ltd. is seeking a talented and motivated Data Scientist to join our team in Istanbul, Turkey. As a Data Scientist, you will be responsible for analyzing complex datasets, developing statistical models, and providing insights to drive business decisions. The ideal candidate should have a Bachelor's Degree in Computer Science, Economics, Statistics, or a related technical discipline, along with 3-4 years of practical experience in analytical processes and statistical analysis. Proficiency in Python programming and experience with Microsoft technologies such as MS SQL Server and MS Power BI are also required. Fluency in English is essential for this role.",
            "companyLogo": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ",
            "companyFollowers": 2935,
            "dueDateApply": "2023-07-10 00:00:00",
            "jobTimestamp": "2023-05-30 09:15:00"
        }
    ]

    return jsonify(response)


# TODO Endpoint for updating profile
@app.route('/update-profile', methods=['POST'])
def update_profile():
    # Get post data from the request
    data = request.json
    cursor = db.get_cursor()
    print(data)
    try:
        # Update the profile information in the Person table
        cursor.execute('UPDATE Person SET first_name = %s, last_name = %s, current_position = %s, current_sector = %s, '
                       'current_country = %s, current_city = %s WHERE user_id = %s',
                       (data.get('firstName'), data.get('lastName'), data.get('position'), data.get('sector'),
                        data.get('country'), data.get('city'), data.get('id')))
        cursor.execute('COMMIT')

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")
        return jsonify({'message': 'Failed to update profile'}), 500

    # Return a success response
    return jsonify({'message': 'Profile updated successfully'}), 200

# Endpoint for creating a new post
@app.route('/home-create-post', methods=['POST'])
def create_post():
    # Get post data from the request
    data = request.json
    post_title = data.get('postTitle')
    post_content = data.get('postContent')
    cursor = db.get_cursor()
    p_id = None
    print(post_title, post_content)

    try:
        # Save the post to the database
        cursor.execute('INSERT INTO Post (user_id, p_title, p_content) VALUES (%s, %s, %s)',
                       (data.get('id'), post_title, post_content))
        p_id = cursor.lastrowid

        cursor.execute('COMMIT')

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")

    if p_id:
        # Return a success response
        return jsonify({'message': 'Post created successfully', 'postId': p_id}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to create post'}), 500

# Endpoint for creating a new job (by a recruiter)
@app.route('/create-job', methods=['POST'])
def create_job():
    # Get post data from the request
    data = request.json

    job_title = data.get('title')
    job_description = data.get('description')
    job_organization = data.get('organization')
    job_type = data.get('type')
    job_location = data.get('location')
    job_mode = data.get('mode')
    job_due_date = data.get('dueDate')
    job_recruiter_id = 5  # mock data for now

    job_timestamp = datetime.now()  # Current timestamp

    try:
        # Convert job_due_date to a timestamp
        due_date = datetime.strptime(job_due_date, "%Y-%m-%d")
        job_due_date_timestamp = due_date.strftime("%Y-%m-%d %H:%M:%S")

        cursor = db.get_cursor()
        j_id = None

        try:
            # Save the job opening to the database
            cursor.execute(
                'INSERT INTO Job_Opening (j_title, j_desc, j_type, j_organization, j_location, j_mode, due_date_apply, j_timestamp, recruiter_id) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
                (
                    job_title,
                    job_description,
                    job_type,
                    job_organization,
                    job_location,
                    job_mode,
                    job_due_date_timestamp,
                    job_timestamp,
                    job_recruiter_id,
                ),
            )
            j_id = cursor.lastrowid

            cursor.execute('COMMIT')

        except Exception as e:
            # Print the error message
            print(f"An error occurred: {str(e)}")

        if j_id:
            # Return a success response
            return jsonify({'message': 'Job created successfully', 'Job_id': j_id}), 200
        else:
            # Return an error response
            return jsonify({'message': 'Failed to create Job'}), 500

    except ValueError:
        # Handle the case when job_due_date is not in the expected format
        print("Invalid due date format")
        return jsonify({'message': 'Invalid due date format'}), 400




# Mockup data
posts = [
    {
        "id": 1,
        "title": "Post 1",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "timestamp": "May 21, 2023",
        "name": "John Doe",
        "likeNumber": 10,
        "commentNumber": 5
    },
    {
        "id": 2,
        "title": "Post 2",
        "content": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        "timestamp": "May 22, 2023",
        "name": "Jane Smith",
        "likeNumber": 15,
        "commentNumber": 3
    },
    {
        "id": 3,
        "title": "Post 3",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida pharetra convallis. Proin vitae semper dui. Nullam pharetra leo eu nisi commodo, at aliquam urna aliquet. Cras efficitur, erat ac tincidunt sagittis, tortor ex iaculis elit, at malesuada nisl sapien id erat. Curabitur placerat est tellus, eu placerat diam molestie ac. Nullam viverra, enim a facilisis venenatis, tellus metus consequat felis, et dictum nunc massa non tellus. Mauris tristique ipsum sed luctus placerat. Mauris elementum nisi at nisl volutpat placerat. Quisque fringilla finibus est, in hendrerit augue tempor sed. Integer tincidunt ex et velit rhoncus, sit amet aliquam est semper.",
        "timestamp": "May 23, 2023",
        "name": "Mark Johnson",
        "likeNumber": 20,
        "commentNumber": 8
    },
    {
        "id": 4,
        "title": "Post 4",
        "content": "Vestibulum consequat elit sit amet dapibus tincidunt. Suspendisse faucibus condimentum felis non facilisis. In consectetur venenatis ultrices. Donec in ex justo. Duis ac ligula vel nisi tincidunt finibus ac ut quam. Nullam nec arcu a massa iaculis lobortis. Sed venenatis fermentum neque, a suscipit ante condimentum at. Nulla facilisi.",
        "timestamp": "May 24, 2023",
        "name": "Emily Davis",
        "likeNumber": 12,
        "commentNumber": 6
    },
    {
        "id": 5,
        "title": "Post 5",
        "content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce vel sapien at magna eleifend rhoncus vitae ac enim. Nullam accumsan, sem ac varius iaculis, justo felis convallis lacus, a ultrices dolor neque sit amet est. Donec rutrum rhoncus rutrum. Fusce aliquet enim et lectus rhoncus, eu ultrices nunc varius. Aenean pulvinar tristique bibendum. Aenean sagittis urna vitae mauris finibus, id posuere odio molestie.",
        "timestamp": "May 25, 2023",
        "name": "Michael Wilson",
        "likeNumber": 18,
        "commentNumber": 7
    },
    {
        "id": 6,
        "title": "Post 6",
        "content": "Curabitur consectetur est et diam eleifend, vel facilisis ligula aliquet. Maecenas tristique est ut ligula hendrerit, sed condimentum mi fringilla. Phasellus pulvinar ex ut tincidunt euismod. In congue tristique diam, sed vulputate nisl venenatis vel. Cras vitae facilisis enim. Mauris in velit nunc. Vestibulum luctus tortor at dui consequat interdum.",
        "timestamp": "May 26, 2023",
        "name": "Sophia Anderson",
        "likeNumber": 25,
        "commentNumber": 4
    },
    {
        "id": 7,
        "title": "Post 7",
        "content": "Maecenas tincidunt justo eu dolor consectetur, ut commodo sapien volutpat. Suspendisse non felis ac risus gravida semper. Sed faucibus ipsum sed erat semper auctor. Nullam fringilla turpis sit amet erat posuere tincidunt. Suspendisse potenti. Nullam blandit vestibulum nulla ac posuere. Cras id ex ut enim dignissim aliquet ut id sem. Curabitur a arcu odio.",
        "timestamp": "May 27, 2023",
        "name": "Oliver Taylor",
        "likeNumber": 14,
        "commentNumber": 3
    },
    {
        "id": 8,
        "title": "Post 8",
        "content": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas blandit ex id scelerisque euismod. Proin non diam fringilla, vulputate elit a, euismod leo. Aenean a nibh ac neque finibus tempus et eu nibh. Sed blandit, arcu vel aliquam tempor, nisl sapien finibus magna, nec interdum ligula nunc vitae nisl.",
        "timestamp": "May 28, 2023",
        "name": "Ava Thompson",
        "likeNumber": 22,
        "commentNumber": 5
    },
    {
        "id": 9,
        "title": "Post 9",
        "content": "Nullam quis elit vel nisl fermentum eleifend. Proin at est tellus. Integer bibendum sem et nunc semper aliquam. Maecenas pellentesque nulla id facilisis dignissim. Suspendisse scelerisque, leo vel consequat mattis, leo neque laoreet magna, id consequat ex nisl nec augue. Cras dapibus rhoncus nunc, nec maximus nunc vehicula et. Duis gravida varius ipsum auctor lobortis. Vivamus sit amet laoreet nulla.",
        "timestamp": "May 29, 2023",
        "name": "William Clark",
        "likeNumber": 17,
        "commentNumber": 6
    },
    {
        "id": 10,
        "title": "Post 10",
        "content": "Sed pharetra efficitur purus, eu fringilla odio vestibulum sed. Cras sed magna finibus, aliquet tellus a, bibendum mi. Suspendisse et tempor massa. Maecenas sagittis ligula odio, non iaculis turpis scelerisque sed. Curabitur tincidunt sem nec dolor dictum pharetra. In cursus venenatis sem, id fringilla quam consectetur in. Fusce efficitur ligula sed lectus dictum, non vulputate erat semper.",
        "timestamp": "May 30, 2023",
        "name": "Emma Turner",
        "likeNumber": 20,
        "commentNumber": 7
    },
    {
        "id": 11,
        "title": "Post 11",
        "content": "Aliquam varius odio sit amet felis vulputate, ut bibendum nisi efficitur. Nam facilisis lectus sed nibh vulputate semper. Maecenas tincidunt efficitur tristique. Duis efficitur gravida tellus, vitae bibendum sem fermentum at. Nullam finibus elit id magna tristique vestibulum. Sed eu arcu faucibus, congue ipsum a, ultrices nisl. Mauris ac finibus justo. Proin in orci sem.",
        "timestamp": "May 31, 2023",
        "name": "Daniel Harris",
        "likeNumber": 15,
        "commentNumber": 4
    },
    {
        "id": 12,
        "title": "Post 12",
        "content": "Vestibulum auctor, tortor sed tincidunt faucibus, quam justo rutrum nisi, ut interdum quam nisi nec ligula. Aliquam id metus facilisis, dapibus neque non, pulvinar metus. Fusce sodales ipsum vitae commodo scelerisque. Maecenas id ullamcorper erat, sit amet placerat nisi. Mauris rhoncus, justo ac dapibus aliquet, sem nulla eleifend nisi, non tempor lorem neque et tortor.",
        "timestamp": "June 1, 2023",
        "name": "Liam Martin",
        "likeNumber": 19,
        "commentNumber": 3
    },
    {
        "id": 13,
        "title": "Post 13",
        "content": "Phasellus vel hendrerit ante. Nullam interdum, ligula a consectetur hendrerit, turpis est viverra nulla, eu hendrerit dolor elit et metus. In tincidunt eros et mauris rutrum, eu euismod metus consequat. Mauris vitae quam id turpis lacinia eleifend. Suspendisse potenti. Curabitur scelerisque quam eu enim gravida, ut tristique risus egestas. Sed luctus sem non diam interdum, sit amet accumsan velit finibus.",
        "timestamp": "June 2, 2023",
        "name": "Olivia Garcia",
        "likeNumber": 23,
        "commentNumber": 5
    },
    {
        "id": 14,
        "title": "Post 14",
        "content": "Praesent id quam nec ante egestas gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque a interdum odio. Sed auctor est at tempor porttitor. Morbi pharetra sollicitudin rutrum. Sed ultricies luctus turpis, in rhoncus enim interdum et. Nam id justo a risus laoreet feugiat. Proin ut venenatis enim, sit amet luctus velit.",
        "timestamp": "June 3, 2023",
        "name": "Noah Martinez",
        "likeNumber": 16,
        "commentNumber": 4
    },
    {
        "id": 15,
        "title": "Post 15",
        "content": "Aenean feugiat commodo luctus. In ultricies aliquet ex, in fringilla ex sollicitudin quis. Fusce ac justo nisi. Nunc ac justo urna. Integer facilisis ante vel magna consectetur, id bibendum ipsum tempor. Aliquam erat volutpat. Donec nec lorem odio. Morbi sed leo nec nisl laoreet dignissim. Suspendisse fermentum orci vel est lobortis, ac pellentesque est cursus.",
        "timestamp": "June 4, 2023",
        "name": "Isabella Robinson",
        "likeNumber": 21,
        "commentNumber": 5
    }
]

events = [
    {
        'id': 1,
        'eventName': 'Tech Conference 2023',
        'organizer': 'Tech Events Inc.',
        'coverPhoto': 'https://www.zdnet.com/a/img/resize/b875a130a720d51fc03b9ab0f2cb84fa104a0080/2020/12/18/96b7b3e9-d4a9-4b6e-ac5b-36f21ab777ff/remote-work-2021-header.jpg?auto=webp&width=1280',
        'platform': 'Virtual',
        'startDate': '2023-07-15',
        'endDate': '2023-07-17',
        'limit': 500,
        'websiteLink': 'https://example.com/event1',
        'content': 'Join us for the biggest tech conference of the year!',
        'speakers': 'John Doe, Jane Smith',
        'creationDate': '2023-06-01',
    },
    {
        'id': 2,
        'eventName': 'Marketing Summit',
        'organizer': 'Marketing Association',
        'coverPhoto': 'https://www.zdnet.com/a/img/resize/b875a130a720d51fc03b9ab0f2cb84fa104a0080/2020/12/18/96b7b3e9-d4a9-4b6e-ac5b-36f21ab777ff/remote-work-2021-header.jpg?auto=webp&width=1280',
        'platform': 'Online',
        'startDate': '2023-08-10',
        'endDate': '2023-08-12',
        'limit': 300,
        'websiteLink': 'https://example.com/event2',
        'content': 'Learn the latest marketing strategies and trends.',
        'speakers': 'Emily Johnson, Mark Thompson',
        'creationDate': '2023-07-01',
    },
    {
        'id': 3,
        'eventName': 'Art Expo 2023',
        'organizer': 'Art Events Co.',
        'coverPhoto': 'https://www.example.com/artexpo.jpg',
        'platform': 'Physical',
        'startDate': '2023-09-20',
        'endDate': '2023-09-23',
        'limit': 200,
        'websiteLink': 'https://example.com/event3',
        'content': 'Experience the world of contemporary art.',
        'speakers': 'Sarah Johnson, David Brown',
        'creationDate': '2023-08-01',
    },
    {
        'id': 4,
        'eventName': 'Startup Summit',
        'organizer': 'Startup Network',
        'coverPhoto': 'https://www.example.com/startupsummit.jpg',
        'platform': 'Virtual',
        'startDate': '2023-10-05',
        'endDate': '2023-10-06',
        'limit': 1000,
        'websiteLink': 'https://example.com/event4',
        'content': 'Connect with entrepreneurs and investors.',
        'speakers': 'Jessica Adams, Alex Wilson',
        'creationDate': '2023-09-01',
    },
    # Add more mock events here...
]


@app.route('/home-get-post', methods=['POST'])
def get_posts():
    print("here")
    p_id = int(request.json.get("p_id"))
    e_id = int(request.json.get("e_id"))
    print(p_id)
    print(e_id)

    #TODO biri tam değilse diğerinden devam edilcek
    paginated_posts = posts[p_id:p_id + 2]
    paginated_events = events[e_id:e_id + 2]

    return jsonify({'posts': paginated_posts, 'events': paginated_events}), 200


# Endpoint for creating a new event
@app.route('/home-event', methods=['POST'])
def create_event():
    # Get post data from the request
    data = request.json
    print(data)
    if not data.get("coverPhotoUrl"):
        data["coverPhotoUrl"] = "NULL"
    cursor = db.get_cursor()
    e_id = None

    try:
        # Save the event to the database
        cursor.execute(
            'INSERT INTO Event (e_name, organizer_id, cover_photo, platform, e_start_date, e_end_date, e_limit, e_link, e_content, e_speakers) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
            (data['eventTitle'], data['eventOrganizer'], data['coverPhotoUrl'], data['eventPlatform'],
             data['eventStartDate'], data['eventEndDate'], data['eventLimit'], data['eventLink'], data['eventContent'],
             ', '.join(data['eventSpeakers'])))
        e_id = cursor.lastrowid

        # Commit the transaction
        cursor.execute('COMMIT')

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")

        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')

    if e_id:
        # Return a success response
        return jsonify({'message': 'Event created successfully', 'eventId': e_id}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to create event'}), 500


applications = [
    {
        "id": 1,
        "name": "John Doe",
        "date": "2022-02-14",
        "tag": "Career",
        "photo": "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "date": "2022-02-12",
        "tag": "Career",
        "photo": "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        "id": 3,
        "name": "Bob Smith",
        "date": "2022-02-10",
        "tag": "Career",
        "photo": "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        "id": 4,
        "name": "Alice Johnson",
        "date": "2022-02-09",
        "tag": "Career",
        "photo": "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        "id": 5,
        "name": "Michael Brown",
        "date": "2022-02-08",
        "tag": "Career",
        "photo": "https://randomuser.me/api/portraits/men/5.jpg",
    },
]


@app.route('/career-expert-applications', methods=['POST'])
def send_c_e_applications():
    print("here")
    data = request.json  # Get the form data from the request body

    return jsonify({"applications": "applications"})


# Endpoint for creating a new event
@app.route('/homes-event', methods=['POST'])
def creates_event():
    # Get post data from the request
    data = request.json
    cursor = db.get_cursor()

    try:
        # Save the event to the database
        pass

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")

    if e_id:
        # Return a success response
        return jsonify({'message': 'Event created successfully', 'postId': p_id}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to create event'}), 500



@app.route('/conversations', methods=['POST'])
def fetch_conversations():
    response = [
        {
            "id": 1,
            "receiver": {
                "name": "John Doe",
                "profilePhoto": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
            },
            "time": "10:30 AM",
            "lastMessage": "Hey, how are you from back-end thooo?"
        },
        {
            "id": 2,
            "receiver": {
                "name": "Jane Smith",
                "profilePhoto": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
            },
            "time": "12:45 PM",
            "lastMessage": "Are you free this weekend?"
        },
        {
            "id": 3,
            "receiver": {
                "name": "Alex Johnson",
                "profilePhoto": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
            },
            "time": "3:20 PM",
            "lastMessage": "Can you send me the document?"
        },
        {
            "id": 4,
            "receiver": {
                "name": "Emily Brown",
                "profilePhoto": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
            },
            "time": "5:10 PM",
            "lastMessage": "Lets meet at the café."
        },
        {
            "id": 5,
            "receiver": {
                "name": "Michael Wilson",
                "profilePhoto": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
            },
            "time": "7:30 PM",
            "lastMessage": "Did you watch the latest episode?"
        },
        {
            "id": 6,
            "receiver": {
                "name": "Sophia Lee",
                "profilePhoto": "https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
            },
            "time": "9:15 PM",
            "lastMessage": "See you tomorrow!"
        }
    ]
    return jsonify(response)


@app.route('/messages', methods=['POST'])
def fetch_messages():
    response = [
        {
            "sender": 'Mert Unlu',
            "time": '14:06',
            "content": 'Ilk mesaj'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:07',
            "content": 'Ikinci mesaj'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:15',
            "content": 'Three'
        },
        {
            "sender": 'Mert Unlu',
            "time": '16:36',
            "content": '4 and the last.'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:06',
            "content": 'Ilk mesaj'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:07',
            "content": 'Ikinci mesaj'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:15',
            "content": 'Three'
        },
        {
            "sender": 'Mert Unlu',
            "time": '16:36',
            "content": '4 and the last.'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:06',
            "content": 'Ilk mesaj'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:07',
            "content": 'Did you watch the latest episode? jahsgdjhasgdhjasgdas asjdhgajshdgjahsgdasjhgd asdjhgasjhdgashjgdahjsdgs ajshdgasjhdgasjhgdjhasgd jahgsdjhgashjdgsajhgdjas jhasdgjhsagd'
        },
        {
            "sender": 'Mert Unlu',
            "time": '14:15',
            "content": 'Did you watch the latest episode? jahsgdjhasgdhjasgdas asjdhgajshdgjahsgdasjhgd asdjhgasjhdgashjgdahjsdgs ajshdgasjhdgasjhgdjhasgd jahgsdjhgashjdgsajhgdjas jhasdgjhsagd'
        },
        {
            "sender": 'Mert Unlu',
            "time": '16:36',
            "content": '4 and the last.'
        },
    ]

    return jsonify(response)


@app.route('/blogs', methods=['POST'])
def blog_page():
    data = request.json  # Get the form data from the request body
    print(data['selectedTag'])

    # Example blog data
    blogs = [
        {
            "id": 1,
            "coverPhoto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lzBSkaFUhiXlIzFFfLmtzhWF2ueFMrv4Jg&usqp=CAU",
            "title": "Blog Title 1",
            "summary": "This is the summary of Blog 1.",
            "name": "Author 1",
            "likeNumber": 10,
            "commentNumber": 5,
            "subtag": "Subtag 1"
        },
        {
            "id": 2,
            "coverPhoto": "https://example.com/cover2.jpg",
            "title": "Blog Title 2",
            "summary": "This is the summary of Blog 2.",
            "name": "Author 2",
            "likeNumber": 15,
            "commentNumber": 8,
            "subtag": "Subtag 2"
        },
        {
            "id": 3,
            "coverPhoto": "https://example.com/cover3.jpg",
            "title": "Blog Title 3",
            "summary": "This is the summary of Blog 3.",
            "name": "Author 3",
            "likeNumber": 20,
            "commentNumber": 12,
            "subtag": "Subtag 3"
        }
    ]

    return jsonify(blogs)


@app.route('/cv-pool', methods=['POST'])
def get_cv_pool():

    # Example blog data
    response = [
        {
            "name": "Mert",
            "sector": "Technology",
            "position": "Software Engineer",
            "experience": "5 years",
            "currentEmployer": "ABC Company"
        },
        {
            "name": "John",
            "sector": "Finance",
            "position": "Financial Analyst",
            "experience": "3 years",
            "currentEmployer": "XYZ Bank"
        },
        {
            "name": "Emily",
            "sector": "Marketing",
            "position": "Marketing Manager",
            "experience": "7 years",
            "currentEmployer": "Marketing Solutions Inc."
        },
        {
            "name": "David",
            "sector": "Healthcare",
            "position": "Registered Nurse",
            "experience": "10 years",
            "currentEmployer": "City Hospital"
        },
        {
            "name": "Sarah",
            "sector": "Education",
            "position": "Teacher",
            "experience": "4 years",
            "currentEmployer": "ABC School"
        },
        {
            "name": "Alex",
            "sector": "Sales",
            "position": "Sales Manager",
            "experience": "6 years",
            "currentEmployer": "XYZ Corporation"
        },
        {
            "name": "Sophia",
            "sector": "Hospitality",
            "position": "Hotel Manager",
            "experience": "8 years",
            "currentEmployer": "Luxury Resort"
        },
        {
            "name": "Daniel",
            "sector": "Engineering",
            "position": "Mechanical Engineer",
            "experience": "9 years",
            "currentEmployer": "ABC Engineering"
        }
    ]

    return jsonify(response)


@app.route('/blogEditor', methods=['POST'])
def blog_editor():
    data = request.json  # Get the form data from the request body
    print(data)

    return jsonify(data)

# Endpoint for fetching user information for profile page.
@app.route('/profile', methods=['POST'])
def profile_page():

    data = request.json
    print(data)

    # Assuming 'user_id' is present in the request data
    user_id = data.get('user_id')
    print(user_id)

    response = {
        "user_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "birth_date": "1990-05-15",
        "current_country": "Turkey",
        "current_city": "Ankara",
        "current_position": "Backend DEV",
        "current_sector": "Soft-ware",
        "gender": "Male",
        "connections": 500,
        "e_id": 1001,
        "liked_post": 2001,
        "works_for": "Google",
        "works_since": "2020-01-01",
        "work_experiences": [
            {
                "user_id": 2,
                "exp_id": 1,
                "work_type": "Full-time",
                "work_mode": "Remote",
                "profession": "Front Developer ",
                "role": "Managed a team of developers",
                "org_name": "Google",
                "end_date": "2023-05-31",
                "start_date": "2022-01-01"
            },
            {
                "user_id": 2,
                "exp_id": 1,
                "work_type": "Full-time",
                "work_mode": "Remote",
                "profession": "Backend Developer",
                "role": "Managed a team of developers",
                "org_name": "Amazon",
                "end_date": "2023-05-31",
                "start_date": "2022-01-01"
            },
            {
                "user_id": 2,
                "exp_id": 1,
                "work_type": "Full-time",
                "work_mode": "Remote",
                "profession": "Manager",
                "role": "Managed a team of developers",
                "org_name": "Pepsi",
                "end_date": "2023-05-31",
                "start_date": "2022-01-01"
            }
        ],
        "educations": [
            {
                "edu_id": 1,
                "exp_id": 1,
                "gpa": 3.8,
                "dept": "Computer Science",
                "inst_name": "Bilkent University",
                "degree": "Bachelor's Degree",
                "edu_end_date": "2021-12-31",
                "edu_start_date": "2017-09-01",
                "inst_id": 1001
            },
            {
                "edu_id": 2,
                "exp_id": 1,
                "gpa": 3.5,
                "dept": "Business Administration",
                "inst_name": "Koc University",
                "degree": "Master's Degree",
                "edu_end_date": "2015-05-31",
                "edu_start_date": "2013-09-01",
                "inst_id": 1002
            },
            {
                "edu_id": 3,
                "exp_id": 2,
                "gpa": 4.0,
                "dept": "Electrical Engineering",
                "inst_name": "Ozyegin University",
                "degree": "Bachelor's Degree",
                "edu_end_date": "2019-12-31",
                "edu_start_date": "2015-09-01",
                "inst_id": 1001
            }
        ]
    }

    return jsonify(response)


# Endpoint for creating a new post
@app.route('/api/contacts', methods=['POST'])
def find_contacts():
    # Get post data from the request
    data = request.json
    u_id = data.get("id")

    print(u_id)

    cursor = db.get_cursor()

    try:
        # Start a transaction
        cursor.execute('START TRANSACTION')

        # Fetch owner details
        cursor.execute("SELECT mail_addr FROM User WHERE user_id = %s", (u_id,))
        owner_name = cursor.fetchone()[0]

        # Fetch contacts
        sql = """
        SELECT CASE
            WHEN cw.person1_id = %s THEN p2.user_id
            ELSE p1.user_id
        END AS connected_person_id,
        CASE
            WHEN cw.person1_id = %s THEN p2.mail_addr
            ELSE p1.mail_addr
        END AS connected_person_name
        FROM Connected_With AS cw
        INNER JOIN User AS p1 ON cw.person1_id = p1.user_id
        INNER JOIN User AS p2 ON cw.person2_id = p2.user_id
        WHERE cw.person1_id = %s OR cw.person2_id = %s;
        """

        cursor.execute(sql, (u_id, u_id, u_id, u_id))
        rows = cursor.fetchall()

        contacts = [{"id": row[0], "name": row[1]} for row in rows]
        contacts.append({"id": u_id, "name": owner_name})
        # Commit the transaction
        cursor.execute('COMMIT')

    except Exception as e:
        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')

        # Print the error message
        print(f"An error occurred: {str(e)}")

    contacts = [{"id": 1, "name": 'Omer Oktay Gültekin'}, {"id": 2, "name": 'Mert Ünlü'}]
    if contacts:
        # Return a success response
        return jsonify({'message': 'Contacts found successfully', 'contacts': contacts}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to find contact'}), 500


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
