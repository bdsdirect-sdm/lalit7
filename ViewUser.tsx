// src/ViewUser.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUser.css';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string; // URL to the profile photo
    companyAddress: string;
    companyCity: string;
    companyState: string;
    companyZip: string;
    homeAddress: string;
    homeCity: string;
    homeState: string;
    homeZip: string;
    appointmentLetter: string; // URL to the appointment letter
}

const ViewUser: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const userId = window.location.pathname.split('/').pop(); // Get the user ID from the URL

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div className="view-user">
            <h1>User Details</h1>
            <img src={user.profilePhoto} alt={`${user.firstName} ${user.lastName}`} className="profile-photo" />
            <h3>Personal Information</h3>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <h3>Company Address</h3>
            <p><strong>Address:</strong> {user.companyAddress}</p>
            <p><strong>City:</strong> {user.companyCity}</p>
            <p><strong>State:</strong> {user.companyState}</p>
            <p><strong>ZIP Code:</strong> {user.companyZip}</p>

            <h3>Home Address</h3>
            <p><strong>Address:</strong> {user.homeAddress}</p>
            <p><strong>City:</strong> {user.homeCity}</p>
            <p><strong>State:</strong> {user.homeState}</p>
            <p><strong>ZIP Code:</strong> {user.homeZip}</p>

            <h3>Appointment Letter</h3>
            <a href={user.appointmentLetter} target="_blank" rel="noopener noreferrer">View Appointment Letter</a>

            <button onClick={() => window.location.href = `/edit-user/${userId}`}>Edit User</button>
            <button onClick={() => window.location.href = '/'}>Back to Add User</button>
        </div>
    );
}

export default ViewUser;
