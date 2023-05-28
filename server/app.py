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


# Endpoint for creating a new post
@app.route('/home-blog', methods=['POST'])
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
