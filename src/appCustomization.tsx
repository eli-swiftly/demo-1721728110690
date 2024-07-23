import React, { useState, useEffect } from 'react';
import { AppConfig, TabConfig, ChartConfig } from './config';
import { BarChart2, FileText, Database, PieChart, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, LineChart, Line } from 'recharts';

type CustomComponentProps = {
  config: AppConfig;
};

interface CustomComponents {
  [key: string]: React.FC<CustomComponentProps>;
}

interface CustomData {
  [key: string]: any;
}

// =============== CUSTOM COMPONENTS ===============
const ReportGenerationComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [selectedReport, setSelectedReport] = useState('');
  const [generatingReport, setGeneratingReport] = useState(false);

  const reportTypes = [
    'Financial Planning',
    'Feasibility Study',
    'Hotel Valuation',
    'Market Research'
  ];

  const handleGenerateReport = () => {
    if (selectedReport) {
      setGeneratingReport(true);
      setTimeout(() => {
        setGeneratingReport(false);
        alert(`${selectedReport} report generated successfully!`);
      }, 2000);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Report Generation</h2>
      <select 
        className="w-full p-2 mb-4 border rounded"
        value={selectedReport}
        onChange={(e) => setSelectedReport(e.target.value)}
      >
        <option value="">Select Report Type</option>
        {reportTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <button 
        className={`w-full p-2 text-white rounded ${generatingReport ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={handleGenerateReport}
        disabled={!selectedReport || generatingReport}
      >
        {generatingReport ? 'Generating...' : 'Generate Report'}
      </button>
    </div>
  );
};

const DataVisualizationComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [selectedChart, setSelectedChart] = useState('revenue');

  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
  ];

  const occupancyData = [
    { name: 'Hotel A', value: 70 },
    { name: 'Hotel B', value: 85 },
    { name: 'Hotel C', value: 60 },
    { name: 'Hotel D', value: 75 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Data Visualization</h2>
      <select 
        className="w-full p-2 mb-4 border rounded"
        value={selectedChart}
        onChange={(e) => setSelectedChart(e.target.value)}
      >
        <option value="revenue">Revenue Trend</option>
        <option value="occupancy">Hotel Occupancy</option>
      </select>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {selectedChart === 'revenue' ? (
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          ) : (
            <RPieChart>
              <Pie
                data={occupancyData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RPieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DatabaseManagementComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [databases, setDatabases] = useState([
    { id: 1, name: 'Hotel Profiles', size: '2.5 GB' },
    { id: 2, name: 'Financial Data', size: '1.8 GB' },
    { id: 3, name: 'Market Research', size: '3.2 GB' },
  ]);

  const [merging, setMerging] = useState(false);

  const handleMergeDatabases = () => {
    setMerging(true);
    setTimeout(() => {
      setMerging(false);
      setDatabases([...databases, { id: 4, name: 'Merged Database', size: '7.5 GB' }]);
      alert('Databases merged successfully!');
    }, 2000);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Database Management</h2>
      <ul className="mb-4">
        {databases.map(db => (
          <li key={db.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
            <span>{db.name}</span>
            <span>{db.size}</span>
          </li>
        ))}
      </ul>
      <button 
        className={`w-full p-2 text-white rounded ${merging ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
        onClick={handleMergeDatabases}
        disabled={merging}
      >
        {merging ? 'Merging...' : 'Merge Databases'}
      </button>
    </div>
  );
};

// =============== CONFIGURATION ===============
const customConfig: AppConfig = {
  title: "THRENDS - Hospitality Analytics",
  companyName: "THRENDS",
  logo: "/path/to/thrends-logo.png",
  primaryColor: "#0088FE",
  secondaryColor: "#00C49F",
  userName: "Giorgio Ribaudo",
  dashboard: {
    tabs: [
      {
        id: "reportGeneration",
        label: "Report Generation",
        description: "Generate custom reports",
        icon: FileText
      },
      {
        id: "dataVisualization",
        label: "Data Visualization",
        description: "Visualize hotel data",
        icon: PieChart
      },
      {
        id: "databaseManagement",
        label: "Database Management",
        description: "Manage and merge databases",
        icon: Database
      },
    ] as TabConfig[],
    charts: {
      revenueOverTime: {
        type: "line",
        dataKeys: ["revenue"],
        colors: ["#0088FE"],
        data: [
          { month: 'Jan', revenue: 1000000 },
          { month: 'Feb', revenue: 1200000 },
          { month: 'Mar', revenue: 900000 },
          { month: 'Apr', revenue: 1500000 },
        ]
      },
      hotelOccupancy: {
        type: "bar",
        dataKeys: ["occupancy"],
        colors: ["#00C49F"],
        data: [
          { hotel: 'Hotel A', occupancy: 75 },
          { hotel: 'Hotel B', occupancy: 82 },
          { hotel: 'Hotel C', occupancy: 68 },
          { hotel: 'Hotel D', occupancy: 79 },
        ]
      },
    }
  },
  analytics: {
    charts: {
      marketSegmentation: {
        type: "pie",
        dataKeys: ["value"],
        colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
        data: [
          { name: 'Leisure', value: 45 },
          { name: 'Business', value: 30 },
          { name: 'Group', value: 15 },
          { name: 'Other', value: 10 },
        ]
      },
      averageDailyRate: {
        type: "line",
        dataKeys: ["rate"],
        colors: ["#8884d8"],
        data: [
          { year: '2019', rate: 150 },
          { year: '2020', rate: 120 },
          { year: '2021', rate: 135 },
          { year: '2022', rate: 160 },
        ]
      },
    }
  },
  clients: [
    { id: "bank1", name: "Investment Bank A", industry: "Finance" },
    { id: "fund1", name: "Real Estate Fund B", industry: "Real Estate" },
    { id: "chain1", name: "Hotel Chain C", industry: "Hospitality" },
  ],
  features: {
    dataImport: true,
    analytics: true,
    reporting: true,
    databaseMerging: true
  }
};

// =============== CUSTOM COMPONENTS MAPPING ===============
const customComponents: CustomComponents = {
  reportGeneration: ReportGenerationComponent,
  dataVisualization: DataVisualizationComponent,
  databaseManagement: DatabaseManagementComponent,
};

// =============== CUSTOM DATA ===============
const customData: CustomData = {
  reportTypes: ['Financial Planning', 'Feasibility Study', 'Hotel Valuation', 'Market Research'],
  dataCategories: ['Revenue', 'Occupancy', 'ADR', 'RevPAR'],
  databaseTypes: ['Hotel Profiles', 'Financial Data', 'Market Research']
};

// =============== EXPORT ===============
export const customization = {
  config: customConfig,
  components: customComponents,
  data: customData,
};