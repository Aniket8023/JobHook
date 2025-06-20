# 💼 Job Hook - Smart Job Aggregator Portal
A real-time job search platform integrating APIs like Adzuna, Jooble, and JSearch with Spring Boot backend and Angular frontend. Includes resume-based job recommendations.

## 🚀 Key Features

- 🌐 **Real-Time Job Listings** via APIs (Adzuna, Jooble, JSearch)
- 📄 **Resume-Based Job Recommendation System**
- 🎯 **Smart Filtering** by:
  - Job Title  
  - Location  
  - Distance  
  - Work Mode (Remote/On-site/Hybrid)  
  - Salary Range  
- 🧠 **Intelligent Job Suggestions** based on user profiles
- 📌 **Bookmark & Apply Jobs** (optional based on user role)
- 👤 **Role-Based Access** for users and admins
- 📈 **Admin Dashboard** for job listing statistics
- 📱 **Responsive UI** using Angular
- ☁️ **Spring Boot Backend + MySQL + JWT Security**
- 🛰️ **Location-based filtering** using LocationIQ API

---

## 🧠 Resume Recommendation System

- Users upload their resumes in PDF format.
- Skills are extracted using NLP techniques.
- Relevant job results are fetched in real-time using APIs.
- Jobs are ranked based on skill matching scores.

---

## 🛠️ Tech Stack

### 👨‍💻 Frontend
- React  
- Mantine UI
- BootStrap 
- HTML5, CSS3  

### 🧪 Backend
- Java  
- Spring Boot  
- RESTful APIs  
- JWT Security  
- MySQL  

### 🌍 APIs Integrated
- [Adzuna API](https://developer.adzuna.com/)  
- [Jooble API](https://jooble.org/api/about)  
- [JSearch API (RapidAPI)](https://rapidapi.com/)  
- [LocationIQ API](https://locationiq.com/)  
- [Clearbit Logo API](https://clearbit.com/logo) (for branding)

## 🖼️ Screenshots

🏠 Home Page

![Screenshot 2025-06-20 194201](https://github.com/user-attachments/assets/391d4c27-c9b6-4064-8339-4c4321d1b5d7)


👤 Profile Page

![Screenshot 2025-06-20 194243](https://github.com/user-attachments/assets/185a49e7-ce7f-4503-b07f-5b96f6f0caec)


🔍 Find Talent

![Screenshot 2025-06-20 194214](https://github.com/user-attachments/assets/3baa13d6-cc0b-4568-88ee-eb5172335358)


📝 Post Job

![Screenshot 2025-06-20 194225](https://github.com/user-attachments/assets/c2f94eae-9792-4639-b82d-1fd4a9764c3e)


## 📂 Folder Structure

```
job-hook/
├── backend/                # Spring Boot backend with REST APIs  
│   ├── src/  
│   └── pom.xml  
├── frontend/               # React frontend with Mantine UI  
│   ├── src/  
│   └── package.json  
├── screenshots/            # Project screenshots  
└── README.md               # Documentation
```


## 🧑‍💻 How to Run Locally

### 1️⃣ Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```
- Make sure MySQL is running and `application.properties` is configured.

### 2️⃣ Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
- Open in browser: [http://localhost:3000](http://localhost:5173)

---

## 💡 Learnings & Outcomes

- Integrated multiple job listing APIs for real-time aggregation.
- Built an end-to-end resume parser and recommendation engine.
- Developed secure JWT-based authentication & role-based access.
- Applied responsive UI design with Mantine and React.
- Practiced real-world teamwork, debugging, and deployment flow.

---


## 📬 Contact

**Aniket Vijay Solanke**  
📧 aniketsolanke1404@gmail.com  
🔗 [Portfolio](https://portfolio-amber-delta-59.vercel.app/)
🔗 [GitHub](https://github.com/Aniket8023)  
🔗 [LinkedIn](https://www.linkedin.com/in/aniket-solanke-0a993325a/)

g
## 🙏 Acknowledgements

This project is the result of my personal passion for building smart, real-world applications using full-stack Java development.  
Special thanks to the developers and platforms like **Adzuna**, **Jooble**, **JSearch**, and **Clearbit** for providing free APIs to make this project functional and realistic. 🙌

