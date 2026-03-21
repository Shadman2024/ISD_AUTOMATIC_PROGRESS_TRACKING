export default function LearningStreak() {
    const today = new Date();
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        days.push({
            name: dayNames[d.getDay()],
            date: d.getDate(),
            active: i <= 3 && i > 0,
            isToday: i === 0,
        });
    }

    const streakCount = 3;

    return (
        <div style={{
            backgroundColor: '#fff', borderRadius: '12px',
            border: '1px solid #e5e7eb', padding: '20px 24px',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1c1d1f', margin: '0 0 2px' }}>
                        Learning streak
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                        Keep learning every day!
                    </p>
                </div>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    backgroundColor: '#fef9c3', padding: '6px 14px',
                    borderRadius: '20px',
                }}>
                    <span style={{ fontSize: '18px' }}>🔥</span>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#d97706' }}>{streakCount}</span>
                    <span style={{ fontSize: '12px', color: '#d97706', fontWeight: 600 }}>days</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {days.map((day, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <p style={{
                            fontSize: '11px', margin: '0 0 6px',
                            fontWeight: day.isToday ? 700 : 400,
                            color: day.isToday ? '#1c1d1f' : '#9ca3af',
                        }}>{day.isToday ? 'Today' : day.name}</p>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            margin: '0 auto',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: day.active ? '#f59e0b' : day.isToday ? '#fff7ed' : '#f3f4f6',
                            border: day.isToday ? '2px dashed #f59e0b' : day.active ? 'none' : '1px solid #e5e7eb',
                        }}>
                            {day.active ? (
                                <span style={{ fontSize: '16px' }}>🔥</span>
                            ) : day.isToday ? (
                                <span style={{ fontSize: '12px' }}>?</span>
                            ) : (
                                <span style={{ fontSize: '11px', color: '#d1d5db' }}>{day.date}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <p style={{ fontSize: '12px', color: '#6b7280', margin: '12px 0 0', textAlign: 'center' }}>
                🎉 {streakCount} day streak! Watch a lecture today to keep it going!
            </p>
        </div>
    );
}