import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import studentAPI from '../services/api';
import Navbar from '../components/Navbar';
import Footer1 from '../components/Footer1';
import Footer2 from '../components/Footer2';
import LearningStreak from '../components/LearningStreak';
import WeeklyProgress from '../components/WeeklyProgress';
import CourseCarousel from '../components/CourseCarousel';

const float = {
    onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; },
    onMouseLeave: (e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; },
};

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    const [bannerIdx, setBannerIdx] = useState(0);

   const bannerImages = [
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1400&q=90',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=90',
    
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=90',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1400&q=90',
];

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

    useEffect(() => {
        const timer = setInterval(() => {
            setBannerIdx(prev => (prev + 1) % bannerImages.length);
        }, 1800);
        return () => clearInterval(timer);
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
            <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <p style={{ color: '#6b7280', fontSize: '15px' }}>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#e6e6e6' }}>
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

                {/* Hero Banner */}
                {/* Hero Banner Slider */}
<div style={{
    borderRadius: '12px', marginBottom: '36px',
    position: 'relative', overflow: 'hidden', height: '500px',
    cursor: 'default',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
}}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
>
    <div style={{
        display: 'flex', height: '100%',
        transform: `translateX(-${bannerIdx * 100}%)`,
        transition: 'transform 0.6s ease-in-out',
    }}>
        {bannerImages.map((img, i) => (
            <div key={i} style={{
                minWidth: '100%', height: '100%',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} />
        ))}
    </div>

    <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
    }} />

    <div style={{
        position: 'absolute', top: '50%', left: '48px',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(28,29,31,0.88)', borderRadius: '8px',
        padding: '32px 36px', maxWidth: '380px', zIndex: 2,
    }}>
        <h2 style={{
            fontSize: '28px', fontWeight: 700, color: '#fff',
            margin: '0 0 12px', lineHeight: '1.2',
        }}>Move forward on your goals</h2>
        <p style={{
            fontSize: '14px', color: 'rgba(255,255,255,0.75)',
            margin: '0 0 20px', lineHeight: '1.6',
        }}>Track your progress across all courses. Complete lectures to unlock milestones.</p>
        {lastAccessed && (
            <button onClick={() => navigate(`/student/course/${lastAccessed.id}`)}
                style={{
                    padding: '12px 24px', backgroundColor: '#fff',
                    color: '#1c1d1f', border: 'none', fontSize: '15px',
                    fontWeight: 700, cursor: 'pointer', borderRadius: '4px',
                }}>Continue learning</button>
        )}
    </div>

    <div onClick={() => setBannerIdx(prev => prev === 0 ? bannerImages.length - 1 : prev - 1)}
        style={{
            position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '42px', height: '42px', borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 3,
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
    </div>

    <div onClick={() => setBannerIdx(prev => (prev + 1) % bannerImages.length)}
        style={{
            position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '42px', height: '42px', borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 3,
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
    </div>

    <div style={{
        position: 'absolute', bottom: '16px', left: '50%',
        transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3,
    }}>
        {bannerImages.map((_, i) => (
            <div key={i} onClick={() => setBannerIdx(i)}
                style={{
                    width: i === bannerIdx ? '24px' : '8px', height: '8px',
                    borderRadius: '4px',
                    backgroundColor: i === bannerIdx ? '#fff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                }} />
        ))}
    </div>
</div>
                   

                  
                {/* Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px', marginBottom: '40px',
                }}>
                    {[
                        { label: 'ENROLLED COURSES', value: courses.length, icon: '📚', accent: '#020202' },
                        { label: 'COMPLETED', value: completedCount, icon: '✅', accent: '#107008' },
                        { label: 'IN PROGRESS', value: inProgressCount, icon: '📖', accent: '#11968f' },
                        { label: 'AVERAGE PROGRESS', value: `${avgProgress}%`, icon: '📊', accent: '#162be2' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            padding: '24px', borderRadius: '12px',
                            backgroundColor: '#ded2e4', border: '1.5px solid #91209b',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'default',
                        }}
                            onMouseEnter={float.onMouseEnter}
                            onMouseLeave={float.onMouseLeave}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <p style={{
                                    fontSize: '11px', color: '#6b7280', margin: 0,
                                    fontWeight: 700, letterSpacing: '0.8px',
                                }}>{stat.label}</p>
                                <span style={{ fontSize: '20px' }}>{stat.icon}</span>
                            </div>
                            <p style={{
                                fontSize: '36px', fontWeight: 700, color: stat.accent, margin: 0,
                            }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Learning Streak + Weekly Progress */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: '30px', marginBottom: '40px',
                }}>
                    <div style={{
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', borderRadius: '16px', height: '100%'
                    }}
                        onMouseEnter={float.onMouseEnter} onMouseLeave={float.onMouseLeave}>
                        <LearningStreak />
                    </div>
                    <div style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease', borderRadius: '16px' }}
                        onMouseEnter={float.onMouseEnter} onMouseLeave={float.onMouseLeave}>
                        <WeeklyProgress courses={courses} />
                    </div>
                </div>

                {/* Carousel */}
                <CourseCarousel courses={courses} />

                {/* Let's start learning */}
                <h2 style={{
                    fontSize: '24px', fontWeight: 700, color: '#1c1d1f',
                    margin: '0 0 4px',
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
                                    border: '1px solid #e5e7eb', overflow: 'hidden',
                                    borderRadius: '12px', backgroundColor: '#fff',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    position: 'relative',
                                }}
                                onClick={() => navigate(`/student/course/${course.id}`)}
                                onMouseEnter={float.onMouseEnter}
                                onMouseLeave={float.onMouseLeave}
                            >
                                <div style={{
                                    height: '140px',
                                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    <span style={{
                                        color: '#fff', fontSize: '16px', fontWeight: 600,
                                        textAlign: 'center', padding: '0 28px',
                                    }}>{course.title}</span>
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        height: '4px', backgroundColor: 'rgba(255,255,255,0.1)',
                                    }}>
                                        <div style={{
                                            height: '100%', width: `${percent}%`,
                                            backgroundColor: isComplete ? '#34d399' : '#a435f0',
                                            transition: 'width 0.4s',
                                        }} />
                                    </div>
                                </div>

                                <div style={{ padding: '18px 22px' }}>
                                    <p style={{
                                        fontSize: '17px', fontWeight: 700, color: '#1c1d1f',
                                        margin: '0 0 4px',
                                    }}>{course.title}</p>
                                    <p style={{
                                        fontSize: '13px', color: '#6b7280', margin: '0 0 16px',
                                    }}>Instructor Karim</p>

                                    <div style={{
                                        height: '8px', backgroundColor: '#e5e7eb',
                                        overflow: 'hidden', marginBottom: '8px',
                                        borderRadius: '4px',
                                    }}>
                                        <div style={{
                                            height: '100%', width: `${percent}%`,
                                            backgroundColor: isComplete ? '#34d399' : '#a435f0',
                                            transition: 'width 0.4s', borderRadius: '4px',
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
                                            color: isComplete ? '#059669' : percent > 0 ? '#a435f0' : '#9ca3af',
                                        }}>
                                            {percent.toFixed(0)}% complete
                                        </span>
                                    </div>

                                    <button style={{
                                        width: '100%', padding: '12px',
                                        fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                                        borderRadius: '8px',
                                        ...(isComplete ? {
                                            backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0',
                                        } : isStarted ? {
                                            backgroundColor: '#a435f0', color: '#fff', border: 'none',
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

            </div>

            <Footer1 />
            <Footer2 />
        </div>
    );
}