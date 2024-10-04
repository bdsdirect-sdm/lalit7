// src/AddUser.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';

const AddUser: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyState, setCompanyState] = useState('');
    const [companyZip, setCompanyZip] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [homeCity, setHomeCity] = useState('');
    const [homeState, setHomeState] = useState('');
    const [homeZip, setHomeZip] = useState('');
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
    const [appointmentLetterFile, setAppointmentLetterFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('companyAddress', companyAddress);
        formData.append('companyCity', companyCity);
        formData.append('companyState', companyState);
        formData.append('companyZip', companyZip);
        formData.append('homeAddress', homeAddress);
        formData.append('homeCity', homeCity);
        formData.append('homeState', homeState);
        formData.append('homeZip', homeZip);

        if (profilePhotoFile) {
            formData.append('profilePhoto', profilePhotoFile);
        }
        if (appointmentLetterFile) {
            formData.append('appointmentLetter', appointmentLetterFile);
        }

        try {
            const response = await axios.post("http://localhost:5001/api/users", formData);
            alert("User added successfully!");

            // Redirect to the ViewUser page with the new user's ID
            const userId = response.data.userId; // Ensure your backend sends back the userId
            window.location.href = `/view-user/${userId}`;
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user.");
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setCompanyAddress('');
        setCompanyCity('');
        setCompanyState('');
        setCompanyZip('');
        setHomeAddress('');
        setHomeCity('');
        setHomeState('');
        setHomeZip('');
        setProfilePhotoFile(null);
        setAppointmentLetterFile(null);
    };

    return (
        <form onSubmit={handleSubmit} className='main'>
            <h1>Add User</h1>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /><br />

            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required /><br />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

            <h3>Company Address</h3>
            <label>Address:</label>
            <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required /><br />

            <label>City:</label>
            <input type="text" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)} required /><br />

            <label>State:</label>
            <input type="text" value={companyState} onChange={(e) => setCompanyState(e.target.value)} required /><br />

            <label>ZIP Code:</label>
            <input type="text" value={companyZip} onChange={(e) => setCompanyZip(e.target.value)} required pattern="\d{6}" title="Must be exactly 6 digits." /><br />

            <h3>Home Address</h3>
            <label>Address:</label>
            <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required /><br />

            <label>City:</label>
            <input type="text" value={homeCity} onChange={(e) => setHomeCity(e.target.value)} required /><br />

            <label>State:</label>
            <input type="text" value={homeState} onChange={(e) => setHomeState(e.target.value)} required /><br />

            <label>ZIP Code:</label>
            <input type="text" value={homeZip} onChange={(e) => setHomeZip(e.target.value)} required pattern="\d{6}" title="Must be exactly 6 digits." /><br />

            <label>Profile Photo:</label>
            <input type="file" accept=".png,.jpg,.jpeg" onChange={(e) => e.target.files && setProfilePhotoFile(e.target.files[0])} /><br />

            <label>Appointment Letter:</label>
            <input type="file" accept=".pdf" onChange={(e) => e.target.files && setAppointmentLetterFile(e.target.files[0])} /><br />

            <button type="submit">Submit</button>
            <button type="button" onClick={resetForm}>Cancel</button>
        </form>
    );
}

export default AddUser;

// now create code for ViewUser.tsx such that it shows all data of user and profile photo too 

