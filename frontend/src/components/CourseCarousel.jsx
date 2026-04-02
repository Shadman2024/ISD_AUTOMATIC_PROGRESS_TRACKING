import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CARD_W = 256;

const IMAGES = [
    'https://img-c.udemycdn.com/course/480x270/629302_8a2d_2.jpg',
    'https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg',
    'https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg',
    'https://img-c.udemycdn.com/course/480x270/3873464_403c.jpg',
    'https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg',
    'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
];

function Card({ course, isHovered, onHover, onLeave }) {
    const navigate = useNavigate();
    
    return (
        <div
            style={{
                position: 'relative',
                flexShrink: 0,
                width: `${CARD_W - 16}px`,
            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                }}
                onClick={() => course.enrolled && navigate(`/student/course/${course.id}`)}
            >
                <div style={{ height: '135px', backgroundColor: '#1c1d1f', position: 'relative' }}>
                    <img
                        src={course.image}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                    {course.enrolled && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: '#3e4143' }}>
                            <div style={{ height: '100%', width: `${course.percent}%`, backgroundColor: '#a435f0' }} />
                        </div>
                    )}
                </div>

                <div style={{ padding: '10px 12px' }}>
                    <p style={{
                        fontSize: '14px', fontWeight: 700, color: '#1c1d1f',
                        margin: '0 0 4px', lineHeight: '1.3', minHeight: '36px',
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{course.title}</p>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px' }}>{course.instructor}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#b4690e' }}>{course.rating}</span>
                        <span style={{ fontSize: '11px', color: '#e59819' }}>★★★★☆</span>
                        <span style={{ fontSize: '10px', color: '#6b7280' }}>({course.students})</span>
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#1c1d1f', margin: 0 }}>
                        {course.enrolled ? `${course.percent.toFixed(0)}% complete` : course.price}
                    </p>
                </div>
            </div>

            {isHovered && (
                <Popup course={course} />
            )}
        </div>
    );
}

function Popup({ course }) {
    const navigate = useNavigate();

    return (
        <div style={{
            position: 'absolute',
            top: '-10px',
            left: `${CARD_W - 8}px`,
            width: '280px',
            backgroundColor: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
            zIndex: 100,
            animation: 'cpop 0.2s ease-out',
        }}>
            <div style={{
                position: 'absolute', left: '-7px', top: '22px',
                width: '12px', height: '12px', backgroundColor: '#fff',
                border: '1px solid #d1d5db',
                borderRight: 'none', borderBottom: 'none',
                transform: 'rotate(-45deg)',
            }} />

            <p style={{ fontSize: '15px', fontWeight: 700, color: '#1c1d1f', margin: '0 0 6px', lineHeight: '1.3' }}>
                {course.title}
            </p>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                {course.enrolled && (
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 6px', borderRadius: '2px' }}>
                        ENROLLED
                    </span>
                )}
                <span style={{ fontSize: '11px', color: '#6b7280' }}>Updated Mar 2026</span>
            </div>

            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 10px', lineHeight: '1.5' }}>
                {course.enrolled
                    ? `${course.percent.toFixed(0)}% done. ${course.percent >= 50 ? 'Almost there!' : 'Keep going!'}`
                    : 'Build real-world skills with hands-on projects.'}
            </p>

            {['Comprehensive content', 'Downloadable resources', 'Certificate of completion'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ color: '#1c1d1f', fontSize: '12px' }}>✓</span>
                    <span style={{ fontSize: '12px', color: '#1c1d1f' }}>{f}</span>
                </div>
            ))}

            <button
                onClick={e => { e.stopPropagation(); course.enrolled && navigate(`/student/course/${course.id}`); }}
                style={{
                    width: '100%', padding: '10px', marginTop: '10px', borderRadius: '4px',
                    fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                    ...(course.enrolled
                        ? { backgroundColor: '#a435f0', color: '#fff', border: 'none' }
                        : { backgroundColor: '#fff', color: '#1c1d1f', border: '2px solid #1c1d1f' }),
                }}
            >
                {course.enrolled ? 'Continue learning' : 'Add to cart'}
            </button>
        </div>
    );
}

export default function CourseCarousel({ courses }) {
    const scrollRef = useRef(null);
    const [hovered, setHovered] = useState(-1);
    const timer = useRef(null);

    const allCourses = [
        ...courses.map((c, i) => ({
            id: c.id, title: c.title, instructor: 'Instructor Karim',
            rating: 4.6, students: '12,456', image: IMAGES[i % IMAGES.length],
            enrolled: true, percent: parseFloat(c.completion_percentage || 0), price: 'Enrolled',
        })),
        { id: 'r1', title: 'Python for Data Science', instructor: 'Jose Portilla', rating: 4.7, students: '45,892', price: '$12.99', image: IMAGES[2], enrolled: false, percent: 0 },
        { id: 'r2', title: 'JavaScript Complete Course', instructor: 'Jonas Schmedtmann', rating: 4.8, students: '78,231', price: '$14.99', image: IMAGES[3], enrolled: false, percent: 0 },
        { id: 'r3', title: 'React Complete Guide', instructor: 'Maximilian S.', rating: 4.6, students: '56,123', price: '$11.99', image: IMAGES[4], enrolled: false, percent: 0 },
        { id: 'r4', title: 'AWS Cloud Practitioner', instructor: 'Stephane Maarek', rating: 4.7, students: '34,567', price: '$13.99', image: IMAGES[5], enrolled: false, percent: 0 },
    ];

    // Duplicate for infinite feel
    const displayCourses = [...allCourses, ...allCourses];

    const scrollBy = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        const totalW = allCourses.length * CARD_W;

        el.scrollBy({ left: dir === 'right' ? CARD_W : -CARD_W, behavior: 'smooth' });

        // After scroll, check if we need to loop
        setTimeout(() => {
            if (el.scrollLeft >= totalW) {
                el.scrollTo({ left: el.scrollLeft - totalW, behavior: 'auto' });
            } else if (el.scrollLeft <= 0) {
                el.scrollTo({ left: el.scrollLeft + totalW, behavior: 'auto' });
            }
        }, 350);
    };

    const enter = (i) => { clearTimeout(timer.current); setHovered(i); };
    const leave = () => { timer.current = setTimeout(() => setHovered(-1), 120); };

    return (
        <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1c1d1f', margin: '0 0 4px' }}>Recommended for you</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 18px' }}>Based on your learning activity</p>

            <div style={{ position: 'relative' }}>
                {/* Arrows */}
                <div onClick={() => scrollBy('left')} style={btnStyle('left')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
                </div>
                <div onClick={() => scrollBy('right')} style={btnStyle('right')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="9 18 15 12 9 6" /></svg>
                </div>

                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex', gap: '16px',
                        overflowX: 'auto', overflowY: 'visible',
                        scrollbarWidth: 'none',
                        padding: '8px 4px 260px 4px',
                        marginBottom: '-240px',
                    }}
                >
                    {displayCourses.map((c, i) => (
                        <Card
                            key={`${c.id}-${i}`}
                            course={c}
                            isHovered={hovered === i}
                            onHover={() => enter(i)}
                            onLeave={leave}
                        />
                    ))}
                </div>

                <style>{`
                    div::-webkit-scrollbar{display:none}
                    @keyframes cpop{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
                `}</style>
            </div>
        </div>
    );
}

function btnStyle(side) {
    return {
        position: 'absolute', [side]: '-18px', top: '80px',
        width: '42px', height: '42px', borderRadius: '50%',
        backgroundColor: '#1c1d1f', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
    };
}