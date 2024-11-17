# Contact Management System

A modern, full-stack Contact Management System built with React, Node.js, and PostgreSQL. This system allows users to manage their contacts efficiently with features like sorting, pagination, and real-time updates.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete contacts
- **Responsive UI**: Built with Material-UI components
- **Data Validation**: Client and server-side validation
- **Sorting & Pagination**: Easy navigation through contact lists
- **Real-time Updates**: Immediate UI updates after operations
- **Error Handling**: Comprehensive error management
- **Data Persistence**: PostgreSQL database with proper indexing

## Tech Stack

### Frontend
- React.js
- Material-UI components
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- Node-postgres (pg) for database connectivity

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm package manager

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```
PORT=5000
MONGO_URI= your mongoDB URI
```

4. Start the server:
```bash
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### GET /api/contacts
- Retrieves all contacts
- Supports pagination and sorting

### POST /api/contacts
- Creates a new contact
- Required fields: firstName, lastName, email, phoneNumber, company, jobTitle

### PUT /api/contacts/:id
- Updates an existing contact
- Requires all fields

### DELETE /api/contacts/:id
- Deletes a contact

## Technical Decisions

1. **Database Choice**: MongoDB was chosen for:
   - ACID compliance
   - Robust indexing capabilities
   - Support for complex queries
   - Data integrity constraints

2. **Frontend Architecture**:
   - Component-based structure for reusability
   - Custom hooks for data fetching
   - Context API for state management
   - Material-UI for consistent design

3. **Backend Architecture**:
   - RESTful API design
   - Middleware for validation
   - Error handling middleware
   - Connection pooling for database efficiency

## Challenges and Solutions

1. **Real-time Updates**
   - Challenge: Keeping the UI in sync with database changes
   - Solution: Implemented optimistic updates and proper error handling

2. **Form Validation**
   - Challenge: Maintaining consistent validation across client and server
   - Solution: Created shared validation schemas and comprehensive error messages

3. **Performance**
   - Challenge: Handling large contact lists efficiently
   - Solution: Implemented pagination and proper indexing in the database

4. **Data Integrity**
   - Challenge: Preventing duplicate entries and maintaining data consistency
   - Solution: Added unique constraints and proper validation at both ends

## Future Improvements

1. Add search functionality
2. Implement filtering options
3. Add bulk import/export features
4. Implement user authentication
5. Add contact grouping features
6. Implement activity logging

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.