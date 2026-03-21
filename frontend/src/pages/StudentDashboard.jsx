import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import studentAPI from '../services/api';
import Navbar from '../components/Navbar';

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await studentAPI.get('/progress/enrolled/courses');
                setCourses(res.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const completedCount = courses.filter(c => parseFloat(c.completion_percentage) >= 100).length;
    const inProgressCount = courses.filter(c => parseFloat(c.completion_percentage) > 0 && parseFloat(c.completion_percentage) < 100).length;
    const avgProgress = courses.length > 0
        ? (courses.reduce((sum, c) => sum + parseFloat(c.completion_percentage || 0), 0) / courses.length).toFixed(1)
        : 0;

    const lastAccessed = courses.length > 0
        ? courses.reduce((latest, c) => {
            const d = new Date(c.enrolled_at);
            return d > new Date(latest.enrolled_at) ? c : latest;
        }, courses[0])
        : null;

    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    if (loading) {
        return (
            <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <p style={{ color: '#6b7280', fontSize: '15px' }}>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <Navbar />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 48px' }}>

                {/* Welcome */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    marginBottom: '28px',
                }}>
                    <div style={{
                        width: '52px', height: '52px', borderRadius: '50%',
                        backgroundColor: '#1c1d1f', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '20px', fontWeight: 700,
                    }}>{initials}</div>
                    <h1 style={{
                        fontSize: '28px', fontWeight: 700, color: '#1c1d1f', margin: 0,
                    }}>Welcome Back, {user?.name?.split(' ').pop() || user?.name}</h1>
                </div>

                {/* Hero Banner - Blue like Figma */}
                <div style={{
                    background: 'linear-gradient(135deg, #8ea8d4 0%, #7b9acc 30%, #6b8bbf 60%, #5a7db5 100%)',
                    borderRadius: '0', padding: '0', marginBottom: '36px',
                    position: 'relative', overflow: 'hidden', height: '260px',
                    display: 'flex', alignItems: 'center',
                }}>
                    {/* Decorative shapes */}
                    <div style={{
                        position: 'absolute', top: '20px', right: '60px',
                        width: '180px', height: '180px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.08)',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-20px', right: '200px',
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.06)',
                    }} />
                    <div style={{
                        position: 'absolute', top: '-30px', right: '300px',
                        width: '80px', height: '80px', borderRadius: '12px',
                        background: 'rgba(255,255,255,0.05)', transform: 'rotate(30deg)',
                    }} />
                    <div style={{
                        position: 'absolute', top: '40px', right: '120px',
                        width: '50px', height: '50px', borderRadius: '8px',
                        background: 'rgba(255,255,255,0.07)', transform: 'rotate(15deg)',
                    }} />

                    {/* Text Card */}
                    <div style={{
                        backgroundColor: 'rgba(28,29,31,0.85)', borderRadius: '4px',
                        padding: '28px 32px', marginLeft: '48px', maxWidth: '380px',
                        position: 'relative', zIndex: 1,
                    }}>
                        <h2 style={{
                            fontSize: '26px', fontWeight: 700, color: '#fff',
                            margin: '0 0 10px', lineHeight: '1.2',
                        }}>Move forward on your goals</h2>
                        <p style={{
                            fontSize: '13px', color: 'rgba(255,255,255,0.75)',
                            margin: '0 0 18px', lineHeight: '1.5',
                        }}>
                            Track your progress across all courses. Complete lectures to unlock milestones.
                        </p>
                        {lastAccessed && (
                            <button
                                onClick={() => navigate(`/student/course/${lastAccessed.id}`)}
                                style={{
                                    padding: '10px 20px', backgroundColor: '#fff',
                                    color: '#1c1d1f', border: 'none', fontSize: '14px',
                                    fontWeight: 700, cursor: 'pointer',
                                }}
                            >
                                Continue learning
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0', marginBottom: '40px',
                    border: '1px solid #d1d5db',
                }}>
                    {[
                        { label: 'ENROLLED COURSES', value: courses.length },
                        { label: 'COMPLETED', value: completedCount },
                        { label: 'IN PROGRESS', value: inProgressCount },
                        { label: 'AVERAGE PROGRESS', value: `${avgProgress}%` },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            padding: '22px 24px',
                            borderRight: i < 3 ? '1px solid #d1d5db' : 'none',
                        }}>
                            <p style={{
                                fontSize: '11px', color: '#6b7280', margin: '0 0 10px',
                                fontWeight: 700, letterSpacing: '0.8px',
                            }}>{stat.label}</p>
                            <p style={{
                                fontSize: '34px', fontWeight: 700, color: '#1c1d1f', margin: 0,
                            }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Let's start learning */}
                <h2 style={{
                    fontSize: '24px', fontWeight: 700, color: '#1c1d1f',
                    margin: '0 0 4px', fontFamily: 'serif',
                }}>Let's start learning</h2>
                <p style={{
                    fontSize: '14px', color: '#6b7280', margin: '0 0 22px',
                }}>Your enrolled courses with progress tracking</p>

                {/* Course Cards */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '20px', marginBottom: '48px',
                }}>
                    {courses.map(course => {
                        const percent = parseFloat(course.completion_percentage || 0);
                        const isStarted = percent > 0;
                        const isComplete = percent >= 100;

                        return (
                            <div
                                key={course.id}
                                style={{
                                    border: '1px solid #d1d5db', overflow: 'hidden',
                                    cursor: 'pointer', transition: 'box-shadow 0.15s',
                                }}
                                onClick={() => navigate(`/student/course/${course.id}`)}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                            >
                                <div style={{
                                    height: '130px', backgroundColor: '#1c1d1f',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    <span style={{
                                        color: '#fff', fontSize: '15px', fontWeight: 600,
                                        textAlign: 'center', padding: '0 28px',
                                    }}>{course.title}</span>
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        height: '4px', backgroundColor: '#2d2f31',
                                    }}>
                                        <div style={{
                                            height: '100%', width: `${percent}%`,
                                            backgroundColor: isComplete ? '#34d399' : '#a855f7',
                                            transition: 'width 0.3s',
                                        }} />
                                    </div>
                                </div>

                                <div style={{ padding: '16px 20px' }}>
                                    <p style={{
                                        fontSize: '16px', fontWeight: 700, color: '#1c1d1f',
                                        margin: '0 0 2px',
                                    }}>{course.title}</p>
                                    <p style={{
                                        fontSize: '12px', color: '#6b7280', margin: '0 0 14px',
                                    }}>Instructor Karim</p>

                                    <div style={{
                                        height: '8px', backgroundColor: '#e5e7eb',
                                        overflow: 'hidden', marginBottom: '8px',
                                    }}>
                                        <div style={{
                                            height: '100%', width: `${percent}%`,
                                            backgroundColor: isComplete ? '#34d399' : '#a855f7',
                                            transition: 'width 0.3s',
                                        }} />
                                    </div>

                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        marginBottom: '16px',
                                    }}>
                                        <span style={{ fontSize: '13px', color: '#6b7280' }}>
                                            {course.completed_lectures} of {course.total_lectures} lectures
                                        </span>
                                        <span style={{
                                            fontSize: '14px', fontWeight: 700,
                                            color: isComplete ? '#059669' : percent > 0 ? '#a855f7' : '#9ca3af',
                                        }}>
                                            {percent.toFixed(0)}% complete
                                        </span>
                                    </div>

                                    <button style={{
                                        width: '100%', padding: '12px',
                                        fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                                        ...(isStarted ? {
                                            backgroundColor: '#1c1d1f', color: '#fff', border: 'none',
                                        } : {
                                            backgroundColor: '#fff', color: '#1c1d1f',
                                            border: '2px solid #1c1d1f',
                                        }),
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                    >
                                        {isComplete ? 'Completed' : isStarted ? 'Continue learning' : 'Start course'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Milestones */}
                <h2 style={{
                    fontSize: '24px', fontWeight: 700, color: '#1c1d1f',
                    margin: '0 0 4px', fontFamily: 'serif',
                }}>Your milestones</h2>
                <p style={{
                    fontSize: '14px', color: '#6b7280', margin: '0 0 22px',
                }}>Complete courses to unlock achievements</p>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0', marginBottom: '48px',
                    border: '1px solid #d1d5db',
                }}>
                    {[
                        { pct: 25, label: 'Getting started', icon: '🚀', achColor: '#7c3aed', achBg: '#f5f3ff' },
                        { pct: 50, label: 'Halfway there', icon: '🔥', achColor: '#2563eb', achBg: '#eff6ff' },
                        { pct: 75, label: 'Almost done', icon: '⭐', achColor: '#d97706', achBg: '#fffbeb' },
                        { pct: 100, label: 'Course master', icon: '🏆', achColor: '#059669', achBg: '#ecfdf5' },
                    ].map((m, i) => {
                        const achieved = courses.some(c => parseFloat(c.completion_percentage) >= m.pct);
                        return (
                            <div key={m.pct} style={{
                                padding: '28px 20px', textAlign: 'center',
                                borderRight: i < 3 ? '1px solid #d1d5db' : 'none',
                                backgroundColor: achieved ? m.achBg : '#fff',
                            }}>
                                <span style={{
                                    fontSize: '36px', display: 'block', marginBottom: '10px',
                                }}>
                                    {achieved ? m.icon : '🔒'}
                                </span>
                                <p style={{
                                    fontSize: '26px', fontWeight: 700,
                                    color: achieved ? m.achColor : '#1c1d1f',
                                    margin: '0 0 4px',
                                }}>{m.pct}%</p>
                                <p style={{
                                    fontSize: '14px', fontWeight: 600,
                                    color: achieved ? m.achColor : '#6b7280',
                                    margin: '0 0 8px',
                                }}>{m.label}</p>
                                <span style={{
                                    display: 'inline-block', padding: '4px 14px',
                                    fontSize: '12px', fontWeight: 700,
                                    ...(achieved ? {
                                        backgroundColor: m.achColor, color: '#fff',
                                    } : {
                                        backgroundColor: '#f3f4f6', color: '#9ca3af',
                                    }),
                                }}>
                                    {achieved ? 'UNLOCKED' : 'LOCKED'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}