import { useEffect, useState } from 'react';
import { getOverview } from '../services/instructorApi';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Overview', path: '/instructor/overview' },
  { label: 'Students', path: '/instructor/students' },
  { label: 'Reviews', path: '/instructor/reviews' },
  { label: 'Engagement', path: '/instructor/engagement' },
];

export default function PerformanceOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getOverview()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>Û</div>
        <div style={styles.sideIcons}>
          {['📚','🎬','📊','⭐','💡'].map((icon, i) => (
            <div key={i} style={styles.sideIcon}>{icon}</div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Top nav */}
        <div style={styles.topNav}>
          <span style={styles.perfLabel}>Performance</span>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navItem,
                ...(location.pathname === item.path ? styles.navItemActive : {})
              }}
            >
              {item.label}
            </Link>
          ))}
          <div style={styles.topRight}>
            <span style={styles.badge}>Instructor</span>
            <span>🔔</span>
            <div style={styles.avatar}>TT</div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <h2 style={styles.heading}>Overview</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={styles.grid}>
              <StatCard icon="📋" label="Total Courses" value={data?.totalCourses ?? 0} />
              <StatCard icon="⭐" label="Average Rating" value={data?.averageRating ?? 0} />
              <StatCard icon="👥" label="Total Students" value={(data?.totalStudents ?? 0).toLocaleString()} />
              <StatCard icon="👥" label="Total Enrollments" value={(data?.totalEnrollments ?? 0).toLocaleString()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardIcon}>{icon}</div>
      <div style={styles.cardLabel}>{label}:</div>
      <div style={styles.cardValue}>{value}</div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', background: '#f5f0ff' },
  sidebar: { width: 60, background: '#2d1b6b', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 16 },
  logo: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  sideIcons: { display: 'flex', flexDirection: 'column', gap: 16 },
  sideIcon: { fontSize: 18, cursor: 'pointer' },
  main: { flex: 1, display: 'flex', flexDirection: 'column' },
  topNav: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', padding: '12px 24px', borderBottom: '1px solid #eee', flexWrap: 'wrap' },
  perfLabel: { background: '#e8d5f5', color: '#6b2fa0', padding: '4px 12px', borderRadius: 6, fontWeight: 'bold', marginRight: 8 },
  navItem: { padding: '6px 14px', borderRadius: 6, textDecoration: 'none', color: '#555', fontSize: 14 },
  navItemActive: { background: '#e8d5f5', color: '#6b2fa0', fontWeight: 'bold' },
  topRight: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 },
  badge: { background: '#e8d5f5', color: '#6b2fa0', padding: '3px 10px', borderRadius: 12, fontSize: 13 },
  avatar: { background: '#6b2fa0', color: '#fff', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 13 },
  content: { padding: 32 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, color: '#222' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 560 },
  card: { background: '#d4b8f0', borderRadius: 12, padding: '24px 20px', textAlign: 'center', minHeight: 100 },
  cardIcon: { fontSize: 28, marginBottom: 8 },
  cardLabel: { fontSize: 14, color: '#444', marginBottom: 4 },
  cardValue: { fontSize: 26, fontWeight: 'bold', color: '#222' },
};
