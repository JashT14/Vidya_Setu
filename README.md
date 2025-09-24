# 📚 Vidya Setu

<div align="center">

![Vidya Setu Banner](https://capsule-render.vercel.app/api?type=waving&color=0:667eea,100:764ba2&height=200&section=header&text=Vidya%20Setu&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Bridging%20Academic%20Excellence&descAlignY=55&descSize=20)

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&duration=3000&pause=1000&color=667EEA&center=true&vCenter=true&width=600&height=60&lines=📚+Centralized+Project+Management;🎯+Student-Faculty+Bridge;🚀+Academic+Excellence+Platform" alt="Typing SVG" />
</p>

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=github&logoColor=white)
![License](https://img.shields.io/badge/license-GPL%203.0-blue?style=for-the-badge&logo=gnu&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-orange?style=for-the-badge&logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=for-the-badge&logo=mongodb&logoColor=white)
![Contributions](https://img.shields.io/badge/contributions-welcome-yellow?style=for-the-badge&logo=handshake&logoColor=white)

</div>

---

<div align="center">

## 🌟 **Vision Statement**

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">
</div>

**Vidya Setu** is a centralized student project management platform that bridges the gap between students, faculty, and administrators. It ensures streamlined project submission, monitoring, and evaluation within a single system.

The platform serves both as an **academic submission system** (institutional style) and a **developer-friendly repository** (open-source style) to encourage transparency, scalability, and collaboration.

<div align="center">

---

## ✨ Features

</div>

<table align="center">
<tr>
<td align="center" width="33%">

### 🎯 Core Functionality
<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="100"><br/>
**Centralized Project Repository** - Store and manage all student projects in one organized location<br/>
**Role-Based Access Control** - Distinct interfaces for Students, Faculty, and Administrators<br/>
**Team Collaboration Tools** - Multi-user project management with milestone tracking<br/>
**Advanced Search & Filtering** - Find projects by title, student, department, or technology stack<br/>
**Version Control Integration** - Seamless GitHub/GitLab repository linking

</td>
<td align="center" width="33%">

### 👥 User Roles
<img src="https://user-images.githubusercontent.com/74038190/212257472-08e52665-c503-4bd9-aa20-f5a4dae769b5.gif" width="100"><br/>
**Students**: Upload projects, track progress, collaborate with teams<br/>
**Faculty/Mentors**: Evaluate submissions, provide feedback, monitor milestones<br/>
**Administrators**: Manage users, departments, and oversee project lifecycle

</td>
<td align="center" width="33%">

### 🔒 Security & Authentication
<img src="https://user-images.githubusercontent.com/74038190/212257463-4d082cb4-7483-4eaf-bc25-6dde2628aabd.gif" width="100"><br/>
JWT-based secure authentication<br/>
Password encryption with bcrypt<br/>
Role-based permission system<br/>
File upload validation and security

</td>
</tr>
</table>

<div align="center">

---

## 🛠️ Tech Stack

</div>

<div align="center">

### Frontend
<img src="https://skillicons.dev/icons?i=react,vite,tailwind,html,css,js" />

**React** with Vite for fast development  
**TailwindCSS** + **Shadcn UI** for modern styling  
**Axios** for API communication

### Backend
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,jwt" />

**Node.js** + **Express.js** server  
**MongoDB** + **Mongoose** ODM  
**JWT** authentication  
**Multer** + **GridFS** for file handling

### DevOps & Deployment
<img src="https://skillicons.dev/icons?i=github,docker,nginx,mongodb" />

**GitHub Actions** for CI/CD  
**Docker** for containerization  
**MongoDB Atlas** cloud database  
**Nginx** for production deployment

</div>

<div align="center">

---

## 📂 Project Structure

</div>

```
📁 Vidya_Setu/
├── 📁 backend/
│   ├── 📁 config/          # Database & environment configuration
│   ├── 📁 models/          # MongoDB schemas and data models
│   ├── 📁 routes/          # Express API endpoints
│   ├── 📄 gridfs.js        # GridFS file storage setup
│   ├── 📄 seedData.js      # Sample data seeding
│   ├── 📄 server.js        # Backend application entry point
│   ├── 📄 upload.js        # File upload middleware
│   └── 🔒 .env             # Environment variables
│
├── 📁 src/
│   ├── 📁 assets/          # Static resources (images, icons)
│   ├── 📁 components/      # Reusable React components
│   ├── 📁 data/            # Static and mock data
│   ├── 📁 styles/          # CSS and Tailwind configurations
│   ├── 📄 AdminDashboard.jsx
│   ├── 📄 AdminLogin.jsx
│   ├── 📄 AdminPage.jsx
│   ├── 📄 App.jsx          # Main React application
│   ├── 📄 FacultyApprovalPage.jsx
│   ├── 📄 FacultyDashboard.jsx
│   ├── 📄 FacultyLogin.jsx
│   ├── 📄 FacultyPage.jsx
│   ├── 📄 FacultyProfile.jsx
│   ├── 📄 FacultySettings.jsx
│   ├── 📄 HomePage.jsx
│   ├── 📄 main.jsx         # React application entry point
│   ├── 📄 StudentLogin.jsx
│   ├── 📄 StudentPage.jsx
│   └── 📄 StudentProfile.jsx
│
├── 📄 .gitignore
├── 📄 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 vite.config.js
```

<div align="center">

---

## ⚙️ Installation & Setup

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="100">
</div>

### Prerequisites
- **Node.js** (version 18 or higher)
- **MongoDB** (local installation or Atlas account)
- **Git** for version control

### 🚀 Quick Start

<details>
<summary><b>🔽 Click to expand installation steps</b></summary>

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/Vidya_Setu.git
   cd Vidya_Setu
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/vidya_setu
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # Server will run on http://localhost:5000
   ```

5. **Frontend Setup** (in a new terminal)
   ```bash
   cd src
   npm install
   npm run dev
   # Frontend will run on http://localhost:5173
   ```

6. **Access the Application**
   
   Open your browser and navigate to: **[http://localhost:5173](http://localhost:5173)**

</details>

<div align="center">

---

## 🚀 Deployment Options [PROJECT NOT DEPLOYED YET]

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif" width="100">
</div>

<table align="center">
<tr>
<td align="center" width="33%">

### Frontend Deployment
<img src="https://skillicons.dev/icons?i=vercel,netlify,github" /><br/>
**Vercel** (Recommended for React apps)<br/>
**Netlify** (Static site hosting)<br/>
**GitHub Pages** (For static builds)

</td>
<td align="center" width="33%">

### Backend Deployment
<img src="https://skillicons.dev/icons?i=heroku,docker,railway" /><br/>
**Render** (Full-stack applications)<br/>
**Heroku** (Platform as a Service)<br/>
**Railway** (Modern deployment platform)<br/>
**Docker + VPS** (Self-hosted option)

</td>
<td align="center" width="33%">

### Database
<img src="https://skillicons.dev/icons?i=mongodb" /><br/>
**MongoDB Atlas** (Recommended cloud solution)<br/>
**MongoDB Community** (Self-hosted)

</td>
</tr>
</table>

<div align="center">

---

## 🤝 Contributing

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="100">
</div>

We welcome contributions from the community! Here's how you can help:

```mermaid
gitGraph
    commit id: "Fork Repo"
    branch feature
    checkout feature
    commit id: "Add Feature"
    commit id: "Write Tests"
    commit id: "Update Docs"
    checkout main
    merge feature
    commit id: "Deploy 🚀"
```

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed

<div align="center">

---

## 👨‍💻 Contributors

</div>

<div align="center">

<a href="https://github.com/JashT14/Vidya_Setu/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JashT14/Vidya_Setu" />
</a>

<table>
<tr>
<td align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100"><br/>
<b>Jash Thakkar</b><br/>
Backend Developer<br/>
<a href="https://github.com/your-username">🔗 GitHub</a>
</td>
<td align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100"><br/>
<b>Hetansh Waghela</b><br/>
Developer<br/>
</td>
<td align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100"><br/>
<b>Darshan Ved</b><br/>
Developer<br/>
</td>
<td align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100"><br/>
<b>Vraj Ved</b><br/>
Developer<br/>
</td>
</tr>
</table>

</div>

<div align="center">

---

## 📞 Contact & Support

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="100">
</div>

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/JashT14/Vidya_Setu)
[![Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/your-username/Vidya_Setu/issues)
[![Discussions](https://img.shields.io/badge/GitHub-Discussions-purple?style=for-the-badge&logo=github)](https://github.com/your-username/Vidya_Setu/discussions)

</div>

- **Project Repository**: [https://github.com/JashT14/Vidya_Setu](https://github.com/JashT14/Vidya_Setu)
- **Issue Tracker**: [GitHub Issues](https://github.com/your-username/Vidya_Setu/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/Vidya_Setu/discussions)

<div align="center">

---

## ⭐ Show Your Support

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="400">
</div>

If you find this project helpful, please consider:
- ⭐ **Starring** the repository
- 🍴 **Forking** for your own projects
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features

<div align="center">

---

## 📜 License

</div>

<div align="center">

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

</div>

<div align="center">

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:667eea,100:764ba2&height=120&section=footer&animation=fadeIn"/>

**Made with ❤️ by the Vidya Setu Team**

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="300">

</div>
