# Student Bridge

![Game Gems Library](https://i.postimg.cc/CKQDdM5X/Screenshot-2026-02-15-at-10-32-34-AM.png)

**StudentBridge** is a full-stack community resource platform that allows users to discover, create, and verify essential resources such as food, housing, health, and education services. The platform includes geolocation mapping, and verification workflows to ensure data reliability.

---

## Links

- **Live App:** ([Netlify](https://student-bridge-dep.netlify.app/))
- **GitHub Repository:** ([Github](https://github.com/gabogara/student-bridge-front-end))
- **Planning:** ([Trello](https://trello.com/b/sXX6cen2/project-4-studentbridge))
- **ERD / Data Model diagram:** ([Made in drawio](https://drive.google.com/file/d/10LHklKdwPWvNp2KfuOo9l2r3TpI8zchH/view?usp=sharing))

---
## Tech Stack

### Frontend
- React
- React Router
- Mapbox GL
- CSS / Flexbox

### Backend
- Flask
- PostgreSQL
- JWT Authentication
- REST API
- Psycopg2

## Features

- **User Authentication**: Registration and login with JWT authentication
- **Resource Management**: Full CRUD functionality for resources
- **Verification System**: Nested verification system for resource validation
- **Category Filtering**: Filter resources by type (food, housing, health, education)
- **Interactive Mapping**: Mapbox integration with geocoded resource locations
- **Secure Access**: Protected routes and conditional UI rendering
- **Data Integrity**: Backend validation and relational integrity

## Data Modeling

The application uses a normalized relational schema with the following entities:

- **Users**: Store user account information
- **Resources**: Community resources with location and category data
- **Verifications**: Validation records for resource accuracy
- **Saves**: User-saved resources for quick access

---