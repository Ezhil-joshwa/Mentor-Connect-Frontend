
# 📊 Dataset Documentation & Data Dictionary

This document details the database schema, data types, and required fields for the Mentor Connect System.

## 💾 Core Datasets

### 1. **Users** (`users` table)
| Field Name | Data Type | Required | Description | Example Value |
| --- | --- | --- | --- | --- |
| `id` | Integer | Yes | Unique Identification number | 1, 2, 3 |
| `username` | String(80) | Yes | Login username, must be unique | `admin`, `john_doe` |
| `email` | String(120) | Yes | Contact email address | `admin@example.com` |
| `password` | String(255) | Yes | Bcrypt hashed password string | `$2b$12$...` |
| `role` | Enum | Yes | One of: `admin`, `mentor`, `student` | `mentor` |
| `is_active` | Boolean | No | Account status (default True) | `True` |

### 2. **Notifications** (`notifications` table)
| Field Name | Data Type | Required | Description | Example Value |
| --- | --- | --- | --- | --- |
| `id` | Integer | Yes | Unique ID | 101 |
| `user_id` | Integer | Yes | Foreign Key to User | 5 |
| `message` | String(255) | Yes | The alert content | `You have a new meeting.` |
| `is_read` | Boolean | No | Has the user seen it? | `False` |

### 3. **Profiles** (`profiles` table)
| Field Name | Data Type | Required | Description | Example Value |
| --- | --- | --- | --- | --- |
| `user_id` | Integer | Yes | Foreign Key to User | 1 |
| `full_name` | String(100) | No | User's full display name | `Dr. Sarah Connor` |
| `bio` | Text | No | Short biography or description | `Expert in Computer Science` |
| `department` | String(50) | No | Academic Department | `Computer Science` |

---

## 🔑 Administrative Access

**Default Super Admin Credentials** (Automatically seeded on first run):

- **Username**: `admin`
- **Password**: `admin123`

---

## 🧪 Testing Data (Sample Users)

To test the system roles, you can create the following users via the Admin Dashboard or API:

**Mentor Role:**
- Username: `mentor1`
- Password: `password123`

**Student Role:**
- Username: `student1`
- Password: `password123`

---

## 📑 CSV Export Format

The system allows Admins to export User data as CSV. The exported file structure will be:

```csv
ID,Username,Email,Role,Is Active,Created At
1,admin,admin@test.com,admin,true,2024-01-01T12:00:00
2,mentor1,mentor@test.com,mentor,true,2024-01-02T14:30:00
```
	
