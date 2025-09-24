import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import {
    Users,
    TrendingUp,
    CheckCircle,
    AlertTriangle,
    FileText,
    Shield,
    BarChart3,
    Settings
} from 'lucide-react';
import NavbarAdmin from './components/NavbarAdmin';

const departmentData = [
    { name: 'CSE', score: 87, students: 450, faculty: 28 },
    { name: 'CSEDS', score: 79, students: 320, faculty: 22 },
    { name: 'AI & ML', score: 73, students: 180, faculty: 15 },
    { name: 'IT', score: 92, students: 380, faculty: 25 },
    { name: 'COMPS', score: 68, students: 290, faculty: 20 },
    { name: 'ECE', score: 82, students: 410, faculty: 26 },
    { name: 'EEE', score: 76, students: 350, faculty: 23 },
    { name: 'Mechanical', score: 70, students: 520, faculty: 32 },
    { name: 'Civil', score: 65, students: 480, faculty: 30 },
    { name: 'Aerospace', score: 80, students: 220, faculty: 18 },
    { name: 'Production', score: 67, students: 310, faculty: 21 },
    { name: 'Textile', score: 64, students: 180, faculty: 14 },
    { name: 'Metallurgy', score: 62, students: 160, faculty: 12 },
    { name: 'Marine', score: 76, students: 140, faculty: 11 },
    { name: 'Mining', score: 59, students: 120, faculty: 9 }
];

const accreditationData = [
    { name: 'Accredited', value: 12, color: '#10B981' },
    { name: 'Under Review', value: 2, color: '#F59E0B' },
    { name: 'Pending', value: 1, color: '#EF4444' }
];

const AdminDashboard = () => {
    const totalStudents = departmentData.reduce((sum, dept) => sum + dept.students, 0);
    const totalFaculty = departmentData.reduce((sum, dept) => sum + dept.faculty, 0);
    const averageScore = Math.round(departmentData.reduce((sum, dept) => sum + dept.score, 0) / departmentData.length);
    const topPerformer = departmentData.reduce((max, dept) => dept.score > max.score ? dept : max, departmentData[0]);

    return (
        <>
            <NavbarAdmin />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-3">
                                <BarChart3 className="h-8 w-8 text-blue-600" />
                                <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Users className="h-8 w-8 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Users className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Faculty</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalFaculty}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <TrendingUp className="h-8 w-8 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Average Score</p>
                                    <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Top Performer</p>
                                    <p className="text-2xl font-bold text-gray-900">{topPerformer.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <button className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 flex items-center space-x-3">
                            <Shield className="h-6 w-6 text-blue-600" />
                            <span className="font-medium text-gray-900">Compliance Check</span>
                        </button>

                        <button className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-200 flex items-center space-x-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                            <span className="font-medium text-gray-900">Institutional Check</span>
                        </button>

                        <button className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all duration-200 flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-purple-600" />
                            <span className="font-medium text-gray-900">Accreditation Reports</span>
                        </button>

                        <button className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all duration-200 flex items-center space-x-3">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                            <span className="font-medium text-gray-900">Generate Reports</span>
                        </button>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Department Performance Chart */}
                        <div className="lg:col-span-full">
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">All Over Department Performance</h2>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                            <XAxis
                                                dataKey="name"
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
                                                fontSize={12}
                                                stroke="#6b7280"
                                            />
                                            <YAxis
                                                domain={[0, 100]}
                                                fontSize={12}
                                                stroke="#6b7280"
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }}
                                                formatter={(value, name) => [
                                                    `${value}%`,
                                                    name === 'score' ? 'Performance Score' : name
                                                ]}
                                                labelFormatter={(label) => `Department: ${label}`}
                                            />
                                            <Bar
                                                dataKey="score"
                                                fill="#3b82f6"
                                                radius={[4, 4, 0, 0]}
                                                name="score"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Accreditation Status */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Institute Level Accreditation Status</h2>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={accreditationData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {accreditationData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }}
                                                formatter={(value) => [`${value} departments`, 'Count']}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 space-y-2">
                                    {accreditationData.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <span className="text-sm text-gray-600">{item.name}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Department Details Table */}
                    <div className="mt-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Department Details</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Department
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Score
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Students
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Faculty
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {departmentData.map((dept, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {dept.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">{dept.score}%</span>
                                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{ width: `${dept.score}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {dept.students.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {dept.faculty}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${dept.score >= 80
                                                            ? 'bg-green-100 text-green-800'
                                                            : dept.score >= 70
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {dept.score >= 80 ? 'Excellent' : dept.score >= 70 ? 'Good' : 'Needs Improvement'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default AdminDashboard;