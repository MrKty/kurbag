import os
from datetime import datetime

import bcrypt as bcrypt
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import rds_db as db
from flask_cors import CORS, cross_origin

app = Flask(__name__)

app.secret_key = 'abcdefgh'

app.config['MYSQL_HOST'] = 'kurbagdb.crhbzjj4nyp2.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'mrkty'
app.config['MYSQL_PASSWORD'] = '12345678'
app.config['MYSQL_DB'] = 'kurbagdb'

CORS(app)  # Initialize Flask-CORS
mysql = MySQL(app)

# Initiate database
db.create_tables()
db.populate_table()
db.like_trigger()
db.connection_trigger()
db.unfollow_trigger()
db.event_register_trigger()


@app.route('/')
@app.route('/login', methods=['POST'])
def login():
    # Retrieve the login data from the request
    login_data = request.get_json()
    # Extract the email and password from the login data
    email = login_data['email']
    password = login_data['password']

    # Perform authentication logic
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT user_id, mail_addr, password, user_type FROM User WHERE mail_addr = %s', (email,))

    user = cursor.fetchone()

    if user:
        print(password)
        print(user)
        # Compare the hashed passwords
        if bcrypt.checkpw(password.encode(), user["password"].encode()):
            message = 'Logged in successfully!'
            response = {'message': message, 'id': user['user_id'], 'userType': user['user_type']}
            print(response)
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


@app.route('/admin-login', methods=['POST'])
def admin_login():
    # Retrieve the login data from the request
    login_data = request.get_json()
    # Extract the email and password from the login data
    email = login_data['email']
    password = login_data['password']

    # Perform authentication logic
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT admin_id, admin_mail, admin_password, a_name, a_last_name FROM Admin WHERE admin_mail = %s',
                   (email,))

    user = cursor.fetchone()
    print("not into")
    if user:
        print(password)
        print(user)
        # Compare the hashed passwords
        if user["admin_password"] == password:
            print("here")
            message = 'Logged in successfully!'
            response = {'message': message, 'id': user['admin_id']}
            print(response)
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
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM User WHERE mail_addr = %s', (email,))
    account = cursor.fetchone()
    if account:
        message = 'This mail is already registered!'
    else:
        try:
            # Start a transaction
            cursor.execute('START TRANSACTION')

            cursor.execute('Select * From User WHERE user_type = 1')
            is_career_expert = cursor.fetchone()

            if is_career_expert:
                user_type = 0
            else:
                user_type = 1

            # Insert the user data into the User table
            cursor.execute(
                'INSERT INTO User (mail_addr, password, phone_no, user_type, profile_pic) VALUES (%s, %s, %s, %s, %s)',
                (email, hashed_password, phone, user_type,
                 "https://firebasestorage.googleapis.com/v0/b/cs353db.appspot.com/o/user.png?alt=media&token=8f6d1e4f-349c-482b-83e7-74fc61f8453f"))
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

            if user_type == 1:
                cursor.execute('INSERT INTO Career_Expert (user_id, expert_in_tag) VALUES (%s, "all")', (user_id,))

            # Commit the transaction
            cursor.execute('COMMIT')

            message = 'User successfully created!'
        except Exception as e:
            print(f"An error occurred: {str(e)}")

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
    org_about = form_data['about']
    print(org_about)

    if org_type == 'Company':
        user_type = 4
        org_pic = "https://firebasestorage.googleapis.com/v0/b/cs353db.appspot.com/o/company.png?alt=media&token=9c070b00-e238-4a51-b5d3-721fa09fc228&_gl=1*1cs788b*_ga*OTAxMzI0ODYyLjE2ODUxNzYxNDI.*_ga_CW55HF8NVT*MTY4NTY5NDk0MC43LjEuMTY4NTY5NTA4NS4wLjAuMA.."
    else:
        user_type = 5
        org_pic = "https://firebasestorage.googleapis.com/v0/b/cs353db.appspot.com/o/school.png?alt=media&token=1556814e-5a64-4092-9f6d-d59346b23b1f&_gl=1*1f9zuqe*_ga*OTAxMzI0ODYyLjE2ODUxNzYxNDI.*_ga_CW55HF8NVT*MTY4NTY5NDk0MC43LjEuMTY4NTY5NTI0MC4wLjAuMA.."

    # Hash the password
    hashed_password = bcrypt.hashpw(org_password.encode('utf-8'), bcrypt.gensalt())

    # Perform additional operations, such as storing the data in a database
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
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
                'INSERT INTO User (mail_addr, password, phone_no, user_type, profile_pic, about_info) VALUES (%s, %s, %s, %s, %s, %s)',
                (org_email, hashed_password, org_phone, user_type, org_pic, org_about))
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
    certificateURLs = form_data['selectedCertificates']
    certificateNames = form_data['selectedCertificateNames']
    print(selected_tag, motivation, certificateURLs, certificateNames)
    print(form_data["id"])

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Start a transaction
        cursor.execute('START TRANSACTION')

        # Check if an entry already exists for the applicant in Sends_Request table
        cursor.execute('SELECT * FROM Sends_Request WHERE applicant_id = %s', (form_data["id"],))
        existing_entry = cursor.fetchone()

        if existing_entry:
            # If an entry exists, update it
            cursor.execute('UPDATE Sends_Request SET motivation_letter = %s, tag_name = %s WHERE applicant_id = %s',
                           (motivation, selected_tag, form_data["id"]))
        else:
            # If no entry exists, insert a new one
            cursor.execute('INSERT INTO Sends_Request (applicant_id, motivation_letter, tag_name) VALUES (%s, %s, %s)',
                           (form_data["id"], motivation, selected_tag))

        # Delete existing certificate entries for the applicant
        cursor.execute('DELETE FROM Certificate WHERE applicant_id = %s', (form_data["id"],))

        for i in range(len(certificateURLs)):
            cursor.execute(
                'INSERT INTO Certificate (applicant_id, cert_url, cert_name) VALUES (%s, %s, %s)',
                (form_data["id"], certificateURLs[i], certificateNames[i]))

        # Commit the transaction
        cursor.execute('COMMIT')

        message = 'Successfully applied!'
    except Exception as e:
        print(str(e))
        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')
        message = 'Error occurred during application. Please try again.'

    # Create a response object
    response = {'message': message}
    print(message)
    return jsonify(response)


@app.route('/career-expert-modal', methods=['POST'])
def fill_career_expert_modal():
    u_id = request.json.get('id')
    print(u_id)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT tag_name, motivation_letter FROM Sends_Request WHERE applicant_id = %s',
                   (u_id,))
    application = cursor.fetchone()

    if application:
        cursor.execute('SELECT cert_url, cert_name FROM Certificate WHERE applicant_id = %s',
                       (u_id,))
        certificates = cursor.fetchall()

        print(certificates)
        print(application)
        # Create a response object
        response = {
            'motivation_letter': application["motivation_letter"],
            'tag_name': application["tag_name"],
            'certificates': certificates
        }
        return jsonify(response)
    return jsonify({'error': 'Entry already exists for the given ID.'})


# Endpoint for displaying jobs.@app.route('/jobs', methods=['POST'])
@app.route('/jobs', methods=['POST'])
def get_jobs():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        "SELECT J.*, U.profile_pic as companyLogo, U.about_info as about, O.num_followers as companyFollowers FROM Job_Opening J "
        "JOIN Organization O ON O.org_name = J.j_organization "
        "JOIN User U ON U.user_id = O.user_id"
    )
    jobs_data = cursor.fetchall()
    print("jobs")
    print(jobs_data)
    for job in jobs_data:
        job["due_date_apply"] = job["due_date_apply"].strftime("%Y-%m-%d %H:%M:%S")

    return jsonify(jobs_data)


@app.route('/filtered-jobs', methods=['POST'])
def get_filtered_jobs():
    earliest_date = request.json.get('earliestDate', None)
    latest_date = request.json.get('latestDate', None)
    work_type = request.json.get('workType', None)
    work_mode = request.json.get('workMode', None)
    skills = request.json.get('skills', None)
    location = request.json.get('location', None)

    print(earliest_date)
    print(latest_date)
    print(work_mode)
    print(work_type)
    print(skills)
    print(location)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    query = "SELECT J.*, U.profile_pic as companyLogo, U.about_info as about, O.num_followers as companyFollowers FROM Job_Opening J " \
            "JOIN Organization O ON O.org_name = J.j_organization " \
            "JOIN User U ON U.user_id = O.user_id "

    conditions = []
    parameters = {}

    if earliest_date:
        conditions.append("j_timestamp >= %(earliest_date)s")
        parameters['earliest_date'] = earliest_date

    if latest_date:
        conditions.append("j_timestamp <= %(latest_date)s")
        parameters['latest_date'] = latest_date

    if work_type:
        conditions.append("j_type = %(work_type)s")
        parameters['work_type'] = work_type

    if work_mode:
        conditions.append("j_mode = %(work_mode)s")
        parameters['work_mode'] = work_mode

    if skills:
        conditions.append("j_skills LIKE %(skills)s")
        parameters['skills'] = f"%{skills}%"

    if location:
        conditions.append("j_location LIKE %(location)s")
        parameters['location'] = f"%{location}%"

    if conditions:
        query += "WHERE " + " AND ".join(conditions)

    cursor.execute(query, parameters)
    jobs_data = cursor.fetchall()

    for job in jobs_data:
        job["j_timestamp"] = job["j_timestamp"].strftime("%Y-%m-%d %H:%M:%S")

    return jsonify(jobs_data)


@app.route('/get-recruiter-info', methods=['POST'])
def get_recruiter_info():
    data = request.json
    recId = data.get("recruiterId")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        "SELECT CONCAT(P.first_name, ' ', P.last_name) AS name, U.profile_pic as photo, P.user_id as rec_id, P.current_position as position "
        "FROM Person P "
        "JOIN User U ON U.user_id = P.user_id "
        "WHERE P.user_id = %s ", (recId,)
    )
    recData = cursor.fetchone()

    print(recData)

    return jsonify(recData), 200


@app.route('/applied-jobs', methods=['POST'])
def get_applied_jobs():
    data = request.json
    print(data)
    user_id = data.get('id')  # Get the user_id from the request

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        "SELECT Job_Opening.*, Applies_Job.resume, Applies_Job.cover_letter, Applies_Job.skills, Applies_Job.isApproved FROM Job_Opening "
        "JOIN Applies_Job ON Job_Opening.j_id = Applies_Job.j_id "
        "WHERE Applies_Job.user_id = %s",
        (user_id,)
    )
    jobs_data = cursor.fetchall()

    for job in jobs_data:
        job["due_date_apply"] = job["due_date_apply"].strftime("%Y-%m-%d %H:%M:%S")
    print(jobs_data)
    return jsonify(jobs_data)


# TODO Endpoint for updating profile
@app.route('/update-profile', methods=['POST'])
def update_profile():
    # Get post data from the request
    data = request.json
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    print(data)
    try:
        # Update the profile information in the Person table
        cursor.execute('UPDATE Person SET first_name = %s, last_name = %s, current_position = %s, current_sector = %s, '
                       'current_country = %s, current_city = %s WHERE user_id = %s',
                       (data.get('firstName'), data.get('lastName'), data.get('position'), data.get('sector'),
                        data.get('country'), data.get('city'), data.get('id')))

        # Update the about_info in the User table
        cursor.execute('UPDATE User SET about_info = %s WHERE user_id = %s',
                       (data.get('about'), data.get('id')))

        cursor.execute('COMMIT')

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")
        return jsonify({'message': 'Failed to update profile'}), 500

    # Return a success response
    return jsonify({'message': 'Profile updated successfully'}), 200


@app.route('/search-profile', methods=['POST'])
def search_profile():
    # Get post data from the request
    data = request.json
    user_name = data.get("userName")

    print(user_name)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    if user_name:
        cursor.execute(
            "SELECT user_id AS 'key', CONCAT(P.first_name, ' ', P.last_name) as 'value' FROM Person P "
            "WHERE LOWER(CONCAT(P.first_name, ' ', P.last_name)) LIKE %s",
            ('%' + user_name.lower() + '%',)
        )

        # Fetch all the results
        user_names = cursor.fetchall()
        print(user_names)

        # Close the cursor
        cursor.close()
        return jsonify({'userList': user_names}), 200

    else:
        user_names = []
        return jsonify({'userList': user_names}), 400


# Endpoint for creating a new post
@app.route('/home-create-post', methods=['POST'])
def create_post():
    # Get post data from the request
    data = request.json
    post_title = data.get('postTitle')
    post_content = data.get('postContent')
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
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


@app.route('/like-post', methods=['POST'])
def like_post():
    # Get user_id and post_id from the request
    data = request.json
    user_id = data.get('userId')
    post_id = data.get('postId')

    print(user_id)
    print(post_id)

    try:
        # Establish a database connection
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Insert the like into Likes_Post table
        cursor.execute('INSERT INTO Likes_Post (user_id, post_id) VALUES (%s, %s)', (user_id, post_id))

        cursor.execute('COMMIT')

        # Return a success response
        return jsonify({'message': 'Post liked successfully'}), 200

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")

        # Return an error response
        return jsonify({'message': 'Failed to like post'}), 500


@app.route('/register-event', methods=['POST'])
def register_event():
    # Get user_id and post_id from the request
    data = request.json
    user_id = data.get('userId')
    event_id = data.get('eventId')

    print(user_id)
    print(event_id)

    try:
        # Establish a database connection
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Insert the like into Likes_Post table
        cursor.execute('INSERT INTO Registers_Event (event_id, user_id) VALUES (%s, %s)', (event_id, user_id))

        cursor.execute('COMMIT')

        # Return a success response
        return jsonify({'message': 'Event registered successfully'}), 200

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")

        # Return an error response
        return jsonify({'message': 'Failed to register event'}), 500

# Endpoint for creating a new job (by a recruiter)
@app.route('/create-job', methods=['POST'])
def create_job():
    # Get post data from the request
    data = request.json
    print(data)

    job_title = data.get('title')
    job_description = data.get('description')
    job_organization = data.get('organization')
    job_type = data.get('workType')
    job_location = data.get('location')
    job_mode = data.get('workMode')
    job_due_date = data.get('dueDate')
    job_recruiter_id = data.get('id')
    job_min_age = data.get('minAge')
    job_max_age = data.get('maxAge')
    job_skills = data.get('skillsString')
    print(data)

    try:
        # Convert job_due_date to a timestamp
        due_date = datetime.strptime(job_due_date, "%Y-%m-%d")
        job_due_date_timestamp = due_date.strftime("%Y-%m-%d %H:%M:%S")

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        j_id = None

        try:
            # Save the job opening to the database
            cursor.execute(
                'INSERT INTO Job_Opening (j_title, j_desc, j_type, j_organization, j_location, j_mode, due_date_apply, j_min_age , j_max_age , j_skills ,recruiter_id) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s,%s ,%s, %s, %s)',
                (
                    job_title,
                    job_description,
                    job_type,
                    job_organization,
                    job_location,
                    job_mode,
                    job_due_date_timestamp,
                    job_min_age,
                    job_max_age,
                    job_skills,
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


@app.route('/get-company-recruiter', methods=['POST'])
def getCompanyRecruiter():
    data = request.json  # Get the form data from the request body
    print(data)
    u_id = data.get("id")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # Fetch works_for value from Person table
    cursor.execute("SELECT works_for FROM Person WHERE user_id = %s", (u_id,))
    works_for = cursor.fetchone().get("works_for")

    # Fetch org_name from Organization table using works_for as user_id
    cursor.execute("SELECT org_name FROM Organization WHERE user_id = %s", (works_for,))
    org_name = cursor.fetchone().get("org_name")

    return jsonify({"org_name": org_name}), 200


@app.route('/get-user-for-job-application', methods=['POST'])
def get_user_job_application():
    data = request.json  # Get the form data from the request body
    u_id = data.get("id")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # Fetch user details from Person table using user_id
    cursor.execute("SELECT P.first_name, P.last_name, U.phone_no, U.mail_addr, "
                   "U.profile_pic FROM Person P INNER JOIN User U ON P.user_id = U.user_id "
                   "WHERE P.user_id = %s", (u_id,))
    user = cursor.fetchone()
    print(user)
    return jsonify(user), 200


@app.route('/apply-job', methods=['POST'])
def apply_job():
    data = request.json  # Get the form data from the request body
    user_id = data.get("userId")
    job_id = data.get("jobId")
    resume = data.get("resume")
    cover_letter = data.get("coverLetter")
    skills = data.get("skillsString")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # Insert the data into the Applies_Job table
    cursor.execute(
        "INSERT INTO Applies_Job (user_id, j_id, resume, cover_letter, skills) VALUES (%s, %s, %s, %s, %s)",
        (user_id, job_id, resume, cover_letter, skills)
    )

    # Commit the transaction and close the cursor
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Successfully applied"}), 200


@app.route('/delete-application', methods=['POST'])
def delete_application():
    data = request.json  # Get the data from the request body
    job_id = data.get("jobId")
    user_id = data.get("id")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # Delete the application from the Applies_Job table
    cursor.execute(
        "DELETE FROM Applies_Job WHERE user_id = %s AND j_id = %s",
        (user_id, job_id)
    )

    # Commit the transaction and close the cursor
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Application deleted successfully"}), 200


@app.route('/get-application-info', methods=['POST'])
def get_application_info():
    data = request.json
    applicant_id = data.get("userId")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # Execute the SQL query to fetch application information
    cursor.execute("SELECT skills, cover_letter as coverLetter, resume FROM Applies_Job WHERE user_id = %s",
                   (applicant_id,))
    application_info = cursor.fetchone()
    print(application_info)

    return jsonify({'application_info': application_info}), 200


@app.route('/get-applicant-info', methods=['POST'])
def get_applicant_info():
    data = request.json
    applicant_id = data.get("userId")
    print("get-application-i")
    print(applicant_id)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        "SELECT CONCAT(P.first_name, ' ', P.last_name) as name, U.phone_no as phoneNumber, U.mail_addr as email, "
        "U.profile_pic as profilePhoto FROM Person P INNER JOIN User U ON P.user_id = U.user_id "
        "WHERE P.user_id = %s", (applicant_id,))

    applicant_info = cursor.fetchone()
    print("get-application-info")
    print(applicant_info)

    return jsonify({'applicant_info': applicant_info}), 200


@app.route('/get-applications', methods=['POST'])
def get_applications():
    data = request.json
    rec_id = data.get("id")
    job_id = data.get("selectedJobId")

    print("job id: ", job_id)
    print("recruiterid", rec_id)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        "SELECT CONCAT(P.first_name, ' ', P.last_name) AS name, U.phone_no AS phoneNumber, U.mail_addr AS email, "
        "U.profile_pic AS profilePhoto, JO.j_title as jobTitle, JO.due_date_apply as dueDateApply,"
        "JO.j_timestamp as datePosted, JO.j_id as jobId, U.user_id as applicantId, AJ.resume as resume "
        "FROM Person P "
        "INNER JOIN User U ON P.user_id = U.user_id "
        "INNER JOIN Applies_Job AJ ON AJ.user_id = U.user_id "
        "INNER JOIN Job_Opening JO ON JO.j_id = AJ.j_id "
        "WHERE JO.recruiter_id = %s AND JO.j_id = %s", (rec_id, job_id))

    applications = cursor.fetchall()
    print(applications)

    for application in applications:
        application["dueDateApply"] = application["dueDateApply"].strftime("%d-%m-%Y")

    return jsonify({'applications': applications}), 200


@app.route('/get-job-listings', methods=['POST'])
def get_job_listings():
    data = request.json
    rec_id = data.get("id")
    print("recruiterid", rec_id)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        "SELECT JO.j_id AS job_id, JO.j_title AS job_title, JO.j_timestamp AS post_date, "
        "COUNT(AJ.user_id) AS num_applications "
        "FROM Job_Opening JO "
        "LEFT JOIN Applies_Job AJ ON JO.j_id = AJ.j_id "
        "WHERE JO.recruiter_id = %s "
        "GROUP BY JO.j_id", (rec_id,))
    listings = cursor.fetchall()
    print(listings)

    return jsonify({'job_listings': listings}), 200


@app.route('/home-get-post', methods=['POST'])
def get_posts():
    print("here")
    p_id = int(request.json.get("p_id"))
    e_id = int(request.json.get("e_id"))

    # Retrieve paginated posts
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT COUNT(*) AS event_count FROM Event WHERE e_id > %s', (e_id,)
    )
    event_count = cursor.fetchone()["event_count"]
    print("event", event_count)
    post_count = 4 - event_count if event_count < 2 else 2

    # Retrieve paginated posts count
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT COUNT(*) AS post_count '
        'FROM Post '
        'WHERE p_id > %s', (p_id,)
    )
    temp = cursor.fetchone()['post_count']
    print("temp", temp)
    if event_count > 2 and temp < 2:
        event_count = 4 - temp

    cursor.execute(
        'SELECT p_id AS id, p_title AS title, p_content AS content, p_timestamp AS timestamp, '
        'CONCAT(P.first_name, " ", P.last_name) AS name, p_like_count as likeNumber, p_com_count as commentNumber '
        'FROM Post JOIN Person P ON P.user_id = Post.user_id '
        'WHERE p_id > %s '
        'ORDER BY p_id ASC '
        'LIMIT %s',
        (p_id, post_count)
    )
    paginated_posts = list(cursor.fetchall())
    print(paginated_posts)

    # Select events based on the post_count
    cursor.execute(
        'SELECT E.e_id as id, e_name as eventName, CONCAT(P.first_name, " ", P.last_name) AS organizer, '
        'cover_photo as coverPhoto,'
        'e_start_date as startDate, e_end_date as endDate, e_limit as "limit", '
        'e_link as websiteLink, e_content as content, e_timestamp as creationDate, platform, '
        'e_speakers as speakers '
        'FROM Event E '
        'JOIN Person AS P ON P.user_id = E.organizer_id '
        'WHERE e_id > %s '
        'LIMIT %s',
        (e_id, event_count)
    )

    paginated_events = cursor.fetchall()
    print(paginated_events)

    return jsonify({'posts': paginated_posts, 'events': paginated_events}), 200


# Endpoint for creating a new event
@app.route('/home-event', methods=['POST'])
def create_event():
    # Get post data from the request
    data = request.json
    print(data)
    if not data.get("coverPhotoUrl"):
        data["coverPhotoUrl"] = "NULL"
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    e_id = None

    try:
        # Save the event to the database
        cursor.execute(
            'INSERT INTO Event (e_name, organizer_id, cover_photo, platform, e_start_date, e_end_date, e_limit, e_link, e_content, e_speakers) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
            (data['eventTitle'], data["id"], data['coverPhotoUrl'], data['eventPlatform'],
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


@app.route('/career-expert-applications', methods=['POST'])
def retrieve_c_e_applications():
    data = request.json  # Get the form data from the request body
    user_id = data.get("id")

    # Doğru cursor
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    print("id")
    print(user_id)
    # Start a transaction
    cursor.execute('START TRANSACTION')
    cursor.execute('SELECT expert_in_tag FROM Career_Expert WHERE user_id = %s', user_id)

    expert_tag = cursor.fetchone()
    if expert_tag["expert_in_tag"] == "all":
        print("here")
        # Retrieve all the applications for the career expert
        cursor.execute(
            'SELECT P.user_id AS appID, CONCAT(P.first_name, " ", P.last_name) AS name, U.profile_pic AS photo, SR.date, SR.tag_name AS tag '
            'FROM Sends_Request SR '
            'JOIN Person P ON P.user_id = SR.applicant_id JOIN User U ON SR.applicant_id = U.user_id '
            'WHERE SR.isApproved = false')
    else:
        print("heressss")

        # Retrieve all the applications for the career expert
        cursor.execute(
            'SELECT P.user_id AS appID, CONCAT(P.first_name, " ", P.last_name) AS name, U.profile_pic, SR.date, SR.tag_name FROM Sends_Request SR '
            'JOIN Person P ON P.user_id = SR.applicant_id JOIN User U ON SR.applicant_id = U.user_id '
            'WHERE SR.isApproved = false AND SR.tag_name = %s', (expert_tag,))

    applications = cursor.fetchall()
    print(applications)

    # Create a response object with the applications
    response = {"applications": applications}
    return jsonify(response), 200


@app.route('/get-specific-c-e-application', methods=['POST'])
def get_specific_c_e_application():
    # Get post data from the request
    data = request.json
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    user_id = data.get("id")
    applicant_id = data.get("appID")

    # Fetch the application data from the Sends_Request table
    cursor.execute(
        'SELECT motivation_letter FROM Sends_Request WHERE applicant_id = %s',
        (applicant_id,)
    )
    motivation = cursor.fetchone()["motivation_letter"]

    # Fetch the certificate data from the Certificate table
    cursor.execute(
        'SELECT cert_id as id, cert_name as name, cert_url as url FROM Certificate WHERE applicant_id = %s',
        (applicant_id,)
    )
    certificates = list(cursor.fetchall())
    cursor.close()

    # Create a response object with the applications
    response = {"motivation": motivation, "certificates": certificates}
    return jsonify(response), 200


@app.route('/approve-c-e-application', methods=['POST'])
def approve_c_e_application():
    # Get post data from the request
    data = request.json
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    user_id = data.get("id")
    applicant_id = data.get("appID")

    try:
        # Update Sends_Request to approve the application
        cursor.execute('UPDATE Sends_Request SET expert_id = %s, isApproved = TRUE WHERE applicant_id = %s',
                       (user_id, applicant_id))

        # Get the tag_name from Sends_Request for the approved application
        cursor.execute('SELECT tag_name FROM Sends_Request WHERE applicant_id = %s', (applicant_id,))
        tag_name = cursor.fetchone()["tag_name"]

        # Insert a new entry in Career_Expert table for the approved expert
        cursor.execute('INSERT INTO Career_Expert (user_id, expert_in_tag) VALUES (%s, %s)', (applicant_id, tag_name))

        cursor.execute('UPDATE User SET user_type = 1 WHERE user_id = %s', (applicant_id,))

        # Commit the transaction
        cursor.execute('COMMIT')

        # Return a success response
        return jsonify({'message': 'Application approved successfully'}), 200
    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")
        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')

        # Return an error response
        return jsonify({'message': 'Failed to approve application. Please try again.'}), 500


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


@app.route('/retrieve-blogs', methods=['POST'])
def blog_page():
    data = request.json  # Get the form data from the request body
    selected_tag = data.get("selectedTag")
    b_id = int(data.get("b_id"))
    print(selected_tag)

    # SQL query to retrieve blogs based on owner_id and b_id
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT b_id as id, b_title as title, b_summary as summary, b_com_count as commentNumber, '
        'b_like_count as likeNumber, b_cover as coverPhoto, CONCAT(P.first_name, " ", P.last_name) AS name '
        'FROM Blog_Post B INNER JOIN Person AS P ON B.owner_id = P.user_id '
        'WHERE B_tag = %s AND b_id > %s LIMIT 4',
        (selected_tag, b_id)
    )
    blogs = list(cursor.fetchall())
    print(blogs)
    print("here")
    return jsonify({'blogs': blogs}), 200


@app.route('/blog-viewer', methods=['POST'])
def blog_viewer_page():
    data = request.json  # Get the form data from the request body
    b_id = data.get("b_id")
    print(b_id)
    # SQL query to retrieve blogs based on owner_id and b_id
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT b_title as title, b_summary as summary, '
        'b_cover as coverPhoto, b_content as content, b_timestamp as date, b_tag as tag, '
        'U.profile_pic as profilePhoto, CONCAT(P.first_name, " ", P.last_name) AS author '
        'FROM Blog_Post B INNER JOIN Person AS P ON B.owner_id = P.user_id '
        'INNER JOIN User AS U On U.user_id = B.owner_id '
        'WHERE b_id = %s', b_id)
    blog = cursor.fetchone()
    print(blog)
    print("here")
    return jsonify({'blog': blog}), 200


@app.route('/blog-comments', methods=['POST'])
def blog_comments_page():
    data = request.json  # Get the form data from the request body
    u_id = data.get("id")
    b_id = data.get("b_id")
    c_content = data.get("c_content")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    if c_content:
        # Insert the new comment into the Comment table
        cursor.execute(
            'INSERT INTO Comment (owner_id, root_blog_id, c_content) '
            'VALUES (%s, %s, %s)',
            (u_id, b_id, c_content)
        )
        mysql.connection.commit()

    # Retrieve the updated comments for the specified blog
    cursor.execute(
        'SELECT C.c_content AS content, C.c_timestamp as timeWritten, '
        'U.profile_pic as writerPhoto, CONCAT(P.first_name, " ", P.last_name) AS writerName '
        'FROM Comment C INNER JOIN Person AS P ON C.owner_id = P.user_id '
        'INNER JOIN User AS U On U.user_id = C.owner_id '
        'WHERE C.root_blog_id = %s',
        (b_id,)
    )
    comments = list(cursor.fetchall())
    print(comments)

    return jsonify({'comments': comments}), 200


@app.route('/blog-like', methods=['POST'])
def blog_like():
    data = request.json  # Get the form data from the request body
    b_id = data.get("b_id")
    b_like = data.get("b_like")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    if b_like is not None:
        if b_like:  # Increment likeCount by 1
            cursor.execute(
                'UPDATE Blog_Post '
                'SET likeCount = likeCount + 1 '
                'WHERE b_id = %s',
                (b_id,)
            )
        else:  # Decrement likeCount by 1
            cursor.execute(
                'UPDATE Blog_Post '
                'SET likeCount = likeCount - 1 '
                'WHERE b_id = %s',
                (b_id,)
            )
        mysql.connection.commit()

    return jsonify({'message': "ok"}), 200


@app.route('/retrieve-c-e-previous-blogs', methods=['POST'])
def retrieve_c_e_previous_blogs():
    data = request.json  # Get the form data from the request body
    owner_id = data.get("id")
    b_id = int(data.get("b_id"))

    # SQL query to retrieve blogs based on owner_id and b_id
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT b_id as id, b_title as title, b_summary as summary, b_com_count as commentNumber, '
        'b_like_count as likeNumber, b_cover as coverPhoto, CONCAT(P.first_name, " ", P.last_name) AS name '
        'FROM Blog_Post B INNER JOIN Person AS P ON B.owner_id = P.user_id '
        'WHERE owner_id = %s AND b_id > %s LIMIT 4',
        (owner_id, b_id)
    )
    blogs = list(cursor.fetchall())
    print(blogs)
    print("here")
    return jsonify({'blogs': blogs}), 200


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
    u_id = data.get("id")

    # Extract the necessary data from the form
    cover_photo_url = data.get('coverPhotoUrl')
    title = data.get('title')
    summary = data.get('summary')
    content = data.get('content')
    selected_tag = data.get('selectedTag')

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Start a transaction
        cursor.execute('START TRANSACTION')

        # Insert the blog post into the database
        cursor.execute(
            'INSERT INTO Blog_Post (owner_id, b_title, b_content, b_summary, b_cover, b_tag) VALUES (%s, %s, %s, %s, %s, %s)',
            (u_id, title, content, summary, cover_photo_url, selected_tag))

        # Commit the transaction
        cursor.execute('COMMIT')

        message = 'Blog is successfully published'
        status_code = 200
    except Exception as e:
        print(str(e))
        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')
        message = 'Error occurred while publishing the blog. Please try again.'
        status_code = 500

    # Create a response object
    response = {'message': message}
    print(response)
    return jsonify(response), status_code


@app.route('/blogEditorGetTag', methods=['POST'])
def blog_editor_get_tag():
    data = request.json  # Get the form data from the request body
    u_id = data.get("id")

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT expert_in_tag FROM Career_Expert WHERE user_id = %s', (u_id,))
    result = cursor.fetchone()

    if result:
        if result[0] == "all":
            tag = "career"
        else:
            tag = result[0]
    else:
        tag = None
    return jsonify({"tag": tag}), 200


@app.route('/approve-application', methods=['POST'])
def approve_application():
    data = request.json  # Get the form data from the request body
    applicant_id = data.get("applicantId")
    job_id = data.get("jobId")

    print("applicant id: ", applicant_id)
    print("job id: ", job_id)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Update the isApproved attribute to True for the specified applicant and job
        cursor.execute(
            "UPDATE Applies_Job SET isApproved = TRUE WHERE user_id = %s AND j_id = %s",
            (applicant_id, job_id)
        )
        cursor.execute("COMMIT")

        return jsonify({"message": "Application approved successfully"}), 200

    except Exception as e:
        mysql.connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()


@app.route('/blogEditorer', methods=['POST'])
def tempMethod():
    data = request.json  # Get the form data from the request body
    print(data)
    u_id = data.get("id")

    return jsonify({"message": "Blog is successfully published"}), 200


# Route to fetch data from the Person table
@app.route("/profile-real", methods=["POST"])
def fetch_person_data():
    user_id = request.json["userId"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        "SELECT Person.*, User.profile_pic AS profilePicture, User.about_info as about FROM Person "
        "INNER JOIN User ON Person.user_id = User.user_id WHERE Person.user_id = %s",
        (user_id,)
    )
    person_data = cursor.fetchone()

    person_data["birth_date"] = person_data["birth_date"].strftime("%d-%m-%Y")

    return jsonify(person_data)


@app.route("/get-user-info", methods=["POST"])
def get_user_info():
    user_id = request.json["userId"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        "SELECT Person.*, User.profile_pic AS profilePicture, User.mail_addr, User.phone_no, User.about_info "
        "FROM Person "
        "INNER JOIN User ON Person.user_id = User.user_id "
        "WHERE Person.user_id = %s",
        (user_id,)
    )
    person_data = cursor.fetchone()
    print(person_data)
    person_data["birth_date"] = person_data["birth_date"].strftime("%d-%m-%Y")

    return jsonify(person_data)


# Route to fetch data from Work_Experience joined with CV_Component

@app.route('/add-work-experience', methods=['POST'])
def add_work_experience():
    # Get work experience data from the request
    data = request.json
    work_mode = data.get('workMode')
    work_type = data.get('workType')
    role = data.get('role')
    profession = data.get('profession')
    job_end_date = data.get('jobEndDate')
    job_start_date = data.get('jobStartDate')
    location = data.get('location')
    about = data.get('about')
    active = data.get('currentlyWorked')

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    exp_id = None

    print(job_end_date)

    try:
        # Save the work experience to the database
        cursor.execute('INSERT INTO CV_Component (user_id, active, description, location, end_date, start_date) '
                       'VALUES (%s, %s, %s, %s, %s, %s)',
                       (data.get('userId'), active, about, location, job_end_date, job_start_date))
        exp_id = cursor.lastrowid

        cursor.execute('INSERT INTO Work_Experience (user_id, exp_id, work_mode, work_type, role, profession, '
                       'org_name) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                       (
                           data.get('userId'), exp_id, work_mode, work_type, role, profession, data.get('orgName')))

        if active:
            cursor.execute("SELECT user_id FROM Organization WHERE org_name = %s", (data.get("orgName"),))
            o_id = cursor.fetchone()
            print(o_id)
            cursor.execute('UPDATE Person SET works_for = %s, works_since = %s WHERE user_id = %s',
                           (o_id["user_id"], job_start_date, data.get('id')))

        cursor.execute('COMMIT')

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")

    if exp_id:
        # Return a success response
        return jsonify({'message': 'Work experience added successfully', 'expId': exp_id}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to add work experience'}), 500


@app.route('/add-education', methods=['POST'])
def add_education():
    # Get education data from the request
    data = request.json
    gpa = data.get('gpa')
    department = data.get('department')
    degree = data.get('degree')
    edu_end_date = data.get('endDate')
    edu_start_date = data.get('startDate')
    location = data.get('location')
    about = data.get('about')

    print(data)
    print(edu_end_date)
    print(edu_start_date)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    exp_id = None

    try:
        # Save the education to the database
        cursor.execute('INSERT INTO CV_Component (user_id, active, description, location, end_date, start_date) '
                       'VALUES (%s, %s, %s, %s, %s, %s)',
                       (data.get('userId'), True, about, location, edu_end_date, edu_start_date))
        exp_id = cursor.lastrowid

        cursor.execute('INSERT INTO Education (user_id, exp_id, gpa, dept, degree, '
                       'inst_name) VALUES (%s, %s, %s, %s, %s, %s)',
                       (data.get('userId'), exp_id, gpa, department, degree, data.get('instName')))

        cursor.execute('COMMIT')

    except Exception as e:
        # Print the error message
        print(f"An error occurred: {str(e)}")

    if exp_id:
        # Return a success response
        return jsonify({'message': 'Education added successfully', 'expId': exp_id}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to add education'}), 500


@app.route("/get-work-experience", methods=["POST"])
def fetch_work_experience_data():
    user_id = request.json["userId"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    print(request.json)
    cursor.execute(
        """
        SELECT we.*, cv.*, U.profile_pic as companyLogo
        FROM Work_Experience we
        INNER JOIN CV_Component cv ON we.exp_id = cv.exp_id
        INNER JOIN Organization O ON O.org_name = we.org_name
        INNER JOIN User U ON O.user_id = U.user_id
        WHERE cv.user_id = %s
        """,
        (user_id,)
    )

    work_experience_data = cursor.fetchall()
    print("work_experience_data")
    print(work_experience_data)
    for work_experience in work_experience_data:
        work_experience["start_date"] = work_experience["start_date"].strftime("%d-%m-%Y")
        if work_experience["end_date"]:
            work_experience["end_date"] = work_experience["end_date"].strftime("%d-%m-%Y")
    cursor.close()
    return jsonify(work_experience_data)


# Route to fetch data from Education joined with CV_Component
@app.route("/get-education", methods=["POST"])
def fetch_education_data():
    user_id = request.json["userId"]
    print(request.json)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        """
        SELECT e.*, cv.*, U.profile_pic as institutionLogo
        FROM Education e
        INNER JOIN CV_Component cv ON e.exp_id = cv.exp_id
        INNER JOIN Organization O ON O.org_name = e.inst_name
        INNER JOIN User U ON O.user_id = U.user_id
        WHERE cv.user_id = %s
        """,
        (user_id,)
    )
    education_data = cursor.fetchall()
    print("education_data")
    print(education_data)
    for education in education_data:
        education["start_date"] = education["start_date"].strftime("%d-%m-%Y")
        education["end_date"] = education["end_date"].strftime("%d-%m-%Y")

    cursor.close()
    return jsonify(education_data)


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
                "dept": "Engineering",
                "inst_name": "Bilkent University",
                "degree": "Bachelor's",
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


@app.route('/search-school', methods=['POST'])
def find_school_list():
    data = request.json  # Get the form data from the request body
    u_id = data.get("id")
    inst_name = data.get("instName")
    print("requested")

    if inst_name:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Execute the query to fetch case-insensitive school names matching the criteria
        cursor.execute(
            "SELECT user_id AS 'key', org_name as value FROM Organization WHERE LOWER(org_name) LIKE %s",
            ('%' + inst_name.lower() + '%',)
        )

        # Fetch all the results
        school_names = cursor.fetchall()
        print(school_names)

        # Close the cursor
        cursor.close()
    else:
        school_names = []

    # Return the school names as a JSON response
    return jsonify({"school_names": school_names}), 200


@app.route('/get-org-employee-list', methods=['POST'])
def get_org_employee_list():
    data = request.json  # Get the form data from the request body
    u_id = data.get("id")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    query = "SELECT org_name FROM Organization WHERE user_id = %s"
    cursor.execute(query, (u_id,))
    org_name = cursor.fetchone()

    # Retrieve employee data from User and Work_Experience tables
    cursor.execute(
        "SELECT P.user_id as id, CONCAT(P.first_name, ' ', P.last_name) AS name, U.profile_pic as photo, "
        "P.works_since as workingSince, P.current_position as position, U.user_type as userType "
        "FROM Person P JOIN User U ON U.user_id = P.user_id WHERE P.works_for = %s ", (u_id,))
    employees = cursor.fetchall()

    for employee in employees:
        employee["workingSince"] = employee["workingSince"].strftime("%d-%m-%Y")

    return jsonify({"message": "Employee list is successfully fetched", "employees": employees}), 200


@app.route('/make-employee-recruiter', methods=['POST'])
def make_employee_recruiter():
    data = request.json  # Get the form data from the request body
    e_id = data.get("employeeId")
    print(e_id)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        "UPDATE User SET user_type = user_type + 2 WHERE user_id = %s",
        (e_id,))
    mysql.connection.commit()

    return jsonify({"message": "Employee successfully becomes recruiter"}), 200


@app.route('/connect-user', methods=['POST'])
def connect_user():
    data = request.json
    user_id = data.get('id')  # Current user's id
    other_user_id = data.get('targetId')  # Other user's id

    print("target user:", other_user_id)
    print("current user:", user_id)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Check if the connection already exists in the Connected_With table
        cursor.execute(
            "SELECT * FROM Connected_With WHERE (person1_id = %s AND person2_id = %s) OR (person1_id = %s AND person2_id = %s)",
            (user_id, other_user_id, other_user_id, user_id))
        connection = cursor.fetchone()
        print("connection ", connection)
        if connection:
            # Delete the existing connection
            cursor.execute(
                "DELETE FROM Connected_With WHERE (person1_id = %s AND person2_id = %s) OR (person1_id = %s AND person2_id = %s)",
                (user_id, other_user_id, other_user_id, user_id))
            print("Deleted existing connection:", connection)
            message = "Users connection deleted successfully"
        else:
            # Insert a new record into the Connected_With table
            cursor.execute("INSERT INTO Connected_With (person1_id, person2_id) VALUES (%s, %s)",
                           (user_id, other_user_id))

            message = "Users connected successfully"
        cursor.execute('COMMIT')
        return jsonify({"message": message}), 200
    except Exception as e:
        # Handle any exceptions that may occur during the database operation
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()


@app.route('/is-follow-user', methods=['POST'])
def is_follow_user():
    data = request.json
    user_id = data.get('id')  # Current user's id
    other_user_id = data.get('targetId')  # Other user's id

    print("target user:", other_user_id)
    print("current user:", user_id)
    print("is-follow-user")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # Check if the connection already exists in the Connected_With table
    cursor.execute(
        "SELECT * FROM Connected_With WHERE (person1_id = %s AND person2_id = %s) OR (person1_id = %s AND person2_id = %s)",
        (user_id, other_user_id, other_user_id, user_id))
    connection = cursor.fetchone()
    return jsonify({"following": connection is not None}), 200


@app.route('/search-company', methods=['POST'])
def find_company_list():
    data = request.json  # Get the form data from the request body
    u_id = data.get("id")
    org_name = data.get("orgName")
    print("requested")

    if org_name:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Execute the query to fetch case-insensitive school names matching the criteria
        cursor.execute(
            "SELECT user_id AS 'key', org_name as 'value' FROM Organization WHERE LOWER(org_name) LIKE %s",
            ('%' + org_name.lower() + '%',)
        )

        # Fetch all the results
        company_names = cursor.fetchall()
        print(company_names)

        # Close the cursor
        cursor.close()
    else:
        company_names = []

    # Return the school names as a JSON response
    return jsonify({"company_names": company_names}), 200


# Endpoint for creating a new post
@app.route('/api/contacts', methods=['POST'])
def find_contacts():
    # Get post data from the request
    data = request.json
    u_id = data.get("id")

    print(u_id)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Start a transaction
        cursor.execute('START TRANSACTION')

        # Fetch contacts
        sql = """
            SELECT CONCAT(p.first_name, ' ', p.last_name) AS name, id
            FROM (
                SELECT cw.person2_id AS id
                FROM Connected_With AS cw
                WHERE cw.person1_id = %s
                
                UNION ALL
                
                SELECT cw.person1_id AS id
                FROM Connected_With AS cw
                WHERE cw.person2_id = %s
            ) AS subquery
            JOIN Person AS p ON p.user_id = subquery.id OR p.user_id = %s;
        """

        cursor.execute(sql, (u_id, u_id, u_id))
        contacts = cursor.fetchall()
        print(contacts)
        cursor.execute('COMMIT')

    except Exception as e:
        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')

        # Print the error message
        print(f"An error occurred: {str(e)}")
        contacts = []

    if contacts:
        # Return a success response
        return jsonify({'message': 'Contacts found successfully', 'contacts': contacts}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to find contact'}), 500


# Endpoint for creating a new post
@app.route('/api/get-user-name', methods=['POST'])
def get_user_name():
    # Get post data from the request
    data = request.json
    u_id = data.get("id")

    print(u_id)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    try:
        # Start a transaction
        cursor.execute('START TRANSACTION')

        # Fetch owner details
        cursor.execute("SELECT CONCAT(P.first_name, ' ', P.last_name) AS name "
                       "FROM Person P WHERE user_id = %s", (u_id,))
        owner_name = cursor.fetchone()["name"]

    except Exception as e:
        # Rollback the transaction if an error occurs
        cursor.execute('ROLLBACK')

        # Print the error message
        print(f"An error occurred: {str(e)}")
        owner_name = None

    if owner_name:
        # Return a success response
        return jsonify({'message': 'Contacts found successfully', 'name': owner_name}), 200
    else:
        # Return an error response
        return jsonify({'message': 'Failed to find contact'}), 500


@app.route('/analysis-1', methods=['POST'])
def analysis_page_1():
    data = request.json  # Get the form data from the request body
    print(data)
    des_location = data.get("location")
    des_skill = (data.get("skill"))
    des_start_date = data.get("startDate")
    des_end_date = data.get("endDate")

    print(des_location)
    print(des_skill)
    print(des_start_date)
    print(des_end_date)

    # Convert start and end dates to datetime objects
    start_date = datetime.strptime(des_start_date, "%Y-%m-%d")
    end_date = datetime.strptime(des_end_date, "%Y-%m-%d")

    print("startDate formatted: ", start_date)
    print("endDAte formatted: ", end_date)

    # SQL query to drop the view if it exists
    drop_view_query = """
    DROP VIEW IF EXISTS job_counts_view
    """

    # SQL query to create the view
    create_view_query = f"""
    CREATE VIEW job_counts_view AS
    SELECT SUM(CASE WHEN j_type = 'full-time' THEN 1 ELSE 0 END) AS full_time_job_count,
           SUM(CASE WHEN j_type = 'part-time' THEN 1 ELSE 0 END) AS part_time_job_count,
           SUM(CASE WHEN j_type = 'internship' THEN 1 ELSE 0 END) AS internship_job_count
    FROM Job_Opening
    WHERE j_location LIKE %s AND j_skills LIKE %s
          AND j_timestamp BETWEEN %s AND %s
    """

    # SQL query to retrieve data from the view
    select_view_query = """
    SELECT * FROM job_counts_view
    """

    # Execute the queries
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(drop_view_query)
    cursor.execute(create_view_query, ('%' + des_location + '%', '%' + des_skill + '%', start_date, end_date))
    cursor.execute(select_view_query)
    table = cursor.fetchall()
    print("printing results")
    print(table)

    # Drop the view after fetching the data
    cursor.execute(drop_view_query)

    return jsonify({'table': table}), 200


@app.route('/analysis', methods=['POST'])
def analysis_page_2():
    # SQL query to retrieve jobs between certain dates
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # SQL query to retrieve the top 5 users with the highest average post likes
    cursor.execute(
        "SELECT U.mail_addr, AVG(P.p_like_count) AS avg_likes "
        "FROM User U JOIN Post P ON U.user_id = P.user_id "
        "GROUP BY U.mail_addr "
        "ORDER BY avg_likes DESC "
        "LIMIT 5"
    )

    top_5_users_avg_likes = cursor.fetchall()
    print("Top 5 Users with Highest Average Post Likes:", top_5_users_avg_likes)

    # SQL query to retrieve the user with the minimum number of comments on their post
    cursor.execute(
        "SELECT U.mail_addr AS author_name, MIN(P.p_com_count) AS min_com "
        "FROM User U JOIN Post P ON U.user_id = P.user_id "
        "GROUP BY U.mail_addr "
        "ORDER BY min_com ASC "
        "LIMIT 1"
    )
    user_with_min_comments = cursor.fetchall()
    print("User with Minimum Number of Comments on Their Post:", user_with_min_comments)

    # SQL query to list the top 5 number of applications per organization in descending order
    cursor.execute(
        "SELECT j_organization, COUNT(*) AS application_count "
        "FROM Job_Opening "
        "JOIN Applies_Job ON Job_Opening.j_id = Applies_Job.j_id "
        "GROUP BY j_organization "
        "ORDER BY application_count DESC "
        "LIMIT 5"
    )
    top_5_applications_per_organization = cursor.fetchall()
    print("Top 5 Organizations by Number of Applications (Descending Order):", top_5_applications_per_organization)

    # SQL query to list the name of the author who posted the most liked post
    cursor.execute(
        "SELECT U.mail_addr AS author_name "
        "FROM User U JOIN Post P ON U.user_id = P.user_id "
        "WHERE P.p_like_count = (SELECT MAX(p_like_count) FROM Post)"
    )
    author_most_liked_post = cursor.fetchall()
    print("Author of the Most Liked Post:", author_most_liked_post)

    return jsonify({
        'top_5_users_avg_likes': top_5_users_avg_likes,
        'user_with_min_comments': user_with_min_comments,
        'top_5_applications_per_organization': top_5_applications_per_organization,
        'author_most_liked_post': author_most_liked_post
    }), 200


@app.route('/analysis-3', methods=['POST'])
def custom_query():
    data = request.json  # Get the form data from the request body
    custom_query = data.get("query")

    # Execute the custom query
    cursor = mysql.connection.cursor(MySQLdb.cursors.Cursor)
    cursor.execute(custom_query)
    result = [list(x) for x in cursor.fetchall()]
    print(result)
    column_names = [desc[0] for desc in cursor.description]
    print(column_names)

    return jsonify({'rows': result, 'headers': column_names}), 200


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
