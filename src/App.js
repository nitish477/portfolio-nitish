import React, { useState, useEffect } from 'react';
import Profile from "./profile.png";

// You can replace this URL with the actual URL to your resume file
const resumeURL = "https://bit.ly/NitishResume";

// Simple Button component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded font-bold text-white transition duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Simple Input component
const Input = ({ className, ...props }) => (
  <input
    className={`w-full p-2 border border-gray-300 rounded ${className}`}
    {...props}
  />
);

// ProfileModal component to show profile details
const ProfileModal = ({ isOpen, onClose, profileData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">My Profile</h2>
        <div className="flex items-center mb-4">
          <img
            src={profileData.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4 border-4 border-purple-500"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{profileData.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{profileData.currentLocation}</p>
          </div>
        </div>
        <ul className="space-y-2 text-gray-800 dark:text-gray-300">
          <li><strong>GitHub:</strong> <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600">{profileData.github}</a></li>
          <li><strong>Instagram:</strong> <a href={profileData.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600">{profileData.instagram}</a></li>
          <li><strong>LinkedIn:</strong> <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">{profileData.linkedin}</a></li>
          <li><strong>Marital Status:</strong> {profileData.maritalStatus}</li>
          <li><strong>Date of Birth:</strong> {profileData.dob}</li>
          <li><strong>Current Location:</strong> {profileData.currentLocation}</li>
        </ul>
        <Button onClick={onClose} className="mt-4 bg-gray-500 hover:bg-gray-600 w-full">Close</Button>
      </div>
    </div>
  );
};

// HireModal component for hiring process
const HireModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Hire Me</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">Submit</Button>
          <Button type="button" onClick={onClose} className="mt-4 bg-gray-500 hover:bg-gray-600 w-full">Close</Button>
        </form>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [typedText, setTypedText] = useState('');
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fullText = 'HTML, CSS, JavaScript, and React.';
  const typingSpeed = 70;

  const profileData = {
    name: 'Nitish Kumar',
    avatar: Profile,
    github: 'https://github.com/nitish477',
    instagram: 'https://instagram.com/nitish_ojha5',
    linkedin: 'https://linkedin.com/in/nitish477',
    maritalStatus: 'Single',
    dob: '13 may 2003',
    currentLocation: 'Pune, India',
  };

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTypedText(prev => {
        if (prev.length < fullText.length) {
          return prev + fullText.charAt(prev.length);
        } else {
          clearInterval(typingInterval);
          return prev;
        }
      });
    }, typingSpeed);
  
    return () => clearInterval(typingInterval);
  }, [fullText]);

  const handleHireMe = () => {
    setIsHireModalOpen(true);
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleModalClose = () => {
    setIsHireModalOpen(false);
    setIsProfileModalOpen(false);
  };

  const handleModalSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen font-sans p-4 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
 <nav className="mb-8">
  <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-0">Portfolio</h1>
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
      <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-gray-500 transition duration-300">Home</a>
      <Button onClick={handleProfile} className="bg-purple-600 hover:bg-purple-700 text-white">
        Show Profile
      </Button>
      <Button onClick={toggleDarkMode} className="bg-yellow-500 hover:bg-yellow-600 text-white">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </div>
  </div>
</nav>


      <section id="home" className="mb-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">HEY, I'M Nitish Kumar</h2>
            <p className="mb-6 text-lg leading-relaxed">
              As a web developer, my objective is to create user-friendly and
              efficient websites that are visually appealing and easy to navigate.
              I utilize my skills in <span className="text-purple-500 font-semibold">{typedText}</span> to
              develop websites that meet all the requirements of the client.
            </p>
            <div className="space-x-4">
              <Button onClick={handleHireMe} className="bg-blue-600 hover:bg-blue-700">
                Hire Me
              </Button>
              <Button
                onClick={() => window.open(resumeURL, '_blank')}
                className="bg-green-600 hover:bg-green-700"
              >
                Download Resume
              </Button>
            </div>
          </div>
          <div className="flex-1 text-center">
            <img
              src={Profile}
              alt="Profile"
              className="w-64 h-64 rounded-full mx-auto border-4 border-purple-500"
            />
          </div>
        </div>
      </section>

      {/* Add Skills section here */}
      <section id="skills" className="mb-16">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold mb-6">Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: 'JavaScript', description: 'Proficient in ES6+ features, asynchronous programming, and modern frameworks.' },
        { title: 'React', description: 'Experienced in building dynamic single-page applications and component-based architecture.' },
        { title: 'CSS & Tailwind CSS', description: 'Skilled in styling websites with modern CSS techniques and Tailwind CSS for utility-first design.' },
        { title: 'HTML', description: 'Strong understanding of HTML5 semantic elements and best practices for accessibility and SEO.' },
        { title: 'Node.js', description: 'Proficient in server-side JavaScript and building RESTful APIs with Express.js.' },
        { title: 'Git & GitHub', description: 'Experienced in version control and collaborative development using Git and GitHub.' }
      ].map(skill => (
        <div key={skill.title} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{skill.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Add Footer here */}
      <footer className={`py-6 mt-16 ${isDarkMode ? 'bg-gray-800 dark:bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-900 text-white'}`}>
        <div className="container mx-auto text-center">
          <p className="text-lg mb-2">Thank you for visiting!</p>
          <p>&copy; 2024 Nitish Kumar. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#home" className="text-gray-400 hover:text-gray-300 transition duration-300">Home</a>
          </div>
        </div>
      </footer>

      <ProfileModal isOpen={isProfileModalOpen} onClose={handleModalClose} profileData={profileData} />
      <HireModal isOpen={isHireModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
    </div>
  );
};

export default App;
