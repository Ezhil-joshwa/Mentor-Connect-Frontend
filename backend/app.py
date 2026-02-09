
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, User, Role, Profile, Dataset, ActivityLog, Notification, File
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

# --- Admin Interface ---
admin = Admin(app, name='Mentor Connect Admin')
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Profile, db.session))
admin.add_view(ModelView(Dataset, db.session))
admin.add_view(ModelView(ActivityLog, db.session))
admin.add_view(ModelView(Notification, db.session))
admin.add_view(ModelView(File, db.session))

# --- Authentication Decorator ---

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1] # Bearer Token
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()}), 200

# --- Auth Routes ---
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Could not verify'}), 401

    user = User.query.filter_by(username=data['username']).first()

    if not user:
        return jsonify({'message': 'User not found'}), 401

    if check_password_hash(user.password, data['password']):
        token = jwt.encode({
            'id': user.id,
            'role': user.role.value,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, app.config['JWT_SECRET_KEY'])
        
        return jsonify({'token': token, 'role': user.role.value, 'username': user.username})

    return jsonify({'message': 'Could not verify'}), 401

@app.route('/api/auth/register', methods=['POST'])
def register():
    # Only Admin can create users in this spec, but for seeding we need a way
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    
    # Check if admin exists
    admin_exist = User.query.filter_by(role=Role.ADMIN).first()
    if admin_exist and data.get('role') == 'admin':
         return jsonify({'message': 'Admin already exists. Cannot create another.'}), 403

    new_user = User(
        username=data['username'], 
        email=data['email'], 
        password=hashed_password, 
        role=Role(data['role'])
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created!'})

# --- User Management (Admin Only) ---
@app.route('/api/users', methods=['GET'])
@token_required
def get_all_users(current_user):
    if current_user.role != Role.ADMIN:
        return jsonify({'message': 'Cannot perform that function!'}), 403
    users = User.query.all()
    output = []
    for user in users:
        output.append(user.to_dict())
    return jsonify({'users': output})

@app.route('/api/users/<user_id>', methods=['GET'])
@token_required
def get_one_user(current_user, user_id):
    if current_user.role != Role.ADMIN and current_user.id != int(user_id):
         return jsonify({'message': 'Unauthorized'}), 403
    
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'message': 'No user found!'})
    return jsonify({'user': user.to_dict()})

# --- Dashboard Data --- 
@app.route('/api/dashboard/stats', methods=['GET'])
@token_required
def get_dashboard_stats(current_user):
    # Dummy data based on role
    if current_user.role == Role.ADMIN:
        return jsonify({
            'total_users': User.query.count(),
            'active_mentors': User.query.filter_by(role=Role.MENTOR).count(),
            'total_students': User.query.filter_by(role=Role.STUDENT).count(),
            'system_health': 'Good'
        })
    elif current_user.role == Role.MENTOR:
        return jsonify({
            'assigned_students': 5,
            'upcoming_meetings': 2,
            'pending_reviews': 1
        })
    else:
        return jsonify({
            'my_mentor': 'Dr. Smith',
            'assignments_due': 3,
            'attendance': '95%'
        })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Create default admin if not exists
        if not User.query.filter_by(role=Role.ADMIN).first():
            print("Creating default admin user...")
            hashed_pw = generate_password_hash("admin123", method='scrypt')
            admin = User(username="admin", email="admin@mentorconnect.com", password=hashed_pw, role=Role.ADMIN)
            db.session.add(admin)
            db.session.commit()
            print("Admin created: admin / admin123")
            
    app.run(debug=True, port=5000)
	
