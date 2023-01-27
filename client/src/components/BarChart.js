import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
let newData = [
  { status: 'pending', count: 0 },
  { status: 'accepted', count: 0 },
  { status: 'declined', count: 0 },
];
const BarChartComponent = ({ data }) => {
  data.forEach((entry) => {
    if (entry.status === 'pending') {
      newData[0].count++;
    } else if (entry.status === 'accepted') {
      newData[1].count++;
    } else if (entry.status === 'declined') {
      newData[2].count++;
    }
  });
  console.log(newData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={newData} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10 " />
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="rgb(233, 185, 73)" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
