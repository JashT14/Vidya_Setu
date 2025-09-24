import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Building, Calendar, User, MapPin, DollarSign, Clock, ExternalLink } from 'lucide-react';

const WorkExperiences = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const sampleWorkExperiences = [
    {
      _id: '1',
      studentId: '202400000001',
      studentName: 'Aarav Mehta',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Computer Science',
      email: 'aarav.mehta@example.com',
      companyName: 'TechCorp Solutions',
      jobTitle: 'Full Stack Developer Intern',
      workType: 'Internship',
      duration: '6 months',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      location: 'Bangalore, India',
      salary: '₹25,000/month',
      description: 'Developed responsive web applications using React.js and Node.js. Collaborated with senior developers on client projects and gained hands-on experience in agile development methodologies.',
      skills: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'Git'],
      certificateUrl: 'https://example.com/certificate1.pdf',
      status: 'completed',
      rating: '4.8/5.0',
      addedDate: '2024-07-20'
    },
    {
      _id: '2',
      studentId: '202400000002',
      studentName: 'Priya Sharma',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Information Technology',
      email: 'priya.sharma@example.com',
      companyName: 'InnovateLabs',
      jobTitle: 'Software Developer',
      workType: 'Full-time',
      duration: '1 year 2 months',
      startDate: '2023-06-01',
      endDate: '2024-08-01',
      location: 'Mumbai, India',
      salary: '₹8,50,000/year',
      description: 'Led development of microservices architecture for e-commerce platform. Implemented CI/CD pipelines and mentored junior developers. Contributed to system architecture decisions.',
      skills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS', 'MySQL'],
      certificateUrl: 'https://example.com/certificate2.pdf',
      status: 'completed',
      rating: '4.9/5.0',
      addedDate: '2024-08-05'
    },
    {
      _id: '3',
      studentId: '202400000003',
      studentName: 'Rohan Gupta',
      collegeName: 'Vidyasetu College of Business',
      deptName: 'Management',
      email: 'rohan.gupta@example.com',
      companyName: 'StartupHub Ventures',
      jobTitle: 'Business Analyst Intern',
      workType: 'Internship',
      duration: '4 months',
      startDate: '2024-03-01',
      endDate: '2024-07-01',
      location: 'Pune, India',
      salary: '₹20,000/month',
      description: 'Analyzed market trends and customer behavior data. Created comprehensive business reports and presentations for stakeholders. Assisted in strategic planning initiatives.',
      skills: ['Data Analysis', 'Excel', 'PowerBI', 'SQL', 'Market Research'],
      certificateUrl: 'https://example.com/certificate3.pdf',
      status: 'completed',
      rating: '4.6/5.0',
      addedDate: '2024-07-10'
    },
    {
      _id: '4',
      studentId: '202400000004',
      studentName: 'Sneha Iyer',
      collegeName: 'Vidyasetu College of Arts',
      deptName: 'English Literature',
      email: 'sneha.iyer@example.com',
      companyName: 'ContentCraft Media',
      jobTitle: 'Content Writer',
      workType: 'Part-time',
      duration: '8 months',
      startDate: '2023-12-01',
      endDate: '2024-08-01',
      location: 'Chennai, India',
      salary: '₹15,000/month',
      description: 'Created engaging content for various digital platforms. Wrote technical documentation and blog posts. Collaborated with design team for content strategy development.',
      skills: ['Content Writing', 'SEO', 'WordPress', 'Research', 'Editing'],
      certificateUrl: 'https://example.com/certificate4.pdf',
      status: 'completed',
      rating: '4.7/5.0',
      addedDate: '2024-08-10'
    },
    {
      _id: '5',
      studentId: '202400000005',
      studentName: 'Kabir Verma',
      collegeName: 'Vidyasetu College of Science',
      deptName: 'Physics',
      email: 'kabir.verma@example.com',
      companyName: 'DataScience Labs',
      jobTitle: 'Research Intern',
      workType: 'Internship',
      duration: '5 months',
      startDate: '2024-02-01',
      endDate: '2024-07-01',
      location: 'Delhi, India',
      salary: '₹22,000/month',
      description: 'Conducted research on machine learning algorithms for scientific computing. Developed Python scripts for data analysis and visualization. Presented findings at internal seminars.',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'MATLAB', 'Research'],
      certificateUrl: 'https://example.com/certificate5.pdf',
      status: 'completed',
      rating: '4.5/5.0',
      addedDate: '2024-07-15'
    },
    {
      _id: '6',
      studentId: '202400000006',
      studentName: 'Ananya Roy',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Electronics',
      email: 'ananya.roy@example.com',
      companyName: 'ElectroTech Industries',
      jobTitle: 'Hardware Engineer Intern',
      workType: 'Internship',
      duration: '6 months',
      startDate: '2024-01-01',
      endDate: '2024-07-01',
      location: 'Hyderabad, India',
      salary: '₹24,000/month',
      description: 'Designed and tested electronic circuits for IoT devices. Worked on PCB design and embedded systems programming. Participated in product development lifecycle.',
      skills: ['PCB Design', 'Arduino', 'C++', 'IoT', 'Circuit Design'],
      certificateUrl: 'https://example.com/certificate6.pdf',
      status: 'completed',
      rating: '4.8/5.0',
      addedDate: '2024-07-08'
    },
    {
      _id: '7',
      studentId: '202400000007',
      studentName: 'Devansh Patel',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Mechanical',
      email: 'devansh.patel@example.com',
      companyName: 'MechDesign Corp',
      jobTitle: 'Design Engineer Trainee',
      workType: 'Training',
      duration: '3 months',
      startDate: '2024-05-01',
      endDate: 'ongoing',
      location: 'Ahmedabad, India',
      salary: '₹18,000/month',
      description: 'Learning CAD software and mechanical design principles. Assisting senior engineers in product design and analysis. Currently working on automotive component design project.',
      skills: ['AutoCAD', 'SolidWorks', '3D Modeling', 'Design Analysis'],
      certificateUrl: null,
      status: 'ongoing',
      rating: 'In Progress',
      addedDate: '2024-05-15'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setWorkExperiences(sampleWorkExperiences);
      setLoading(false);
    }, 800);
  }, []);

  const filteredExperiences = workExperiences.filter(exp => {
    const matchesSearch = exp.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'ongoing': return 'bg-sky-100 text-sky-700 border border-sky-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl w-80 mb-4"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-blue-200 rounded-lg w-96 mb-8"></div>
            <div className="grid gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                  <div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg w-3/4 mb-6"></div>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="h-20 bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl"></div>
                    ))}
                  </div>
                  <div className="h-24 bg-gradient-to-r from-gray-100 to-purple-100 rounded-xl mb-4"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(k => (
                      <div key={k} className="h-8 w-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Work Experiences
          </h1>
          <p className="text-lg text-gray-600">Discover student career journeys and professional growth</p>
        </div>

        {/* Search Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Search students, companies, or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-3 focus:ring-blue-200 focus:border-blue-400 transition-all bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              {filteredExperiences.length} work experiences found
            </span>
          </div>
        </div>

        {/* Work Experiences List */}
        <div className="space-y-8">
          {filteredExperiences.map((experience, index) => (
            <div key={experience._id} className={`${
              index % 2 === 0 ? 'bg-gradient-to-br from-white to-blue-50' : 'bg-gradient-to-br from-white to-purple-50'
            } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
              index % 2 === 0 ? 'border-blue-100 hover:border-blue-200' : 'border-purple-100 hover:border-purple-200'
            }`}>
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {experience.jobTitle}
                    </h3>
                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-blue-100' : 'bg-purple-100'}`}>
                          <User className={`w-4 h-4 ${index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                        </div>
                        <span className="font-medium">{experience.studentName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-blue-100' : 'bg-purple-100'}`}>
                          <Building className={`w-4 h-4 ${index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                        </div>
                        <span className="font-medium">{experience.companyName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(experience.status)} shadow-sm`}>
                      {experience.status.charAt(0).toUpperCase() + experience.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      experience.workType === 'Internship' ? 'bg-orange-100 text-orange-700' :
                      experience.workType === 'Full-time' ? 'bg-green-100 text-green-700' :
                      experience.workType === 'Part-time' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {experience.workType}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-blue-50/50' : 'bg-purple-50/50'} border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className={`w-5 h-5 ${index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                      <span className="text-sm font-medium text-gray-600">Duration</span>
                    </div>
                    <span className="font-semibold text-gray-800">{experience.duration}</span>
                  </div>
                  <div className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-blue-50/50' : 'bg-purple-50/50'} border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className={`w-5 h-5 ${index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                      <span className="text-sm font-medium text-gray-600">Period</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {new Date(experience.startDate).toLocaleDateString()} - {experience.endDate === 'ongoing' ? 'Ongoing' : new Date(experience.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-blue-50/50' : 'bg-purple-50/50'} border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className={`w-5 h-5 ${index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                      <span className="text-sm font-medium text-gray-600">Location</span>
                    </div>
                    <span className="font-semibold text-gray-800">{experience.location}</span>
                  </div>
                  <div className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-blue-50/50' : 'bg-purple-50/50'} border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className={`w-5 h-5 ${index % 2 === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                      <span className="text-sm font-medium text-gray-600">Salary</span>
                    </div>
                    <span className="font-semibold text-gray-800">{experience.salary}</span>
                  </div>
                </div>

                {/* Description */}
                <div className={`p-6 rounded-xl ${index % 2 === 0 ? 'bg-blue-50/30' : 'bg-purple-50/30'} border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'} mb-6`}>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {experience.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Skills Gained</h4>
                  <div className="flex flex-wrap gap-3">
                    {experience.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                        index % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Student Info */}
                <div className={`${index % 2 === 0 ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-gradient-to-r from-purple-50 to-pink-50'} rounded-xl p-6 border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-600 text-sm">Student ID</span>
                      <div className="font-bold text-gray-800">{experience.studentId}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Department</span>
                      <div className="font-bold text-gray-800">{experience.deptName}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">College</span>
                      <div className="font-bold text-gray-800">{experience.collegeName}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/50 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Rating: </span>
                      <span className={`font-bold ${index % 2 === 0 ? 'text-blue-700' : 'text-purple-700'}`}>{experience.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Added: </span>
                      <span className="font-semibold">{new Date(experience.addedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12 border border-blue-200">
              <div className="text-blue-400 text-6xl mb-4">🔍</div>
              <div className="text-blue-700 text-xl font-semibold mb-2">No work experiences found</div>
              <p className="text-blue-600">Try adjusting your search criteria or check back later</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkExperiences;