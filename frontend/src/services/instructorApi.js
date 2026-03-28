const BASE_URL = import.meta.env.VITE_INSTRUCTOR_API_URL || 'http://localhost:5001/api';

export const getOverview = async () => {
    const res = await fetch(`${BASE_URL}/instructor/overview`);
    const data = await res.json();
    return data.data;
};

export const getStudents = async () => {
    const res = await fetch(`${BASE_URL}/instructor/students`);
    const data = await res.json();
    return data.data;
};

export const getEngagement = async () => {
    const res = await fetch(`${BASE_URL}/instructor/engagement`);
    const data = await res.json();
    return data.data;
};
