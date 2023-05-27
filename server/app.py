import os
from datetime import datetime

import bcrypt as bcrypt
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import rds_db as db
from flask_cors import CORS, cross_origin
from flask_session import Session

app = Flask(__name__)

app.secret_key = "27eduCBA09"
app.config['SESSION_TYPE'] = 'filesystem'
app.config.from_object(__name__)
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
Session(app)
CORS(app)  # Initialize Flask-CORS
mysql = MySQL(app)

# Initiate database
db.create_tables()
db.populate_table()


@app.route('/')
@app.route('/login', methods=['POST'])
def login():
    session.permanent = True

    # Retrieve the login data from the request
    login_data = request.get_json()
    session["test"] = "12345"
    # Extract the email and password from the login data
    email = login_data['email']
    password = login_data['password']

    print(session.sid)
    # Perform authentication logic
    cursor = db.get_cursor()
    cursor.execute('SELECT user_id, mail_addr, password FROM User WHERE mail_addr = %s', email)

    user = db.fetch_one(cursor)

    if user:
        print("adsadasdad")
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
def createOrganization():
    form_data = request.json  # Get the form data from the request body
    # Process the form data and perform any necessary operations (e.g., database storage, validation, etc.)

    # Assuming the form data contains the fields: name, surname, email, phone, password, day, month, year, gender
    org_name = form_data['organizationName']
    org_type = form_data['organizationType']
    org_size = form_data['organizationSize']
    org_address = form_data['organizationAddress']
    org_website = form_data['organizationWebsite']
    comp_industry = form_data['companyIndustry']
    comp_type = form_data['companyType']
    ins_type = form_data['institutionType']
    org_email = form_data['email']
    org_password = form_data['password']

    print(org_name, org_type, org_size, org_address, org_website, org_industry)

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
            cursor.execute('INSERT INTO User (mail_addr, password, phone_no) VALUES (%s, %s, %s)',
                           (email, hashed_password, phone))
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


@app.route('/blogEditor', methods=['POST'])
def blog_editor():
    data = request.json  # Get the form data from the request body
    print(data)

    return jsonify(data)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
