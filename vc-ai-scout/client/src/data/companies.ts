export interface Company {
    id: string;
    name: string;
    website: string;
    description: string;
    industry: string;
    stage: string;
    location: string;
    foundedYear: number;
    tags: string[];
    logo?: string;
}

export const companies: Company[] = [
    {
        id: '1',
        name: 'OpenAI',
        website: 'https://openai.com',
        description: 'AI research and deployment company behind ChatGPT and DALL-E, focusing on developing safe and beneficial artificial general intelligence.',
        industry: 'Artificial Intelligence',
        stage: 'Established',
        location: 'San Francisco, CA',
        foundedYear: 2015,
        tags: ['LLM', 'Generative AI', 'AGI']
    },
    {
        id: '2',
        name: 'Stripe',
        website: 'https://stripe.com',
        description: 'Financial infrastructure platform for the internet, offering payment processing and business management solutions for online businesses.',
        industry: 'Fintech',
        stage: 'Established',
        location: 'San Francisco, CA',
        foundedYear: 2010,
        tags: ['Payments', 'API', 'E-commerce']
    },
    {
        id: '3',
        name: 'Anthropic',
        website: 'https://anthropic.com',
        description: 'AI safety and research company that builds reliable, interpretable, and steerable AI systems like the Claude chatbot family.',
        industry: 'Artificial Intelligence',
        stage: 'Series C',
        location: 'San Francisco, CA',
        foundedYear: 2021,
        tags: ['AI Safety', 'Claude', 'LLM']
    },
    {
        id: '4',
        name: 'SpaceX',
        website: 'https://spacex.com',
        description: 'Aerospace manufacturer and space transport services company known for Falcon 9, Starship, and Starlink satellite constellation.',
        industry: 'Aerospace',
        stage: 'Established',
        location: 'Hawthorne, CA',
        foundedYear: 2002,
        tags: ['Space', 'Satellites', 'Rockets']
    },
    {
        id: '5',
        name: 'Perplexity AI',
        website: 'https://perplexity.ai',
        description: 'Conversational search engine that provides direct answers to queries with sourced citations, aiming to redefine information retrieval.',
        industry: 'Artificial Intelligence',
        stage: 'Series B',
        location: 'San Francisco, CA',
        foundedYear: 2022,
        tags: ['Search', 'AI', 'NLP']
    },
    {
        id: '6',
        name: 'Anduril Industries',
        website: 'https://anduril.com',
        description: 'Defense technology company that uses AI and computer vision to build autonomous systems for national security and border protection.',
        industry: 'Defense',
        stage: 'Series E',
        location: 'Costa Mesa, CA',
        foundedYear: 2017,
        tags: ['Autonomous', 'Security', 'Hardware']
    },
    {
        id: '7',
        name: 'Linear',
        website: 'https://linear.app',
        description: 'Issue tracking and project management tool designed for high-performance software teams, focusing on speed and streamlined workflows.',
        industry: 'Productivity',
        stage: 'Series B',
        location: 'San Francisco, CA',
        foundedYear: 2019,
        tags: ['SaaS', 'DevTools', 'Project Management']
    },
    {
        id: '8',
        name: 'Rippling',
        website: 'https://rippling.com',
        description: 'Workforce management platform that unifies HR, IT, and Finance systems to automate employee onboarding and management.',
        industry: 'HR Tech',
        stage: 'Series E',
        location: 'San Francisco, CA',
        foundedYear: 2016,
        tags: ['SaaS', 'HRIS', 'Automation']
    },
    {
        id: '9',
        name: 'Commonwealth Fusion Systems',
        website: 'https://cfs.energy',
        description: 'Clean energy company dedicated to commercializing fusion power using high-temperature superconducting magnets.',
        industry: 'Energy',
        stage: 'Series B',
        location: 'Cambridge, MA',
        foundedYear: 2018,
        tags: ['Fusion', 'CleanTech', 'DeepTech']
    },
    {
        id: '10',
        name: 'Scale AI',
        website: 'https://scale.com',
        description: 'Data infrastructure for AI that provides high-quality training data for machine learning models through automated and human labeling.',
        industry: 'Artificial Intelligence',
        stage: 'Series F',
        location: 'San Francisco, CA',
        foundedYear: 2016,
        tags: ['Data Labeling', 'Machine Learning', 'Infrastructure']
    },
    {
        id: '11',
        name: 'Ramp',
        website: 'https://ramp.com',
        description: 'Corporate card and finance automation platform designed to help businesses spend less and automate their accounting.',
        industry: 'Fintech',
        stage: 'Series D',
        location: 'New York, NY',
        foundedYear: 2019,
        tags: ['Spend Management', 'Credit Cards', 'B2B']
    },
    {
        id: '12',
        name: 'Mistral AI',
        website: 'https://mistral.ai',
        description: 'European AI company focusing on open-source large language models with a focus on efficiency and performance.',
        industry: 'Artificial Intelligence',
        stage: 'Series B',
        location: 'Paris, France',
        foundedYear: 2023,
        tags: ['Open Source', 'LLM', 'Europe']
    },
    {
        id: '13',
        name: 'Notion',
        website: 'https://notion.so',
        description: 'All-in-one workspace for notes, tasks, wikis, and databases, enabling teams to collaborate and stay organized.',
        industry: 'Productivity',
        stage: 'Established',
        location: 'San Francisco, CA',
        foundedYear: 2013,
        tags: ['Collaboration', 'Knowledge Management', 'SaaS']
    },
    {
        id: '14',
        name: 'Runway',
        website: 'https://runwayml.com',
        description: 'Applied AI research company building the next generation of creative tools for video generation and image editing.',
        industry: 'Artificial Intelligence',
        stage: 'Series C',
        location: 'New York, NY',
        foundedYear: 2018,
        tags: ['Video AI', 'Generative Media', 'Design']
    },
    {
        id: '15',
        name: 'Agility Robotics',
        website: 'https://agilityrobotics.com',
        description: 'Robotics company building bipedal robots like Digit for logistics and warehouse automation.',
        industry: 'Robotics',
        stage: 'Series B',
        location: 'Corvallis, OR',
        foundedYear: 2015,
        tags: ['Hardware', 'Logistics', 'Automation']
    },
    {
        id: '16',
        name: 'Canva',
        website: 'https://canva.com',
        description: 'Online design and publishing tool that makes graphic design accessible to everyone with a drag-and-drop interface.',
        industry: 'Design',
        stage: 'Established',
        location: 'Sydney, Australia',
        foundedYear: 2013,
        tags: ['Graphic Design', 'Creativity', 'SaaS']
    },
    {
        id: '17',
        name: 'xAI',
        website: 'https://x.ai',
        description: 'Artificial intelligence company founded by Elon Musk, developing the Grok conversational AI.',
        industry: 'Artificial Intelligence',
        stage: 'Series B',
        location: 'San Francisco, CA',
        foundedYear: 2023,
        tags: ['Grok', 'LLM', 'Generative AI']
    },
    {
        id: '18',
        name: 'Neuralink',
        website: 'https://neuralink.com',
        description: 'Neurotechnology company developing implantable brain-machine interfaces to treat neurological conditions.',
        industry: 'BioTech',
        stage: 'Series D',
        location: 'Fremont, CA',
        foundedYear: 2016,
        tags: ['BMI', 'Neuroscience', 'DeepTech']
    },
    {
        id: '19',
        name: 'Harvey',
        website: 'https://harvey.ai',
        description: 'AI platform for law firms that uses generative AI to assist with legal research, drafting, and analysis.',
        industry: 'Legal Tech',
        stage: 'Series B',
        location: 'San Francisco, CA',
        foundedYear: 2022,
        tags: ['Generative AI', 'Legal', 'Enterprise']
    },
    {
        id: '20',
        name: 'Flexport',
        website: 'https://flexport.com',
        description: 'Modern freight forwarder and supply chain management platform that uses data to provide visibility and control.',
        industry: 'Logistics',
        stage: 'Established',
        location: 'San Francisco, CA',
        foundedYear: 2013,
        tags: ['Supply Chain', 'Global Trade', 'Tech-enabled']
    }
];
