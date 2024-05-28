import React from 'react';
import { Link } from 'react-router-dom'; 

function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Management Options</h2>
                <Link to="/admin/manage-users">
                    <button>Manage Users</button>
                </Link>
                <Link to="/admin/manage-courses">
                    <button>Manage Courses</button>
                </Link>
                <Link to="/admin/analytics">
                    <button>View Analytics</button>
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboard;
