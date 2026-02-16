# Student Bridge

![Game Gems Library](https://i.postimg.cc/CKQDdM5X/Screenshot-2026-02-15-at-10-32-34-AM.png)

**StudentBridge** is a full-stack community resource platform that allows users to discover, create, and verify essential resources such as food, housing, health, and education services. The platform includes geolocation mapping, and verification workflows to ensure data reliability.

---

## Links

- **Live App:** ([Netlify](https://student-bridge-dep.netlify.app/))
- **Backend GitHub Repository:** ([Github](https://github.com/gabogara/student-bridge-back-end))
- **Planning:** ([Trello](https://trello.com/b/sXX6cen2/project-4-studentbridge))
- **ERD / Data Model diagram:** ([Made in drawio](https://drive.google.com/file/d/10LHklKdwPWvNp2KfuOo9l2r3TpI8zchH/view?usp=sharing))

---
## Core Features

- **User Authentication**: Registration and login with JWT authentication
- **Resource Management**: Full CRUD functionality for resources
- **Verification System**: Nested verification system for resource validation
- **Category Filtering**: Filter resources by type (food, housing, health, education)
- **Interactive Mapping**: Mapbox integration with geocoded resource locations
- **Secure Access**: Protected routes and conditional UI rendering
- **Data Integrity**: Backend validation and relational integrity

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

---

## Frontend Setup

The frontend repository contains the React application.

### Installation

1. **Clone the frontend repository**
```bash
   git clone https://github.com/gabogara/student-bridge-front-end.git
   cd student-bridge-front-end
```

2. **Install dependencies**
```bash
   npm install
```
3. StudentBridge uses the Mapbox API to geocode resource addresses and display them on interactive maps.

You must generate a Mapbox access token:

   i. Create an account at https://www.mapbox.com/
   ii. Navigate to your Account Dashboard.
   iii. Copy your **Default Public Token**.


4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
```env
   VITE_BACK_END_SERVER_URL=http://127.0.0.1:5000/
   VITE_MAPBOX_TOKEN=your_mapbox_token
```

5. **Start the development server**
```bash
   npm run dev
```

6. Open your browser at the URL shown in the terminal (typically [http://localhost:5173](http://localhost:5173))

---

### Backend Setup

The backend implementation for StudentBridge can be accessed at the following repository:  
[Backend](https://github.com/gabogara/student-bridge-back-end.git)

---
## Future Improvements

- Build an admin dashboard with analytics (most verified resources, user activity, category trends).
- Add pagination and performance optimizations for large datasets.
- Implement automated verification scoring based on community feedback.
- Enable image uploads for resources with secure cloud storage integration.


## Attributions

- Landing page illustration provided by Freepik.  
  Proper license terms apply according to Freepik usage policies.  
  https://www.freepik.com/premium-vector/map-navigations-illustration-landing-page-template_4617447.htm

- Project logo designed using Canva.  
  https://www.canva.com/
