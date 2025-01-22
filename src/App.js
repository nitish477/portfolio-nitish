import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Profile from "./profile.png";
import { ExternalLink, Github ,GraduationCap ,FolderGit2,Briefcase} from 'lucide-react';

// You can replace this URL with the actual URL to your resume file
const resumeURL = "https://bit.ly/NitishResume";

// Simple Button component with animation
const Button = ({ children, className, ...props }) => (
  <motion.button
    className={`px-4 py-2 rounded font-bold text-white transition duration-300 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    {children}
  </motion.button>
);
// Simple Input component
const Input = ({ className, ...props }) => (
  <input
    className={`w-full p-2 border border-gray-300 rounded ${className}`}
    {...props}
  />
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <Icon className="w-8 h-8 text-purple-500" />
    <h2 className="text-3xl font-bold">{title}</h2>
  </div>
);

const Card = ({ children, className }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg ${className}`}
  >
    {children}
  </motion.div>
);

const TimelineItem = ({ title, subtitle, date, description }) => (
  <div className="relative pl-8 pb-8 border-l-2 border-purple-500 last:border-0">
    <div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2"></div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-purple-500 font-medium">{subtitle}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{date}</p>
    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const ProjectCard = ({ title, description, technologies, link, github }) => (
  <Card className="flex flex-col h-full">
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {github && (
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        )}
      </div>
    </div>
  </Card>
);


// ProfileModal component to show profile details
const ProfileModal = ({ isOpen, onClose, profileData }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg dark:bg-gray-800"
      >
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
      </motion.div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg dark:bg-gray-800"
      >
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
      </motion.div>
    </motion.div>
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
    
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
    
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-0">Portfolio</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-gray-500 transition duration-300">Home</a>
            <Button onClick={handleProfile} className="bg-purple-600 hover:bg-purple-700 text-white">
              Show Profile
            </Button>
            {/* <Button onClick={toggleDarkMode} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button> */}
          </div>
        </div>
      </motion.nav>

      <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16 relative "
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4">
        <div className="flex-1">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-bold mb-6"
          >
            HEY, I'M Nitish Kumar
          </motion.h2>
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 text-lg leading-relaxed"
          >
            As a web developer, my objective is to create user-friendly and
            efficient websites that are visually appealing and easy to navigate.
            I utilize my skills in <span className="text-purple-500 font-semibold">web development</span> to
            develop websites that meet all the requirements of the client.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-x-4"
          >
            <button onClick={handleHireMe} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              Hire Me
            </button>
            <button
              onClick={() => window.open('#', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              Download Resume
            </button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex-1 relative"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
            <div className="absolute w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-xl -translate-x-8 translate-y-8"></div>
          </div>
          
          {/* Profile image container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-75 scale-105"></div>
            <img
              src={Profile}
              alt="Profile"
              className="relative w-64 h-64 rounded-full mx-auto shadow-xl object-cover"
            />
            
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full opacity-75"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-75"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 -z-10"></div>
    </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        id="skills"
        className="mb-16"
      >
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
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="container mx-auto mb-16"
      >
        <SectionTitle icon={Briefcase} title="Work Experience" />
        <div className="space-y-8">
          <TimelineItem
            title="Frontend Developer Intern"
            subtitle="Affworld Tech  jaipur"
            date="Jun 2023 - Dec 2023"
            description="Developed and maintained responsive web applications using React.js and Tailwind CSS. Collaborated with senior developers to implement new features and improve existing functionality. Participated in code reviews and team meetings."
          />
          <TimelineItem
            title="Web Development Freelancer"
            subtitle="Self-employed"
            date="Jan 2023 - Present"
            description="Worked with various clients to build custom websites and web applications. Managed project timelines, client communication, and delivered high-quality solutions meeting client requirements."
          />
        </div>
      </motion.section>
     
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mx-auto mb-16"
      >
        <SectionTitle icon={GraduationCap} title="Education" />
        <div className="space-y-8">
          <TimelineItem
            title="Bachelor of Technology In (CSE)"
            subtitle="Nagpur University"
            date="2020 - 2024"
            description="Focused on computer science fundamentals, programming languages, and web development technologies. Maintained a strong academic record while participating in coding competitions."
          />
          <TimelineItem
            title="Higher Secondary Education"
            subtitle="Bihar Board"
            date="2019 - 2020"
            description="Completed higher secondary education with a focus on Mathematics,Chemestry And Phy. Participated in various Programs workshops ."
          />
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="container mx-auto mb-16"
      >
        <SectionTitle icon={FolderGit2} title="Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="E-commerce Platform"
            description="A full-featured e-commerce platform with product catalog, shopping cart, and secure checkout functionality."
            technologies={['React', 'Node.js', 'MongoDB', 'Stripe']}
            link="https://ecommerce-demo.com"
            github="https://github.com/nitish477/ecommerce"
          />
          <ProjectCard
            title="Task Management App"
            description="A collaborative task management application with real-time updates and team collaboration features."
            technologies={['React', 'Firebase', 'Tailwind CSS']}
            link="https://taskmanager-demo.com"
            github="https://github.com/nitish477/taskmanager"
          />
          <ProjectCard
            title="Weather Dashboard"
            description="A weather forecasting application with location-based weather updates and interactive maps."
            technologies={['React', 'OpenWeather API', 'Charts.js']}
            link="https://weather-dash.com"
            github="https://github.com/nitish477/weather"
          />
          <ProjectCard
            title="Portfolio Website"
            description="A personal portfolio website showcasing projects and skills with dark mode support."
            technologies={['React', 'Tailwind CSS', 'Framer Motion']}
            link="https://portfolio-demo.com"
            github="https://github.com/nitish477/portfolio"
          />
        </div>
      </motion.section>
     

      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className={`py-6 mt-16 ${isDarkMode ? 'bg-gray-100 dark:bg-gray-900 text-white':'bg-gray-800 dark:bg-gray-900 text-white' }`}
      >
        <div className="container mx-auto text-center text-red-400">
          <p className="text-lg mb-2">Thank you for visiting!</p>
          <p>&copy; 2024 Nitish Kumar. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
          </div>
        </div>
      </motion.footer>

      <ProfileModal isOpen={isProfileModalOpen} onClose={handleModalClose} profileData={profileData} />
      <HireModal isOpen={isHireModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
    
    </div>
  );
};

export default App;
