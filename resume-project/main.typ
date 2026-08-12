#import "@preview/basic-resume:0.2.9": *

// Personal information
#let name = "Hazem Khaled Ezzat"
#let location = "Cairo, Egypt"
#let email = "hazemelerefy@gmail.com"
#let github = "github.com/hazemelerefey"
#let linkedin = "linkedin.com/in/hazemelerefy"
#let personal-site = "hazemelerefy.vercel.app"

#show: resume.with(
  author: name,
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  personal-site: personal-site,
  accent-color: "#26428b",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

== Work Experience

#work(
  title: "Data Analyst",
  location: "Cairo, Egypt",
  company: "Digilians | MCIT",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Aug 2026"),
)
- Built KPI dashboards in Power BI that made recurring metrics self-serve, reducing the volume of one-off reporting requests.
- Developed SQL reporting workflows (PostgreSQL) that replaced manual data preparation steps and improved turnaround time on recurring reports.
- Designed relational schemas with full ERD documentation, improving consistency and traceability of data used in downstream reporting.
- Presented findings to non-technical stakeholders through custom visuals designed to be readable without additional explanation.

== Selected Projects

#project(
  name: "DigiSteel-YOLO — Deep Learning for Industrial Defect Detection",
  role: "Deep Learning Engineer",
  url: "github.com/hazemelerefey/DigiSteel-YOLO",
)
- Built a custom YOLO-based deep learning model for detecting defects on steel surfaces using the NEU-DET dataset.
- Designed a robustness testing framework with 24 test scenarios (6 perturbation types, 4 severity levels).
- Included modular training pipelines, attention mechanisms, and configurable augmentation.

#project(
  name: "NeuroScope — AI-powered Neuroscience Analysis Platform",
  role: "Deep Learning Engineer",
  url: "github.com/hazemelerefey/NeuroScope",
)
- Developed a platform leveraging deep learning for brain imaging analysis and neural pattern recognition.
- Applied computer vision and signal processing techniques to medical imaging data (MRI, fMRI, EEG).
- Built custom CNN architectures for medical imaging and neural signal analysis pipelines.

#project(
  name: "Social Intelligence Pipeline — Autonomous AI Agent",
  role: "AI Automation Engineer",
  url: "github.com/hazemelerefey/n8n-projects",
)
- Created an autonomous agent that runs every morning, pulls trending posts from 5 subreddits, handles rate limits and retries, and normalizes data.

#project(
  name: "Social Content AI Agent — Multi-Platform Publishing",
  role: "AI Automation Engineer",
  url: "github.com/hazemelerefey/n8n-projects",
)
- Built an autonomous agent that finds trending stories, scores them with a custom algorithm, and generates Arabic content for Facebook and X (Twitter).

#project(
  name: "Churn Prediction Model",
  role: "Data Scientist",
  url: "github.com/hazemelerefey/analytics-churn-prediction",
)
- Developed a churn prediction model using Scikit-learn, with SHAP-based interpretation to explain factors driving customer churn.

== Education

#edu(
  institution: "Port Said University",
  location: "Port Said, Egypt",
  dates: dates-helper(start-date: "2020", end-date: "2024"),
  degree: "Bachelor of Laws (LL.B.) — Commercial & Corporate Law",
)
- Business regulations, corporate governance, and commercial contracts.
- Legal training provided structured reasoning, research methodology, and regulatory compliance foundations.

#edu(
  institution: "Digilians | MCIT",
  location: "Cairo, Egypt",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Aug 2026"),
  degree: "Diploma, Applied AI & Data Analytics",
)
- Python, SQL, Machine Learning, Deep Learning, and AI Agent Systems.

#edu(
  institution: "Egypt FWD (Udacity)",
  location: "Remote",
  dates: dates-helper(start-date: "2021", end-date: "2022"),
  degree: "Nanodegree, Front-End Web Development",
)
- Modern web development fundamentals, responsive design, and JavaScript frameworks.

== Skills
- *Analytics*: SQL (PostgreSQL, SSMS), Python (Pandas, NumPy, Scikit-learn), Power BI, Excel (Advanced), DAX, ETL, Star Schema
- *Machine Learning & AI*: Deep Learning (PyTorch, YOLO, TensorFlow), Computer Vision, Signal Processing, SHAP Analysis
- *Applied AI & Automation*: Autonomous AI Agents, n8n Workflow Automation, MCP Server Design, Agent Skill Development
- *Front-End*: HTML5, CSS3 (SASS, Tailwind), JavaScript (ES6+), React.js, Next.js, Figma, REST API Integration
- *Tools*: Git, GitHub, Jupyter Notebook, Google Colab, VS Code, Streamlit

== Languages
- *Arabic*: Native
- *English*: B2 Professional
