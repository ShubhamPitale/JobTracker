import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  const jobsByMonth = data.reduce((acc, job) => {
    const date = new Date(job.createdAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${month}-${year}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const jobsArray = Object.entries(jobsByMonth).map(([key, value]) => {
    const [month, year] = key.split('-');
    return { monthYear: month + '/' + year, count: value };
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={jobsArray} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthYear" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
