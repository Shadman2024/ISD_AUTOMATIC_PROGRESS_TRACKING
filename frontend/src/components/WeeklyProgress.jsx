export default function WeeklyProgress() {
    const data = [
        { day: 'Mon', minutes: 45 },
        { day: 'Tue', minutes: 30 },
        { day: 'Wed', minutes: 60 },
        { day: 'Thu', minutes: 20 },
        { day: 'Fri', minutes: 0 },
        { day: 'Sat', minutes: 0 },
        { day: 'Sun', minutes: 0 },
    ];

    const maxMinutes = Math.max(...data.map(d => d.minutes), 60);
    const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    const avgMinutes = Math.round(totalMinutes / 7);
    const today = new Date().getDay();
    const dayMap = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };

    return (
        <div style={{
            backgroundColor: '#fff', borderRadius: '12px',
            border: '1px solid #e5e7eb', padding: '20px 24px',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1c1d1f', margin: '0 0 2px' }}>
                        Weekly progress
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                        This week's learning activity
                    </p>
                </div>
                <div style={{
                    display: 'flex', gap: '16px',
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, color: '#a435f0', margin: 0 }}>{totalHours}h</p>
                        <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Total</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 700, color: '#2563eb', margin: 0 }}>{avgMinutes}m</p>
                        <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Avg/day</p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '8px', alignItems: 'end', height: '120px',
                padding: '0 4px',
            }}>
                {data.map((d, i) => {
                    const height = d.minutes > 0 ? Math.max((d.minutes / maxMinutes) * 100, 8) : 4;
                    const isToday = dayMap[d.day] === today;
                    const hasActivity = d.minutes > 0;

                    return (
                        <div key={i} style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '4px',
                        }}>
                            {/* Minutes label */}
                            {hasActivity && (
                                <span style={{
                                    fontSize: '10px', fontWeight: 600,
                                    color: isToday ? '#a435f0' : '#6b7280',
                                }}>{d.minutes}m</span>
                            )}

                            {/* Bar */}
                            <div style={{
                                width: '100%', maxWidth: '32px',
                                height: `${height}%`,
                                borderRadius: '4px 4px 0 0',
                                backgroundColor: hasActivity
                                    ? (isToday ? '#a435f0' : '#c4b5fd')
                                    : '#f3f4f6',
                                border: !hasActivity ? '1px solid #e5e7eb' : 'none',
                                transition: 'height 0.3s',
                                cursor: 'default',
                            }}
                                onMouseEnter={e => {
                                    if (hasActivity) e.currentTarget.style.opacity = '0.8';
                                }}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Day labels */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '8px', marginTop: '6px',
            }}>
                {data.map((d, i) => {
                    const isToday = dayMap[d.day] === today;
                    return (
                        <p key={i} style={{
                            fontSize: '11px', textAlign: 'center', margin: 0,
                            fontWeight: isToday ? 700 : 400,
                            color: isToday ? '#a435f0' : '#9ca3af',
                        }}>{isToday ? 'Today' : d.day}</p>
                    );
                })}
            </div>

            {/* Goal line */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginTop: '14px', padding: '8px 12px',
                backgroundColor: '#f8f9fa', borderRadius: '6px',
            }}>
                <span style={{ fontSize: '14px' }}>🎯</span>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                    Daily goal: <span style={{ fontWeight: 700, color: '#1c1d1f' }}>30 minutes</span>
                    {' · '}
                    <span style={{ color: '#059669', fontWeight: 600 }}>
                        {data.filter(d => d.minutes >= 30).length}/7 days reached
                    </span>
                </p>
            </div>
        </div>
    );
}