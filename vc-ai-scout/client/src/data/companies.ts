export interface Company {
    id: string;
    name: string;
    website: string;
    description: string;
    industry: string;
    stage: 'Pre-seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C';
    location: string;
    foundedYear: number;
    tags: string[];
}

export const companies: Company[] = [
    {
        id: '1',
        name: 'EcoFlow Systems',
        website: 'https://ecoflow-example.com',
        description: 'Next-generation solar panel optimization software using AI to maximize energy yield.',
        industry: 'CleanTech',
        stage: 'Seed',
        location: 'San Francisco, CA',
        foundedYear: 2022,
        tags: ['Solar', 'AI', 'Sustainability']
    },
    {
        id: '2',
        name: 'HealthBridge AI',
        website: 'https://healthbridge-ai.com',
        description: 'Connecting rural hospitals with specialist consultants through a low-latency telemedicine platform.',
        industry: 'HealthTech',
        stage: 'Series A',
        location: 'Boston, MA',
        foundedYear: 2021,
        tags: ['Telemedicine', 'Rural Health', 'Consulting']
    },
    {
        id: '3',
        name: 'SecureNode',
        website: 'https://securenode.io',
        description: 'Automated cybersecurity auditing for decentralized finance protocols.',
        industry: 'Cybersecurity',
        stage: 'Seed',
        location: 'London, UK',
        foundedYear: 2023,
        tags: ['DeFi', 'Blockchain', 'Security']
    },
    {
        id: '4',
        name: 'QuantumFlow',
        website: 'https://quantumflow.tech',
        description: 'Software development kit for near-term quantum processors.',
        industry: 'DeepTech',
        stage: 'Pre-seed',
        location: 'Berlin, Germany',
        foundedYear: 2024,
        tags: ['Quantum Computing', 'SaaS', 'DevTools']
    },
    {
        id: '5',
        name: 'AgriSense',
        website: 'https://agrisense.co',
        description: 'IoT sensor networks for precision irrigation in drought-prone regions.',
        industry: 'AgriTech',
        stage: 'Series A',
        location: 'Austin, TX',
        foundedYear: 2020,
        tags: ['IoT', 'Smart Farming', 'Hardware']
    },
    {
        id: '6',
        name: 'Lumina Learning',
        website: 'https://lumina-edu.com',
        description: 'Individualized learning paths for K-12 students using LLM-based tutors.',
        industry: 'EdTech',
        stage: 'Seed',
        location: 'Toronto, Canada',
        foundedYear: 2022,
        tags: ['AI', 'Education', 'Personalization']
    },
    {
        id: '7',
        name: 'Orbit Logistics',
        website: 'https://orbit-logistics.io',
        description: 'Last-mile delivery optimization for autonomous drone fleets.',
        industry: 'Logistics',
        stage: 'Series A',
        location: 'Singapore',
        foundedYear: 2021,
        tags: ['Drones', 'Autonomous', 'Optimization']
    },
    {
        id: '8',
        name: 'BioSyn Labs',
        website: 'https://biosyn-labs.com',
        description: 'High-throughput protein synthesis for specialized pharmaceutical applications.',
        industry: 'BioTech',
        stage: 'Series B',
        location: 'San Diego, CA',
        foundedYear: 2019,
        tags: ['Drug Discovery', 'Synthetic Biology', 'Lab Automation']
    },
    {
        id: '9',
        name: 'FinScale',
        website: 'https://finscale.app',
        description: 'Embedded finance APIs for non-financial SaaS platforms.',
        industry: 'FinTech',
        stage: 'Series A',
        location: 'New York, NY',
        foundedYear: 2021,
        tags: ['Payments', 'API', 'B2B']
    },
    {
        id: '10',
        name: 'UrbanPods',
        website: 'https://urbanpods.com',
        description: 'Modular, sustainable housing units for micro-living in dense urban areas.',
        industry: 'PropTech',
        stage: 'Seed',
        location: 'Tokyo, Japan',
        foundedYear: 2022,
        tags: ['Modular', 'Architecture', 'Sustainability']
    },
    {
        id: '11',
        name: 'NexaMesh',
        website: 'https://nexamesh.net',
        description: 'Peer-to-peer mesh networking protocols for areas with poor cellular coverage.',
        industry: 'Connectivity',
        stage: 'Pre-seed',
        location: 'Denver, CO',
        foundedYear: 2024,
        tags: ['Networking', 'P2P', 'Infrastructure']
    },
    {
        id: '12',
        name: 'CoreAI Robotics',
        website: 'https://coreai-robotics.com',
        description: 'Modular robotic arms for small-scale warehouse automation.',
        industry: 'Robotics',
        stage: 'Series A',
        location: 'Munich, Germany',
        foundedYear: 2020,
        tags: ['Hardware', 'Warehouse', 'Automation']
    },
    {
        id: '13',
        name: 'Vibrant Analytics',
        website: 'https://vibrant-analytics.io',
        description: 'Real-time consumer behavior tracking for physical retail stores.',
        industry: 'RetailTech',
        stage: 'Seed',
        location: 'Chicago, IL',
        foundedYear: 2022,
        tags: ['Big Data', 'Analytics', 'Retail']
    },
    {
        id: '14',
        name: 'ClearOceans',
        website: 'https://clearoceans.org',
        description: 'Autonomous surface vessels for collecting plastic waste from river mouths.',
        industry: 'Environment',
        stage: 'Series A',
        location: 'Amsterdam, Netherlands',
        foundedYear: 2021,
        tags: ['Maritime', 'Sustainability', 'Robotics']
    },
    {
        id: '15',
        name: 'InsightFlow',
        website: 'https://insightflow.ai',
        description: 'Automated meeting transcription and action-item generation for enterprise teams.',
        industry: 'Productivity',
        stage: 'Seed',
        location: 'Seattle, WA',
        foundedYear: 2023,
        tags: ['AI', 'Enterprise', 'NLP']
    },
    {
        id: '16',
        name: 'SwiftDoc',
        website: 'https://swiftdoc.co',
        description: 'Instant verification of international medical credentials for migrant healthcare workers.',
        industry: 'HRTech',
        stage: 'Pre-seed',
        location: 'Melbourne, Australia',
        foundedYear: 2024,
        tags: ['Verification', 'Healthcare', 'B2B']
    },
    {
        id: '17',
        name: 'DataShield',
        website: 'https://datashield.io',
        description: 'Privacy-preserving collaborative data analysis using federated learning.',
        industry: 'Data Privacy',
        stage: 'Series B',
        location: 'Paris, France',
        foundedYear: 2020,
        tags: ['Machine Learning', 'Privacy', 'Encryption']
    },
    {
        id: '18',
        name: 'GourmetGrid',
        website: 'https://gourmetgrid.com',
        description: 'Direct-to-consumer marketplace for artisan food producers across Europe.',
        industry: 'FoodTech',
        stage: 'Seed',
        location: 'Barcelona, Spain',
        foundedYear: 2022,
        tags: ['Marketplace', 'D2C', 'Food']
    },
    {
        id: '19',
        name: 'Zenith Space',
        website: 'https://zenith-space.tech',
        description: 'Low-cost satellite propulsion systems using high-density ionic liquids.',
        industry: 'SpaceTech',
        stage: 'Series A',
        location: 'Los Angeles, CA',
        foundedYear: 2021,
        tags: ['Propulsion', 'Satellites', 'Hardware']
    },
    {
        id: '20',
        name: 'NovaPath',
        website: 'https://novapath.ai',
        description: 'AI-guided career pathing and upskilling for the gig economy workforce.',
        industry: 'FutureOfWork',
        stage: 'Pre-seed',
        location: 'Cape Town, South Africa',
        foundedYear: 2024,
        tags: ['AI', 'Education', 'Gig Economy']
    }
];
