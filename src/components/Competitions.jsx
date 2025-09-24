import React, { useState, useEffect } from 'react';
import { Search, Trophy, Award, Medal, Calendar, MapPin, Users, Clock } from 'lucide-react';

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const sampleCompetitions = [
    {
      _id: '1',
      studentId: '202400000001',
      studentName: 'Aarav Mehta',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Computer Science',
      email: 'aarav.mehta@example.com',
      competitionName: 'TechCrunch Disrupt Hackathon 2024',
      competitionType: 'Hackathon',
      category: 'Web Development',
      position: '1st Place',
      prizeAmount: '₹5,00,000',
      participantCount: 500,
      eventDate: '2024-03-15',
      location: 'Bangalore, India',
      organizer: 'TechCrunch India',
      projectTitle: 'EcoTrack - Carbon Footprint Tracker',
      description: 'Developed a comprehensive web application that helps individuals and businesses track their carbon footprint in real-time. The solution includes AI-powered recommendations for reducing environmental impact.',
      technologies: ['React.js', 'Node.js', 'Python', 'TensorFlow', 'MongoDB'],
      teamSize: 4,
      duration: '48 hours',
      achievement: 'Winner',
      certificateUrl: 'https://example.com/certificate1.pdf',
      addedDate: '2024-03-20'
    },
    {
      _id: '2',
      studentId: '202400000002',
      studentName: 'Priya Sharma',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Information Technology',
      email: 'priya.sharma@example.com',
      competitionName: 'Google Code Jam 2024',
      competitionType: 'Coding Contest',
      category: 'Algorithms & Data Structures',
      position: '2nd Place',
      prizeAmount: '₹2,50,000',
      participantCount: 1500,
      eventDate: '2024-04-20',
      location: 'Online',
      organizer: 'Google',
      projectTitle: 'Advanced Graph Algorithms',
      description: 'Solved complex algorithmic problems involving graph theory, dynamic programming, and optimization. Demonstrated exceptional problem-solving skills under time constraints.',
      technologies: ['C++', 'Python', 'Algorithm Design', 'Data Structures'],
      teamSize: 1,
      duration: '3 hours',
      achievement: 'Runner-up',
      certificateUrl: 'https://example.com/certificate2.pdf',
      addedDate: '2024-04-25'
    },
    {
      _id: '3',
      studentId: '202400000003',
      studentName: 'Rohan Gupta',
      collegeName: 'Vidyasetu College of Business',
      deptName: 'Management',
      email: 'rohan.gupta@example.com',
      competitionName: 'National Business Case Competition',
      competitionType: 'Business Challenge',
      category: 'Strategy & Innovation',
      position: '1st Place',
      prizeAmount: '₹3,00,000',
      participantCount: 200,
      eventDate: '2024-02-10',
      location: 'Mumbai, India',
      organizer: 'IIM Bombay',
      projectTitle: 'Digital Transformation Strategy for MSMEs',
      description: 'Developed a comprehensive digital transformation roadmap for small and medium enterprises, focusing on cost-effective solutions and measurable ROI.',
      technologies: ['Business Analysis', 'Strategic Planning', 'Digital Marketing', 'Process Optimization'],
      teamSize: 3,
      duration: '2 days',
      achievement: 'Winner',
      certificateUrl: 'https://example.com/certificate3.pdf',
      addedDate: '2024-02-15'
    },
    {
      _id: '4',
      studentId: '202400000004',
      studentName: 'Sneha Iyer',
      collegeName: 'Vidyasetu College of Arts',
      deptName: 'English Literature',
      email: 'sneha.iyer@example.com',
      competitionName: 'Creative Writing Championship 2024',
      competitionType: 'Writing Contest',
      category: 'Creative Arts',
      position: '1st Place',
      prizeAmount: '₹1,00,000',
      participantCount: 800,
      eventDate: '2024-05-05',
      location: 'Delhi, India',
      organizer: 'Sahitya Akademi',
      projectTitle: 'Digital Age Narratives',
      description: 'Created a compelling anthology of short stories exploring human connections in the digital age. The work was praised for its innovative narrative techniques and social relevance.',
      technologies: ['Creative Writing', 'Digital Storytelling', 'Content Strategy'],
      teamSize: 1,
      duration: '1 month',
      achievement: 'Winner',
      certificateUrl: 'https://example.com/certificate4.pdf',
      addedDate: '2024-05-10'
    },
    {
      _id: '5',
      studentId: '202400000005',
      studentName: 'Kabir Verma',
      collegeName: 'Vidyasetu College of Science',
      deptName: 'Physics',
      email: 'kabir.verma@example.com',
      competitionName: 'International Physics Olympiad',
      competitionType: 'Academic Competition',
      category: 'Physics & Research',
      position: '3rd Place',
      prizeAmount: '₹1,50,000',
      participantCount: 300,
      eventDate: '2024-06-15',
      location: 'Geneva, Switzerland',
      organizer: 'International Physics Committee',
      projectTitle: 'Quantum Computing Applications',
      description: 'Presented groundbreaking research on quantum computing applications in climate modeling. The project demonstrated potential for solving complex environmental challenges.',
      technologies: ['Quantum Computing', 'Python', 'MATLAB', 'Research Methodology'],
      teamSize: 2,
      duration: '6 months',
      achievement: 'Bronze Medal',
      certificateUrl: 'https://example.com/certificate5.pdf',
      addedDate: '2024-06-20'
    },
    {
      _id: '6',
      studentId: '202400000006',
      studentName: 'Ananya Roy',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Electronics',
      email: 'ananya.roy@example.com',
      competitionName: 'Smart India Hackathon 2024',
      competitionType: 'Hackathon',
      category: 'IoT & Hardware',
      position: '1st Place',
      prizeAmount: '₹4,00,000',
      participantCount: 1000,
      eventDate: '2024-07-08',
      location: 'Hyderabad, India',
      organizer: 'Government of India',
      projectTitle: 'Smart Agriculture Monitoring System',
      description: 'Developed an IoT-based smart agriculture system that uses sensors and AI to optimize crop yield and reduce water consumption by 40%.',
      technologies: ['Arduino', 'IoT', 'Machine Learning', 'Mobile App', 'Cloud Computing'],
      teamSize: 6,
      duration: '36 hours',
      achievement: 'Winner',
      certificateUrl: 'https://example.com/certificate6.pdf',
      addedDate: '2024-07-12'
    },
    {
      _id: '7',
      studentId: '202400000007',
      studentName: 'Devansh Patel',
      collegeName: 'Vidyasetu College of Engineering',
      deptName: 'Mechanical',
      email: 'devansh.patel@example.com',
      competitionName: 'AutoCAD Design Challenge',
      competitionType: 'Design Competition',
      category: 'Engineering Design',
      position: '2nd Place',
      prizeAmount: '₹75,000',
      participantCount: 400,
      eventDate: '2024-08-12',
      location: 'Pune, India',
      organizer: 'Autodesk India',
      projectTitle: 'Eco-Friendly Vehicle Design',
      description: 'Designed an innovative electric vehicle concept focusing on sustainability and efficiency. The design featured lightweight materials and aerodynamic optimization.',
      technologies: ['AutoCAD', 'SolidWorks', '3D Modeling', 'Simulation', 'Design Thinking'],
      teamSize: 2,
      duration: '1 week',
      achievement: 'Runner-up',
      certificateUrl: 'https://example.com/certificate7.pdf',
      addedDate: '2024-08-18'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setCompetitions(sampleCompetitions);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCompetitions = competitions.filter(comp => {
    const matchesSearch = comp.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.competitionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.competitionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getPositionIcon = (position) => {
    if (position.includes('1st')) return <Trophy className="w-5 h-5" />;
    if (position.includes('2nd')) return <Medal className="w-5 h-5" />;
    if (position.includes('3rd')) return <Award className="w-5 h-5" />;
    return <Trophy className="w-5 h-5" />;
  };

  const getPositionColor = (position) => {
    if (position.includes('1st')) return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300';
    if (position.includes('2nd')) return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300';
    if (position.includes('3rd')) return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300';
    return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Student Competitions</h1>
          <p className="text-lg text-gray-600">View student achievements in competitions and contests</p>
        </div>

        {/* Search Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              placeholder="Search competitions, students, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-blue-700 bg-white px-3 py-1 rounded-full shadow-sm">
              Showing {filteredCompetitions.length} of {competitions.length} competitions
            </span>
          </div>
        </div>

        {/* Competitions List */}
        <div className="space-y-8">
          {filteredCompetitions.map((competition, index) => (
            <div key={competition._id} className={`${
              index % 2 === 0 ? 'bg-gradient-to-r from-white to-blue-50' : 'bg-gradient-to-r from-white to-purple-50'
            } rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border ${
              index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'
            }`}>
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {competition.competitionName}
                    </h3>
                    <div className="flex items-center gap-6 text-gray-600 mb-2">
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                        <Users className={`w-4 h-4 ${index % 2 === 0 ? 'text-blue-500' : 'text-purple-500'}`} />
                        <span className="font-semibold">{competition.studentName}</span>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {competition.deptName}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        competition.competitionType === 'Hackathon' ? 'bg-purple-100 text-purple-700' :
                        competition.competitionType === 'Coding Contest' ? 'bg-green-100 text-green-700' :
                        competition.competitionType === 'Business Challenge' ? 'bg-orange-100 text-orange-700' :
                        competition.competitionType === 'Writing Contest' ? 'bg-indigo-100 text-indigo-700' :
                        competition.competitionType === 'Academic Competition' ? 'bg-blue-100 text-blue-700' :
                        'bg-pink-100 text-pink-700'
                      }`}>
                        {competition.competitionType}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border-2 shadow-sm ${getPositionColor(competition.position)}`}>
                      {getPositionIcon(competition.position)}
                      {competition.position}
                    </span>
                    <span className="text-xl font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg shadow-sm">
                      {competition.prizeAmount}
                    </span>
                  </div>
                </div>

                {/* Competition Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${index % 2 === 0 ? 'bg-blue-50' : 'bg-purple-50'} border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                    <Calendar className={`${index % 2 === 0 ? 'text-blue-500' : 'text-purple-500'} w-5 h-5`} />
                    <div>
                      <span className="text-xs text-gray-500 block">Event Date</span>
                      <span className="font-semibold text-gray-800">{new Date(competition.eventDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${index % 2 === 0 ? 'bg-green-50' : 'bg-pink-50'} border ${index % 2 === 0 ? 'border-green-100' : 'border-pink-100'}`}>
                    <MapPin className={`${index % 2 === 0 ? 'text-green-500' : 'text-pink-500'} w-5 h-5`} />
                    <div>
                      <span className="text-xs text-gray-500 block">Location</span>
                      <span className="font-semibold text-gray-800">{competition.location}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${index % 2 === 0 ? 'bg-orange-50' : 'bg-indigo-50'} border ${index % 2 === 0 ? 'border-orange-100' : 'border-indigo-100'}`}>
                    <Users className={`${index % 2 === 0 ? 'text-orange-500' : 'text-indigo-500'} w-5 h-5`} />
                    <div>
                      <span className="text-xs text-gray-500 block">Participants</span>
                      <span className="font-semibold text-gray-800">{competition.participantCount}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${index % 2 === 0 ? 'bg-purple-50' : 'bg-green-50'} border ${index % 2 === 0 ? 'border-purple-100' : 'border-green-100'}`}>
                    <Clock className={`${index % 2 === 0 ? 'text-purple-500' : 'text-green-500'} w-5 h-5`} />
                    <div>
                      <span className="text-xs text-gray-500 block">Duration</span>
                      <span className="font-semibold text-gray-800">{competition.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div className={`p-6 rounded-xl mb-6 ${index % 2 === 0 ? 'bg-blue-50/50' : 'bg-purple-50/50'} border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                  <h4 className="font-bold text-gray-800 mb-3 text-lg">{competition.projectTitle}</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {competition.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Technologies & Skills Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {competition.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                        index % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Student Information */}
                <div className={`${index % 2 === 0 ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-gradient-to-r from-purple-50 to-pink-50'} rounded-xl p-6 border ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'}`}>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Student & Competition Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">Student ID</span>
                      <span className="font-bold text-gray-800">{competition.studentId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">Team Size</span>
                      <span className="font-bold text-gray-800">{competition.teamSize} member{competition.teamSize > 1 ? 's' : ''}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">Organizer</span>
                      <span className="font-bold text-gray-800">{competition.organizer}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">College</span>
                      <span className="font-bold text-gray-800">{competition.collegeName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl p-12 border border-blue-200">
              <div className="text-6xl mb-4">🏆</div>
              <div className="text-blue-700 text-xl font-semibold mb-2">No competitions found</div>
              <p className="text-blue-600">Try adjusting your search criteria to discover more achievements</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Competitions;
