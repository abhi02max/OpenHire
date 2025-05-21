OpenHire

OpenHire is an open-source freelancing platform designed to connect freelancers (developers), recruiters, and project providers through open-source contributions. By enabling developers to showcase skills via real coding projects, OpenHire eliminates reliance on resumes, empowering novice freelancers to build portfolios and helping recruiters evaluate talent transparently. Project providers can post tasks and select developers based on demonstrated expertise, fostering a skill-based hiring ecosystem.
Developed by a team of four students—led by Abhideep—as part of a Design Thinking project at Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology, OpenHire aims to make freelancing accessible and equitable. We’re excited to develop features like GitHub Integration for real-time contribution tracking and welcome community contributions! 🚀
Table of Contents

Features
User Roles
Installation
Usage
Contributing
License
Contact
Acknowledgments

Features

User Authentication: Secure registration and login with role-based access for freelancers, recruiters, and providers.
User Profiles: Display user details, skills, and contributions, with options to update profiles.
Project Hub: Post, browse, and filter projects by skills, presented in a responsive grid layout.
Contribution Tracking: Track open-source contributions (stored as text entries in the MVP) on freelancer profiles.
Skill-Based Matching: Filter projects by freelancer skills, with plans for advanced recommendation algorithms.
Responsive Design: Modern, mobile-friendly UI with intuitive navigation and centered forms/cards.
Open-Source: Fully open-source codebase under the MIT license, welcoming contributions like GitHub Integration.

User Roles

Freelancers (Developers):
Register with skills and contribute to open-source projects.
Track contributions (e.g., code commits, bug fixes) in profiles.
Apply to projects by showcasing relevant work.


Recruiters:
Browse and filter freelancer profiles by skills or contributions.
Contact developers for hiring opportunities.


Project Providers:
Post projects with titles, descriptions, and required skills.
Review contributions and select freelancers for tasks.



Installation
Follow these steps to set up OpenHire locally. The project includes a frontend, backend, and database for managing users, projects, and contributions.
Prerequisites

A modern web browser (e.g., Chrome, Firefox).
A database service (local or cloud-based).
A package manager and runtime environment (to be determined by the chosen tech stack).
Git for cloning the repository.

Steps

Clone the Repository:
git clone https://github.com/abhi02-max/openhire.git
cd openhire


Set Up the Backend:

Navigate to the server directory:cd server


Install backend dependencies (e.g., npm install or equivalent).
Create a .env file with environment variables:DATABASE_URI=your-database-connection-string
AUTH_SECRET=your-secret-key


Start the backend server:# Replace with actual command for your stack
npm start




Set Up the Frontend:

Navigate to the client directory:cd client


Install frontend dependencies (e.g., npm install).
Start the development server:# Replace with actual command
npm run dev




Configure the Database:

Set up a database (local or cloud-based).
Ensure the backend connects using the DATABASE_URI.


Access the Application:

Open your browser and navigate to the frontend URL (e.g., http://localhost:3000).
Register as a freelancer, recruiter, or provider to explore the platform.



Usage

Register an Account:

Visit the Register page and select your role (freelancer, recruiter, provider).
Enter email, password, and skills (for freelancers) or company details (for recruiters/providers).


Log In:

Use your credentials to access your role-specific dashboard.


Explore Projects:

Browse projects in the Projects section, filter by skills, and view details.
Freelancers: Click “Apply” to express interest (placeholder in MVP).
Providers: Post new projects with required skills.


Contribute to Projects:

Freelancers: Submit contributions (e.g., text description like “Added login feature”).
Contributions appear on your profile for review by recruiters/providers.


View Profiles:

Check your profile for details and contributions.
Recruiters: Browse freelancer profiles to evaluate skills.



Contributing
We welcome contributions to OpenHire, including features like GitHub Integration for real-time contribution tracking! See CONTRIBUTING.md for detailed guidelines and our Code of Conduct.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback:

Email: abhideep0204@gmail.com (update with your team’s email)
GitHub Issues: Open an issue
Project Lead: Abhideep

Acknowledgments

Our project mentor for guidance and support.
Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology for fostering innovation.
The open-source community for inspiring OpenHire.

Thank you for exploring OpenHire! Let’s build a fairer freelancing future together. 🌟
