import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Hazem Khaled Ezzat',
        title: 'Data Analyst | Deep Learning | Frontend Developer',
        subtitle: 'Data Analyst • Frontend Developer | Bridging Technical Innovation with Strategic Execution',
        bio: 'An AI & Data Analyst and Deep Learning Specialist with a passion for Frontend Development. I transform complex datasets into actionable insights, build intelligent deep learning models, and craft modern, interactive web experiences that bridge data science with design.',
        avatar: '/about/profile.jpg',
        location: 'Cairo, Egypt',
        email: 'hazemelerefy@gmail.com',
        phone: '+201060117619',
        resumeUrl: '/resume',
        website: 'https://hazemelerefy.vercel.app',
        languages: [
            { name: 'Arabic', level: 'Native' },
            { name: 'English', level: 'B2' },
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/hazemelerefey',
                icon: 'github',
                username: 'hazemelerefey',
            },
            {
                platform: 'LinkedIn',
                url: 'https://linkedin.com/in/hazemelerefy',
                icon: 'linkedin',
                username: 'hazemelerefy',
            },
            {
                platform: 'Instagram',
                url: 'https://instagram.com/hazemelerefy',
                icon: 'instagram',
                username: 'hazemelerefy',
            },
            {
                platform: 'Twitter',
                url: 'https://twitter.com/hazemelerefy',
                icon: 'twitter',
                username: 'hazemelerefy',
            },
            {
                platform: 'Discord',
                url: 'https://discord.com/users/hazemelerefy',
                icon: 'discord',
                username: 'hazemelerefy',
            },
            {
                platform: 'Spotify',
                url: 'https://open.spotify.com/user/hazemelerefy',
                icon: 'spotify',
                username: 'hazemelerefy',
            },
        ],
    },
    projects: [
        {
            id: 'project-1',
            slug: 'azzar-content-creation',
            title: 'Azzar Auto Content Creation',
            image: '/project/azzar-content-creation.webp',
            description: 'AI-powered social content agent with n8n workflow automation for Facebook and X.',
            longDescription: 'Azzar is an intelligent content automation platform built with n8n workflow orchestration. It features a Social Intelligence Pipeline that fully automates social media intelligence gathering, and a Social Content Agent that uses OpenAI and free data sources to generate and publish content across Facebook and X (Twitter).',
            techStack: ['n8n', 'OpenAI', 'Facebook API', 'X (Twitter) API', 'Workflow Automation'],
            tools: ['VS Code', 'n8n', 'GitHub'],
            status: 'completed',
            repoUrl: 'https://github.com/hazemelerefey/n8n-projects',
            demoUrl: '#',
            startDate: '2026-01-01',
            role: 'AI Engineer',
            customTimeline: 'Jan 2026',
            team: 'Personal Project',
            highlights: ['n8n Workflow Orchestration', 'Multi-Platform Publishing', 'AI Content Generation'],
            category: 'AI & Automation',
            features: [
                {
                    title: 'Core Capabilities',
                    items: [
                        '**Social Intelligence Pipeline**: Automated data gathering from multiple social platforms.',
                        '**Content Generation**: AI-powered content creation using OpenAI models.',
                        '**Multi-Platform Publishing**: Automated posting to Facebook and X (Twitter).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone Repository',
                    code: 'git clone https://github.com/hazemelerefey/n8n-projects.git',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Multi-Platform API Integration',
                    solution: 'Built modular n8n workflows that abstract platform-specific APIs into a unified content pipeline.'
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'digisteel-yolo',
            title: 'DigiSteel-YOLO',
            image: '/project/digisteel-yolo.webp',
            description: 'Robustness study of lightweight YOLO detectors for steel surface defect detection.',
            longDescription: 'DigiSteel-YOLO is a deep learning research project focused on evaluating and improving the robustness of lightweight YOLO architectures for industrial steel surface defect detection. The project benchmarks multiple YOLO variants against the NEU-DET dataset, analyzing performance under various conditions.',
            techStack: ['Python', 'YOLOv8', 'YOLOv11', 'OpenCV', 'PyTorch', 'Computer Vision'],
            tools: ['VS Code', 'Google Colab', 'GitHub'],
            status: 'completed',
            repoUrl: 'https://github.com/hazemelerefey/DigiSteel-Yolo',
            demoUrl: '#',
            startDate: '2025-06-01',
            role: 'Deep Learning Engineer',
            customTimeline: 'Jun 2025',
            team: 'Graduation Project',
            highlights: ['YOLO Architecture Comparison', 'Steel Defect Detection', 'Robustness Analysis'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Research & Analysis',
                    items: [
                        '**Multi-Architecture Benchmarking**: Comparison of YOLOv8, YOLOv11, and lightweight variants.',
                        '**Robustness Evaluation**: Testing under noise, blur, and lighting variations.',
                        '**Performance Metrics**: mAP, precision, recall, and inference speed analysis.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone Repository',
                    code: 'git clone https://github.com/hazemelerefey/DigiSteel-Yolo.git',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Class Imbalance in Steel Defects',
                    solution: 'Applied data augmentation and class weighting strategies to handle imbalanced defect categories.'
                }
            ]
        },
        {
            id: 'project-3',
            slug: 'global-sales-tracker',
            title: 'Global E-Commerce Sales Tracker',
            image: '/project/global-sales-tracker.webp',
            description: 'Interactive Power BI dashboard for regional sales performance analysis.',
            longDescription: 'An interactive Power BI dashboard that provides comprehensive insights into global e-commerce sales performance across multiple regions. Features dynamic filtering, KPI tracking, and trend analysis for data-driven decision making.',
            techStack: ['Power BI', 'DAX', 'SQL', 'Data Visualization', 'E-Commerce Analytics'],
            tools: ['Power BI Desktop', 'Excel', 'SQL Server'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-12-01',
            role: 'Data Analyst',
            customTimeline: 'Dec 2025',
            team: 'Personal Project',
            highlights: ['Interactive Dashboards', 'Regional Analysis', 'KPI Tracking'],
            category: 'Data Science',
            features: [
                {
                    title: 'Dashboard Features',
                    items: [
                        '**Regional Sales Breakdown**: Interactive maps and charts showing sales by region.',
                        '**KPI Tracking**: Real-time monitoring of revenue, orders, and conversion rates.',
                        '**Trend Analysis**: Time-series visualizations for seasonal and growth patterns.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Open in Power BI',
                    code: 'Open the .pbix file in Power BI Desktop',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Large Dataset Performance',
                    solution: 'Optimized DAX measures and implemented incremental refresh to handle large transaction volumes.'
                }
            ]
        },
        {
            id: 'project-4',
            slug: 'healthcare-dashboard',
            title: 'Healthcare Operations Dashboard',
            image: '/project/healthcare-dashboard.webp',
            description: 'Operations intelligence for waitlist pressure and service bottlenecks.',
            longDescription: 'A healthcare operations intelligence dashboard designed to monitor and analyze patient waitlist pressure, service bottlenecks, and operational efficiency metrics. Enables healthcare administrators to make data-driven decisions for resource allocation.',
            techStack: ['Power BI', 'DAX', 'SQL', 'Healthcare Analytics', 'Data Modeling'],
            tools: ['Power BI Desktop', 'SQL Server', 'Excel'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-12-01',
            role: 'Data Analyst',
            customTimeline: 'Dec 2025',
            team: 'Personal Project',
            highlights: ['Waitlist Analytics', 'Bottleneck Detection', 'Resource Optimization'],
            category: 'Data Science',
            features: [
                {
                    title: 'Analytics Features',
                    items: [
                        '**Waitlist Monitoring**: Real-time tracking of patient wait times and queue lengths.',
                        '**Bottleneck Identification**: Automated detection of service bottlenecks and capacity constraints.',
                        '**Resource Allocation**: Data-driven recommendations for staff and equipment distribution.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Open in Power BI',
                    code: 'Open the .pbix file in Power BI Desktop',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Complex Healthcare Data Relationships',
                    solution: 'Designed a star schema data model to simplify relationships between patients, services, and resources.'
                }
            ]
        },
        {
            id: 'project-neuroscope',
            slug: 'neuroscope',
            title: 'NeuroScope',
            image: '/project/neuroscope.webp',
            description: 'AI-powered neuroscience analysis platform for brain imaging and neural pattern recognition.',
            longDescription: 'NeuroScope is a neuroscience analysis platform that leverages deep learning for brain imaging analysis and neural pattern recognition. The project applies computer vision and signal processing techniques to medical imaging data.',
            techStack: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'Computer Vision'],
            tools: ['VS Code', 'Google Colab', 'GitHub'],
            status: 'ongoing',
            repoUrl: 'https://github.com/hazemelerefey/NeuroScope',
            demoUrl: '#',
            startDate: '2026-08-01',
            role: 'Deep Learning Engineer',
            customTimeline: 'August 2026',
            team: 'Personal Project',
            highlights: ['Brain Imaging', 'Neural Pattern Recognition', 'Computer Vision'],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Neural Analysis',
                    items: [
                        '**Brain Imaging Processing**: Advanced analysis of MRI and fMRI scans.',
                        '**Pattern Recognition**: Deep learning-based neural pattern detection.',
                        '**Signal Processing**: EEG and neural signal analysis pipelines.'
                    ]
                },
                {
                    title: 'Deep Learning Pipeline',
                    items: [
                        '**CNN Architectures**: Custom convolutional networks for medical imaging.',
                        '**Transfer Learning**: Pre-trained models fine-tuned for neuroscience tasks.',
                        '**Model Evaluation**: Comprehensive benchmarking across multiple architectures.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone Repository',
                    code: 'git clone https://github.com/hazemelerefey/NeuroScope.git',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Medical Image Variability',
                    solution: 'Applied data augmentation and normalization techniques to handle diverse imaging conditions.'
                }
            ]
        },
        {
            id: 'project-5',
            slug: 'jobpulse',
            title: 'JobPulse',
            image: '/project/jobpulse.webp',
            description: 'Market intelligence command center for job-posting data signals.',
            longDescription: 'JobPulse is a market intelligence platform that aggregates and analyzes job posting data to provide insights into hiring trends, skill demand, and market dynamics. Features real-time data processing and interactive analytics.',
            techStack: ['Python', 'Pandas', 'Data Analytics', 'Web Scraping', 'Visualization'],
            tools: ['VS Code', 'Jupyter Notebook', 'GitHub'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-12-01',
            role: 'Data Analyst',
            customTimeline: 'Dec 2025',
            team: 'Personal Project',
            highlights: ['Job Market Analytics', 'Skill Demand Tracking', 'Trend Intelligence'],
            category: 'Data Science',
            features: [
                {
                    title: 'Intelligence Features',
                    items: [
                        '**Job Market Trends**: Analysis of hiring patterns and industry growth signals.',
                        '**Skill Demand Analysis**: Tracking of in-demand technical and soft skills.',
                        '**Market Signals**: Real-time monitoring of job posting velocity and sentiment.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone Repository',
                    code: 'git clone https://github.com/hazemelerefey/JobPulse.git',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Noisy Job Posting Data',
                    solution: 'Implemented NLP-based filtering and normalization to extract structured insights from unstructured job descriptions.'
                }
            ]
        },
        {
            id: 'project-kinza',
            slug: 'kinza',
            title: 'KINZA',
            image: '/project/kinza.webp',
            description: 'Bold, refreshing soda brand website from Saudi Arabia with 3D product rendering and immersive animations.',
            longDescription: 'KINZA is a premium Saudi Arabian soda brand landing page featuring 3D product visualization, GSAP-powered animations, and a bold visual identity. The site showcases 7 iconic flavors with immersive scroll-driven interactions and model-viewer integration for interactive 3D product experiences.',
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Three.js', 'Model Viewer'],
            tools: ['VS Code', 'Blender', 'Photoshop'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2026-06-01',
            role: 'Frontend Developer & 3D Artist',
            customTimeline: 'June 2026',
            team: 'Personal Project',
            highlights: ['3D Product Rendering', 'GSAP Animations', 'Brand Identity'],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Immersive Product Showcase',
                    items: [
                        '**3D Model Viewer**: Interactive 3D product visualization with Google Model Viewer.',
                        '**GSAP Animations**: Scroll-driven and entrance animations for dynamic storytelling.',
                        '**Multi-Flavor Display**: Showcasing 7 iconic soda flavors with bold visuals.'
                    ]
                },
                {
                    title: 'Brand Experience',
                    items: [
                        '**Bold Visual Identity**: Custom typography and color system matching the Kinza brand.',
                        '**Responsive Design**: Optimized for all screen sizes with fluid layouts.',
                        '**Performance**: Lightweight assets with optimized loading strategies.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Open in Browser',
                    code: '# Simply open index.html in a modern browser',
                    type: 'text'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: '3D Product Integration',
                    solution: 'Used Google Model Viewer for seamless 3D product rendering with GLB assets.'
                }
            ]
        },
    ],
    experiences: [
        {
            id: 'story-1',
            company: 'Al-Nasr Club',
            position: 'Professional Football Player',
            description: 'Youngest player promoted to the first team at Al-Nasr Club at age 16.',
            responsibilities: [
                'Promoted to first team at Al-Nasr Club at age 16, the youngest in the third division.',
                'Developed exceptional football skills that earned the nickname "master" on every field.',
            ],
            skills: ['Football', 'Teamwork', 'Discipline', 'Leadership'],
            startDate: '2018-01-01',
            endDate: '2020-03-01',
            isOngoing: false,
            location: 'Egypt',
            type: 'volunteer',
            logo: '/journey/football.webp',
        },
        {
            id: 'story-2',
            company: 'FWD Initiative (MCIT & ITIDA)',
            position: 'Frontend Developer',
            description: 'Completed the Future Work is Digital initiative in Web Development, mastering HTML5, CSS3, and JavaScript.',
            responsibilities: [
                'Completed the FWD Challenge level covering HTML5, CSS3, and JavaScript fundamentals.',
                'Discovered a passion for frontend development and creative web experiences.',
            ],
            skills: ['HTML5', 'CSS3', 'JavaScript', 'Web Development'],
            startDate: '2021-06-01',
            endDate: '2021-12-01',
            isOngoing: false,
            location: 'Egypt',
            type: 'apprenticeship',
            logo: '/journey/frontend.webp',
        },
        {
            id: 'story-3',
            company: 'University Theatre Team',
            position: 'Official Graphic Designer',
            description: 'Became the official graphic designer, winning Best Pamphlet Design at the annual Theatre Competition in 2024.',
            responsibilities: [
                'Designed banners, pamphlets, and visual identity for the theater team.',
                'Won Best Pamphlet Design award at the annual Theatre Competition in 2024.',
            ],
            skills: ['Photoshop', 'Motion Graphics', 'Blender', 'Graphic Design'],
            startDate: '2022-06-01',
            endDate: '2024-12-01',
            isOngoing: false,
            location: 'Port Said, Egypt',
            type: 'freelance',
            logo: '/journey/design.webp',
        },
        {
            id: 'story-4',
            company: 'Digilians (MCIT)',
            position: 'Applied AI & Data Analytics',
            description: 'Enrolled in the specialized diploma program in Applied AI & Data Analytics, learning Python, SQL, data analytics, machine learning, and Power BI.',
            responsibilities: [
                'Completed foundational courses in Python, SQL, data analytics, and machine learning.',
                'Gained proficiency in Power BI and data visualization techniques.',
            ],
            skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Data Analytics'],
            startDate: '2025-12-01',
            endDate: '2026-06-01',
            isOngoing: false,
            location: 'Egypt',
            type: 'apprenticeship',
            logo: '/journey/digilians.webp',
        },
    ],
    education: [
        {
            id: 'edu-high-school',
            institution: 'Emad El Din Ayoub Secondary School',
            degree: 'High School Diploma',
            major: 'General Secondary Education',
            isOngoing: false,
            activities: [],
            achievements: [],
        },
        {
            id: 'edu-university',
            institution: 'Port Said University',
            degree: 'Bachelor of Laws (LLB)',
            major: 'Law',
            startDate: '2020-09-01',
            endDate: '2024-06-30',
            isOngoing: false,
            activities: ['Legal seminars', 'Moot court sessions'],
            achievements: [],
        },
        {
            id: 'edu-digilians',
            institution: 'Digilians (MCIT)',
            degree: 'Professional Diploma',
            major: 'Applied AI & Data Analytics',
            startDate: '2025-12-01',
            endDate: '2026-06-01',
            isOngoing: false,
            activities: ['Applied AI', 'Data Analytics', 'Machine Learning', 'Power BI'],
            achievements: [],
        },
    ],
    achievements: [
        {
            id: 'cert-1',
            title: 'AI Agent Fundamentals with Azure AI Foundry',
            issuer: 'Microsoft',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/AI agent fundamentals with Azure AI Foundry.jpg',
        },
        {
            id: 'cert-2',
            title: 'Data Analysis with R Programming',
            issuer: 'Google',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Data Analysis with R Programming.jpg',
        },
        {
            id: 'cert-3',
            title: 'Foundations: Data, Data, Everywhere',
            issuer: 'Google',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Foundations Data Data Everywhere.jpg',
        },
        {
            id: 'cert-4',
            title: 'Foundations of Business Intelligence',
            issuer: 'Google',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Foundations of Business Intelligence.jpg',
        },
        {
            id: 'cert-5',
            title: 'Generative AI Prompt Engineering Basics',
            issuer: 'Google',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Generative AI Prompt Engineering Basics.jpg',
        },
        {
            id: 'cert-6',
            title: 'Google Data Analytics',
            issuer: 'Google',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Google Data Analytics.jpg',
        },
        {
            id: 'cert-7',
            title: 'Introduction to Deep Learning and Neural Networks with Keras',
            issuer: 'IBM',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Introduction to Deep Learning and Neural Networks with Keras.jpg',
        },
        {
            id: 'cert-8',
            title: 'Introduction to Sales and AI Fundamentals',
            issuer: 'IBM',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Introduction to Sales and AI Fundamentals.jpg',
        },
        {
            id: 'cert-9',
            title: 'Introduction to Social Media Marketing',
            issuer: 'Meta',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Introduction to Social Media Marketing.jpg',
        },
        {
            id: 'cert-10',
            title: 'Microsoft Certified: Power BI Data Analyst Associate',
            issuer: 'Microsoft',
            date: '2026-01-01',
            category: 'certification',
            image: '/certificate/Microsoft Certified Power BI Data Analyst Associate.jpg',
        },
    ],
    techStack: [
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', category: 'language' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript', category: 'language' },
        { name: 'Solidity', icon: 'https://cdn.simpleicons.org/solidity', category: 'language' },
        { name: 'React', icon: 'https://cdn.simpleicons.org/react', category: 'framework' },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', category: 'framework' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs', category: 'framework' },
        { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow', category: 'library' },
        { name: 'Scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn', category: 'library' },
        { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas', category: 'library' },
        { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy', category: 'library' },
        { name: 'Matplotlib', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg', category: 'library' }, // Matplotlib not on simpleicons sometimes or generic
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', category: 'library' },
        { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis', category: 'database' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'database' },
        { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes', category: 'tool' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'tool' },
        { name: 'Terraform', icon: 'https://cdn.simpleicons.org/terraform', category: 'tool' },
        { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain', category: 'library' },
        { name: 'Mistral AI', icon: 'https://cdn.simpleicons.org/mistralai', category: 'library' },
        { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch', category: 'library' },
        { name: 'OpenCV', icon: 'https://cdn.simpleicons.org/opencv', category: 'library' },
        { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi', category: 'framework' },
        { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask', category: 'framework' },
    ],
        hardSkills: [
        // Applied AI & Data Analytics
        { name: 'AI Agents & Autonomy', level: 'beginner', category: 'ai', description: 'Designing autonomous systems with recursive reasoning and decision-making capabilities.' },
        { name: 'Large Language Models (LLM)', level: 'intermediate', category: 'ai', description: 'Fine-tuning open source models, RAG architectures, and prompt engineering.' },
        { name: 'Data Science', level: 'advanced', category: 'ai', description: 'Advanced statistical analysis and predictive modeling to extract insights from big data.' },
        { name: 'Deep Learning (CV/NLP)', level: 'intermediate', category: 'ai', description: 'Architecting deep neural networks for computer vision and natural language tasks.' },
        { name: 'Computer Vision', level: 'advanced', category: 'ai', description: 'Developing real-time object detection, pattern recognition, and spatial analysis systems.' },
        { name: 'Machine Learning Ops', level: 'intermediate', category: 'ai', description: 'Implementing pipelines for model training, deployment, and performance monitoring.' },
        { name: 'Data Analytics', level: 'advanced', category: 'ai', description: 'Transforming raw data into meaningful visualizations and strategic intelligence.' },
        { name: 'Data Visualization', level: 'advanced', category: 'ai', description: 'Crafting intuitive and interactive dashboards to communicate complex data findings.' },
        { name: 'SQL & DBMS', level: 'intermediate', category: 'ai', description: 'Designing and querying relational databases for high-performance data applications.' },

        // Frontend Development
        { name: 'Frontend Architecture', level: 'advanced', category: 'software', description: 'Designing scalable component systems and modern web architectures with React and Next.js.' },
        { name: 'UI/UX Design', level: 'advanced', category: 'software', description: 'Crafting intuitive, accessible, and visually compelling user interfaces and experiences.' },
        { name: 'Responsive Design', level: 'expert', category: 'software', description: 'Building pixel-perfect, mobile-first interfaces that work seamlessly across all devices.' },
        { name: 'Frontend Performance', level: 'advanced', category: 'software', description: 'Optimizing Core Web Vitals, bundle sizes, and rendering strategies for fast apps.' },
        { name: 'Component Systems', level: 'expert', category: 'software', description: 'Engineering reusable, composable component libraries with design tokens.' },

        // Additional Skills
        { name: 'Motion Graphics', level: 'advanced', category: 'other', description: 'Creating dynamic animations and visual effects using After Effects and Lottie.' },
        { name: '3D Modeling (Blender)', level: 'intermediate', category: 'other', description: 'Modeling, texturing, and rendering 3D scenes for web and product visualization.' },
        { name: 'Docker & Kubernetes', level: 'intermediate', category: 'other', description: 'Containerizing applications for consistent deployment and cloud orchestration.' },
        { name: 'Git & GitHub', level: 'advanced', category: 'other', description: 'Version control, branching strategies, and collaborative code review workflows.' },
        { name: 'Google Cloud Platform', level: 'beginner', category: 'other', description: 'Utilizing cloud infrastructure and services for scalable application hosting.' },
    ],

softSkills: [
        { name: 'Problem Solving', description: 'Innovative debugging and algorithmic optimization' },
        { name: 'Systemic Thinking', description: 'Designing robust, scalable end-to-end architectures' },
        { name: 'Critical Thinking', description: 'Analytical approach to solving complex engineering challenges' },
        { name: 'Continuous Learning', description: 'Staying updated with state-of-the-art AI research' },
        { name: 'Analytical Thinking', description: 'Breaking down complex data into actionable insights' },
        { name: 'Adaptability', description: 'Quickly mastering new frameworks and AI models' },
        { name: 'Leadership', description: 'Leading engineering teams and managing complex projects' },
        { name: 'Communication', description: 'Translating complex AI concepts for stakeholders' },
        { name: 'Teamwork', description: 'Collaborative development in cross-functional agile teams' },
        { name: 'Research Skills', description: 'In-depth literature review and academic contribution' },
    ],
    tools: [
        { name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg', category: 'ide' },
        { name: 'Jupyter', icon: 'https://cdn.simpleicons.org/jupyter', category: 'ide' },
        { name: 'Google Colab', icon: 'https://cdn.simpleicons.org/googlecolab', category: 'ide' },
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma', category: 'design' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github', category: 'devops' }, // Default black, handled by dark:invert in component
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'devops' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'devops' },
        { name: 'Conda', icon: 'https://cdn.simpleicons.org/anaconda', category: 'devops' },
        { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux', category: 'devops' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman', category: 'devops' },
    ],
    faqs: [
        {
            question: 'What services do you offer?',
            answer: 'I specialize in Full Stack Development (React, Next.js, Node.js), AI/ML Development (TensorFlow, Computer Vision, NLP), Data Science, and Blockchain/Web3 development (Solidity, Smart Contracts, DApps).',
        },
        {
            question: 'What technologies are you exploring?',
            answer: 'Currently diving deep into AI Agents, Blockchain technology (Solidity, Smart Contracts), and MLOps for production-ready AI systems.',
        },
        {
            question: 'Are you available for opportunities?',
            answer: 'Yes! I\'m open to internships, collaborations, and exciting projects in AI, Data Science, Full Stack Development, and Blockchain. Feel free to reach out!',
        },
    ],
    blogs: [
        {
            id: 'blog-1',
            slug: 'future-of-ai-agents',
            title: 'The Future of AI Agents in Enterprise',
            excerpt: 'How autonomous agents are redefining software architecture and decision-making processes.',
            content: 'Detailed exploration of AI agents...',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-20',
            category: 'applied-ai',
            tags: ['AI', 'Agents', 'Enterprise'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '5'
        },
        {
            id: 'blog-2',
            slug: 'web3-ux-challenges',
            title: 'Overcoming Web3 UX Challenges',
            excerpt: 'Strategies for building decentralized applications that feel as smooth as Web2.',
            content: 'UX in Web3 is critical...',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-15',
            category: 'more',
            tags: ['Web3', 'Blockchain', 'UX'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '4'
        },
        {
            id: 'blog-3',
            slug: 'mastering-nextjs-performance',
            title: 'Mastering Next.js Performance',
            excerpt: 'Advanced techniques for optimizing Core Web Vitals in modern React applications.',
            content: 'Performance optimization...',
            image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-05',
            category: 'software-development',
            tags: ['Next.js', 'React', 'Performance'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '6'
        },
        {
            id: 'blog-4',
            slug: 'ai-driven-security',
            title: 'AI-Driven Cybersecurity',
            excerpt: 'Using deep learning to detect and prevent modern network intrusion.',
            content: 'Cybersecurity with AI...',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-02-28',
            category: 'applied-ai',
            tags: ['AI', 'Security', 'Deep Learning'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '7'
        },
        {
            id: 'blog-5',
            slug: 'llm-fine-tuning',
            title: 'Fine-Tuning LLMs locally',
            excerpt: 'A guide to optimizing open-source models using Ollama and LoRA techniques.',
            content: 'Local LLM fine-tuning...',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-02-15',
            category: 'applied-ai',
            tags: ['LLM', 'Python', 'Ollama'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '8'
        },
        {
            id: 'blog-6',
            slug: 'smart-contract-security',
            title: 'Smart Contract Audit Patterns',
            excerpt: 'Common vulnerabilities and how to prevent them in Solidity.',
            content: 'Audit patterns...',
            image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-02-01',
            category: 'more',
            tags: ['Solidity', 'Ethereum', 'Security'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '5'
        },
        {
            id: 'blog-7',
            slug: 'modern-state-management',
            title: 'Modern State Management in React',
            excerpt: 'Comparing Zustand, Redux Toolkit, and React Context for large-scale apps.',
            content: 'State management...',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-01-25',
            category: 'software-development',
            tags: ['React', 'Zustand', 'Architecture'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '4'
        },
        {
            id: 'blog-8',
            slug: 'iot-edge-computing',
            title: 'Edge Computing with ESP32',
            excerpt: 'Implementing real-time data processing at the edge for industrial IoT.',
            content: 'Edge computing...',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-01-10',
            category: 'software-development',
            tags: ['IoT', 'ESP32', 'Edge'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '6'
        },
        {
            id: 'blog-9',
            slug: 'ai-in-healthcare',
            title: 'AI Transformation in Healthcare',
            excerpt: 'How computer vision is assisting in medical diagnostics and data analysis.',
            content: 'Healthcare AI...',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-01-05',
            category: 'applied-ai',
            tags: ['Healthcare', 'AI', 'Ethics'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '7'
        },
        {
            id: 'blog-10',
            slug: 'the-architects-manifesto',
            title: "Digital Garden: The Architect's Manifesto",
            excerpt: "Reflecting on my journey as an AI Engineer and the philosophy behind building intelligent, scalable systems.",
            content: "My journey into the world of technology hasn't been just about code...",
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-31',
            category: 'about-me',
            tags: ['Philosophy', 'Engineering', 'About Me'],
            author: { name: 'Hazem', avatar: '/about/profile.jpg' },
            readTime: '5'
        }
    ],
    gallery: [
        {
            id: 'gal-1',
            title: 'CPS Lab Research',
            description: 'Deep Learning research workshop at Cyber Physical System Laboratory.',
            date: '2025-01-20',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'research'
        },
        {
            id: 'gal-2',
            title: 'Smart City Symposium',
            description: 'Presenting AIoT solutions for sustainable urban development.',
            date: '2024-12-15',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
            thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'event'
        },
        {
            id: 'gal-3',
            title: 'Neural Network Visualization',
            description: 'Custom visualization of a Convolutional Neural Network architecture.',
            date: '2024-11-30',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'technical'
        },
        {
            id: 'gal-4',
            title: 'Blockchain Hackathon',
            description: 'Building decentralized finance solutions in 48 hours.',
            date: '2024-10-25',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'event'
        },
        {
            id: 'gal-5',
            title: 'IoT Prototype Demo',
            description: 'Testing real-time sensor integration with cloud platforms.',
            date: '2024-09-15',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'technical'
        }
    ],
};
