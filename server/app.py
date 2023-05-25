import os

import bcrypt as bcrypt
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import rds_db as db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Initialize Flask-CORS
mysql = MySQL(app)


# db.create_tables()

@app.route('/')
@app.route('/login', methods=['POST'])
def login():
    # Retrieve the login data from the request
    login_data = request.get_json()

    # Extract the email and password from the login data
    email = login_data.get('email')
    password = login_data.get('password')

    # Perform authentication logic
    cursor = db.get_cursor()
    cursor.execute('SELECT * FROM User WHERE mail_addr = %s', email)
    user = cursor.fetchone()

    if user:
        # Compare the hashed passwords
        if bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            # Passwords match
            session['loggedIn'] = True
            session['user_id'] = user['user_id']
            session['email'] = user['mail_addr']
            message = 'Logged in successfully!'
            return redirect(url_for('home'))
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

    # Perform additional operations, such as storing the data in a database
    print(name, surname, email, password, phone, day, month, year, gender)

    # Create a response object
    response = {'message': 'Signup successful'}

    return jsonify(response)


@app.route('/register', methods=['GET', 'POST'])
def register():
    message = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM User WHERE username = % s', (username,))
        account = cursor.fetchone()
        if account:
            message = 'Choose a different username!'

        elif not username or not password or not email:
            message = 'Please fill out the form!'

        else:
            cursor.execute('INSERT INTO User (id, username, email, password) VALUES (NULL, % s, % s, % s)',
                           (username, email, password,))
            mysql.connection.commit()
            message = 'User successfully created!'

    elif request.method == 'POST':
        message = 'Please fill all the fields!'
    return render_template('register.html', message=message)


@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    headers = []
    username = session['username']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT id FROM User WHERE username = %s', (username,))
    user_id = cursor.fetchone()["id"]
    cursor.execute('SELECT * FROM TaskType')
    task_types = [item['type'] for item in cursor.fetchall()]
    cursor.execute('SELECT * FROM Task WHERE user_id = %s AND done_time IS NULL ORDER BY deadline ASC', (user_id,))
    todo_tasks = cursor.fetchall()
    cursor.execute('SELECT * FROM Task WHERE user_id = %s AND done_time IS NOT NULL ORDER BY done_time DESC',
                   (user_id,))
    finished_tasks = cursor.fetchall()

    message = request.args.get('message')
    if message and message == "3":
        message = "Task status changed successfully!"

    return render_template('tasks.html', headers=headers, todo_tasks=todo_tasks, finished_tasks=finished_tasks,
                           task_types=task_types, message=message)


@app.route('/add_task', methods=['POST'])
def add_task():
    task_id = int(request.form['task_id'])
    title = request.form['title']
    description = request.form['description']
    status = "Todo"
    deadline = request.form['deadline']
    task_type = request.form['task_type']
    username = session['username']

    # create cursor
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute('SELECT * FROM TaskType WHERE type = %s', (task_type,))
    found = cursor.fetchone()

    if not found:
        # insert new task type into TaskType table
        cursor.execute('INSERT INTO TaskType VALUES (%s)', (task_type,))
        mysql.connection.commit()

    cursor.execute('SELECT id FROM User WHERE username = %s', (username,))
    user_id = cursor.fetchone()["id"]

    # Get the current time
    creation_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # execute query to insert new task or update existing task
    if task_id == -1:
        cursor.execute(
            'INSERT INTO Task (title, description, status, deadline, creation_time, user_id, task_type) '
            'VALUES (%s, %s, %s, %s, %s, %s, %s)',
            (title, description, status, deadline, creation_time, int(user_id), task_type))
        message = "Task added successfully!"
    else:
        cursor.execute(
            'UPDATE Task SET title=%s, description=%s, deadline=%s, creation_time=%s, task_type=%s WHERE id=%s',
            (title, description, deadline, creation_time, task_type, task_id))
        message = "Task updated successfully!"

    # commit changes
    mysql.connection.commit()

    # close cursor
    cursor.close()

    return redirect(url_for('tasks', message=message))


@app.route('/delete_task', methods=['POST'])
def delete_task():
    # Get the task ID from the request data
    task_id = request.form['task_id']

    # create cursor
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # execute query to delete task with the given ID
    cursor.execute('DELETE FROM Task WHERE id = %s', (task_id,))

    # commit changes
    mysql.connection.commit()

    # close cursor
    cursor.close()

    message = "Task deleted successfully!"
    return jsonify({'message': message, 'type': 2})


@app.route('/toggle_task', methods=['POST'])
def toggle_task():
    # Get the task ID from the request data
    task_id = request.form['task_id']

    # create cursor
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # retrieve the task from the database
    cursor.execute('SELECT * FROM Task WHERE id = %s', (task_id,))
    task = cursor.fetchone()

    # determine the new status based on the current status
    new_status = 'Todo' if task['status'] == 'Done' else 'Done'

    # update the database with the new status
    if new_status == 'Done':
        done_time = datetime.now()
    else:
        done_time = None
    cursor.execute('UPDATE Task SET status = %s, done_time = %s WHERE id = %s', (new_status, done_time, task_id))

    # commit changes
    mysql.connection.commit()

    # close cursor
    cursor.close()

    return "OK"


@app.route('/logout', methods=['GET'])
def logout():
    session['loggedin'] = None
    session['userid'] = None
    session['username'] = None
    session['email'] = None
    message = "Logged out successfully"
    return render_template('login.html', message=message)


@app.route('/analysis', methods=['GET', 'POST'])
def analysis():
    # create cursor
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # get user id from session
    user_id = session['userid']

    # 1. execute query to list the title and latency of overdue tasks
    cursor.execute(
        'SELECT title, TIMESTAMPDIFF(SECOND, deadline, done_time) AS latency FROM Task '
        'WHERE user_id = %s AND done_time > deadline',
        (user_id,))

    # fetch all results
    overdue_tasks = cursor.fetchall()

    # 2. execute query to calculate the average task completion time
    cursor.execute(
        'SELECT AVG(TIMESTAMPDIFF(SECOND, creation_time, done_time)) AS avg_completion_time '
        'FROM Task WHERE user_id = %s AND done_time IS NOT NULL',
        (user_id,))

    # fetch result
    result = cursor.fetchone()

    # 3. execute query to list the completed tasks per task type
    cursor.execute(
        'SELECT task_type, COUNT(*) AS num_completed_tasks FROM Task '
        'WHERE user_id = %s AND done_time IS NOT NULL GROUP BY task_type ORDER BY num_completed_tasks DESC',
        (user_id,))

    # fetch all results
    completed_tasks_by_type = cursor.fetchall()

    # 4. List the title and deadline of uncompleted tasks in increasing order of deadlines (for the user)
    cursor.execute('SELECT title, deadline FROM Task WHERE user_id = %s AND done_time IS NULL ORDER BY deadline ASC',
                   (user_id,))
    uncompleted_tasks = cursor.fetchall()

    # 5. List the title and task completion time of the top 2 completed tasks that took
    # the most time, in descending order (for the user)
    cursor.execute(
        'SELECT title, TIMESTAMPDIFF(SECOND , creation_time, done_time) AS completion_time '
        'FROM Task WHERE user_id = %s AND done_time IS NOT NULL ORDER BY completion_time DESC LIMIT 2',
        (user_id,))
    top_completed_tasks = cursor.fetchall()

    # close cursor
    cursor.close()

    return render_template('analysis.html', overdue_tasks=overdue_tasks or [],
                           avg_completion_time=result['avg_completion_time'],
                           completed_tasks_by_type=completed_tasks_by_type or [],
                           uncompleted_tasks=uncompleted_tasks or [],
                           top_completed_tasks=top_completed_tasks or [])


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
