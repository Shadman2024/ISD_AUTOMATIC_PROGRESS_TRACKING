import { useEffect, useState } from 'react';
import { getStudents } from '../services/instructorApi';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const navItems = [
  { label: 'Overview', path: '/instructor/overview' },
  { label: 'Students', path: '/instructor/students' },
  { label: 'Reviews', path: '/instructor/reviews' },
  { label: 'Engagement', path: '/instructor/engagement' },
];

const COLORS = ['#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#f39c12'];

export default function PerformanceStudents() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getStudents()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const demographics = data?.demographics || [];
  const courseTable = data?.courseWiseTable || [];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>Û</div>
        <div style={styles.sideIcons}>
          {['📚','🎬','📊','⭐','💡'].map((icon, i) => (
            <div key={i} style={styles.sideIcon}>{icon}</div>
          ))}
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.topNav}>
          <span style={styles.perfLabel}>Performance</span>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{
              ...styles.navItem,
              ...(location.pathname === item.path ? styles.navItemActive : {})
            }}>
              {item.label}
            </Link>
          ))}
          <div style={styles.topRight}>
            <span style={styles.badge}>Instructor</span>
            <span>🔔</span>
            <div style={styles.avatar}>TT</div>
          </div>
        </div>

        <div style={styles.content}>
          <h2 style={styles.heading}>Students</h2>
          {loading ? <p>Loading...</p> : (
            <>
              {/* Stat cards */}
              <div style={styles.grid}>
                <StatCard label="Total Students" value={(data?.totalStudents ?? 0).toLocaleString()} />
                <StatCard label="New Students (This Month)" value={data?.newStudentsThisMonth ?? 0} />
                <StatCard label="Active Students" value={(data?.activeStudents ?? 0).toLocaleString()} />
                <StatCard label="Student Growth" value={data?.studentGrowth ?? '+0%'} />
              </div>

              {/* Demographics chart */}
              <h3 style={styles.subheading}>Student Demographics</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={demographics} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                  <XAxis dataKey="country" tick={{ fontSize: 12 }} angle={-20} textAnchor="end" />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Bar dataKey="percentage" radius={[4,4,0,0]}>
                    {demographics.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Course table */}
              <h3 style={styles.subheading}>Course-wise Student Table</h3>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thead}>
                    <th style={styles.th}>Course Name</th>
                    <th style={styles.th}>Total Students</th>
                    <th style={styles.th}>New (This Month)</th>
                    <th style={styles.th}>Completion (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {courseTable.map((row, i) => (
                    <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                      <td style={styles.td}>{row.courseName}</td>
                      <td style={styles.td}>{row.totalStudents}</td>
                      <td style={styles.td}>{row.newThisMonth}</td>
                      <td style={styles.td}>{row.completionPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardLabel}>{label}:</div>
      <div style={styles.cardValue}>{value}</div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', background: '#f5f0ff' },
  sidebar: { width: 60, background: '#2d1b6b', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 16 },
  logo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  sideIcons: { display: 'flex', flexDirection: 'column', gap: 16 },
  sideIcon: { fontSize: 18, cursor: 'pointer' },
  main: { flex: 1, display: 'flex', flexDirection: 'column' },
  topNav: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', padding: '12px 24px', borderBottom: '1px solid #eee', flexWrap: 'wrap' },
  perfLabel: { background: '#e8d5f5', color: '#6b2fa0', padding: '4px 12px', borderRadius: 6, fontWeight: 'bold' },
  navItem: { padding: '6px 14px', borderRadius: 6, textDecoration: 'none', color: '#555', fontSize: 14 },
  navItemActive: { background: '#e8d5f5', color: '#6b2fa0', fontWeight: 'bold' },
  topRight: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 },
  badge: { background: '#e8d5f5', color: '#6b2fa0', padding: '3px 10px', borderRadius: 12, fontSize: 13 },
  avatar: { background: '#6b2fa0', color: '#fff', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 13 },
  content: { padding: 32 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#222' },
  subheading: { fontSize: 17, fontWeight: 'bold', margin: '24px 0 12px', color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 560, marginBottom: 8 },
  card: { background: '#d4b8f0', borderRadius: 12, padding: '18px 20px', textAlign: 'center' },
  cardLabel: { fontSize: 13, color: '#555', marginBottom: 4 },
  cardValue: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 10, overflow: 'hidden', fontSize: 14 },
  thead: { background: '#f0e6ff' },
  th: { padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#444' },
  td: { padding: '10px 14px', color: '#333' },
  trEven: { background: '#faf7ff' },
};
