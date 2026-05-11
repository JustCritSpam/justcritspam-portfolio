export type Lang = 'it' | 'en'

export const translations = {
  it: {
    nav: {
      about: 'Chi sono',
      experience: 'Esperienza',
      projects: 'Progetti',
      contact: 'Contatti',
      hireMe: 'Contattami',
    },
    hero: {
      role: 'Minecraft Developer & Backend Engineer',
      scrollDown: 'Scopri di più',
      cta: 'Contattami',
      secondaryCta: 'Vedi i progetti',
    },
    about: {
      kicker: 'Chi sono',
      title: 'Ciao!',
      p1: 'Sono JustCritSpam, uno sviluppatore italiano specializzato in plugin Minecraft ad alte prestazioni e architetture backend distribuite. Ho iniziato a programmare configurando piccoli server per giocare con gli amici, e da lì non ho più smesso.',
      p2: 'Negli anni mi sono concentrato sul lato tecnico più profondo: ottimizzazione, sistemi distribuiti, sicurezza e architetture scalabili. Mi piace risolvere problemi complessi e costruire cose che funzionano davvero bene sotto carico.',
      experienceTitle: 'La mia esperienza',
      experienceBody: 'Attualmente lavoro come developer per AuraMC Network, uno dei network italiani più dinamici. Mi occupo principalmente di core di gioco, plugin custom, sistemi di rete e ottimizzazione delle performance. Negli anni ho sviluppato soluzioni che gestiscono migliaia di giocatori contemporanei mantenendo TPS stabile e latenza bassa.',
    },
    experience: {
      kicker: 'Le mie esperienze',
      title: 'My experiences',
      subtitle: 'Le mie esperienze passate e i progetti su cui ho lavorato.',
      items: [
        {
          date: 'Apr 2023',
          company: 'AuraMC Network',
          role: 'Core Developer',
          tech: ['java', 'kotlin', 'spigot', 'paper', 'velocity', 'postgres', 'redis', 'mongo', 'linux'],
          desc: "Sviluppo e mantenimento del core di gioco di uno dei network italiani più attivi. Mi occupo di plugin custom, sistemi di rete distribuiti, sicurezza anti-exploit e ottimizzazioni a basso livello. Collaboro con il team tecnico per garantire performance e scalabilità a migliaia di giocatori simultanei.",
          tags: [
            'Sviluppo core di gioco e plugin custom',
            'Sistemi distribuiti e architettura proxy',
            'Sicurezza, anti-cheat e prevenzione exploit',
            'Ottimizzazione TPS e performance lag-free',
            'Database Redis, PostgreSQL e MongoDB',
            'Coordinamento con il team tecnico',
          ],
        },
        {
          date: 'Set 2021',
          company: 'Digital Developer',
          role: 'Freelance · Web & Social Media',
          tech: ['react', 'nextjs', 'typescript', 'tailwind', 'node', 'html', 'css', 'figma', 'seo', 'social'],
          desc: "Sviluppo digitale a 360° per attività locali. Realizzo siti web moderni e dashboard custom: sistemi di prenotazione per ristoranti, gestione menù e ordini, area clienti riservata. Mi occupo anche di social media management e di tutta la presenza online dei clienti, dalla creazione dei contenuti alla SEO.",
          tags: [
            'Siti web custom per ristoranti e attività',
            'Dashboard prenotazioni e gestione ordini',
            'Sistemi di gestione menù digitali',
            'Social Media Management e content creation',
            'SEO, performance e accessibilità',
            'Relazione diretta col cliente',
          ],
        },
        {
          date: 'Mar 2020',
          company: 'Lavori Personali',
          role: 'Plugin & Tooling Open Source',
          tech: ['java', 'kotlin', 'go', 'grpc', 'react', 'postgres', 'mysql'],
          desc: "Sviluppo di plugin e tool open-source dedicati alla community Minecraft: tornei automatizzati, sistemi di queue, microservizi cross-platform, fork ottimizzati di server. Lavori nati dalla passione che mi hanno fatto crescere come sviluppatore.",
          tags: [
            'Plugin Spigot e Paper open source',
            'Sistemi di queue e matchmaking',
            'Microservizi in Go con gRPC',
            'Dashboard React + WebAPI',
            'Contributo a progetti community',
          ],
        },
        {
          date: 'Gen 2018',
          company: 'Self-taught',
          role: 'Da curioso a developer',
          tech: ['java', 'html', 'css', 'javascript'],
          desc: "Ho iniziato configurando server Minecraft per gli amici, poi sono passato a scrivere i miei primi plugin in Java. Da lì il salto verso architetture più complesse, web development e backend distribuiti. Tutto da autodidatta, una riga di codice alla volta.",
          tags: [
            'Auto-apprendimento e ricerca continua',
            'Primi plugin in Java e Bukkit API',
            'Web development (HTML, CSS, JS)',
            'Problem solving e curiosità tecnica',
            'Open source e contributi alla community',
          ],
        },
      ] as ExperienceItem[],
    },
    projects: {
      kicker: 'Selected Work',
      title: 'Progetti in evidenza',
      subtitle: 'Una selezione di sistemi complessi sviluppati con focus sulla precisione tecnica.',
      moreSoon: 'Altri progetti in arrivo',
      moreSoonBody: 'Sono costantemente al lavoro su nuovi progetti. Resta sintonizzato.',
      keyFeatures: 'Caratteristiche chiave',
    },
    contact: {
      kicker: 'Mettiamoci in contatto',
      title: 'Hai un progetto in mente?',
      body: 'Dalla progettazione di core complessi alla realizzazione di meccaniche di gioco uniche. Se il tuo server o la tua idea hanno bisogno di un salto di qualità tecnico, scrivimi.',
      cta: 'Contattami su Telegram',
    },
    footer: {
      built: 'Sviluppato con',
      by: 'da',
    },
    tech: {
      kicker: 'Tech Stack',
    },
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      hireMe: 'Hire me',
    },
    hero: {
      role: 'Minecraft Developer & Backend Engineer',
      scrollDown: 'Scroll down',
      cta: 'Get in touch',
      secondaryCta: 'See projects',
    },
    about: {
      kicker: 'About me',
      title: 'Hi there!',
      p1: "I'm JustCritSpam, an Italian developer focused on high-performance Minecraft plugins and distributed backend architectures. I started programming by setting up small Minecraft servers to play with friends, and I never stopped.",
      p2: "Over the years I've focused on the deeper technical side: optimization, distributed systems, security and scalable architectures. I love solving complex problems and building things that perform well under load.",
      experienceTitle: 'My experience',
      experienceBody: "I currently work as a developer for AuraMC Network, one of the most active Italian networks. I mainly work on game cores, custom plugins, network systems and performance optimization. Over the years I've built solutions that handle thousands of concurrent players while keeping TPS stable and latency low.",
    },
    experience: {
      kicker: 'My experience',
      title: 'My experiences',
      subtitle: 'These are my past work experiences and projects I have worked on.',
      items: [
        {
          date: 'Apr 2023',
          company: 'AuraMC Network',
          role: 'Core Developer',
          tech: ['java', 'kotlin', 'spigot', 'paper', 'velocity', 'postgres', 'redis', 'mongo', 'linux'],
          desc: "Development and maintenance of the game core for one of the most active Italian networks. I work on custom plugins, distributed network systems, anti-exploit security and low-level optimizations. I collaborate with the technical team to ensure performance and scalability for thousands of concurrent players.",
          tags: [
            'Game core development and custom plugins',
            'Distributed systems and proxy architecture',
            'Security, anti-cheat and exploit prevention',
            'TPS optimization and lag-free performance',
            'Redis, PostgreSQL and MongoDB databases',
            'Coordination with the technical team',
          ],
        },
        {
          date: 'Sep 2021',
          company: 'Digital Developer',
          role: 'Freelance · Web & Social Media',
          tech: ['react', 'nextjs', 'typescript', 'tailwind', 'node', 'html', 'css', 'figma', 'seo', 'social'],
          desc: "Full-stack digital development for local businesses. I build modern websites and custom dashboards: restaurant reservation systems, menu and order management, dedicated client areas. I also handle social media management and the entire online presence of clients, from content creation to SEO.",
          tags: [
            'Custom websites for restaurants and businesses',
            'Reservation dashboards and order management',
            'Digital menu management systems',
            'Social Media Management and content creation',
            'SEO, performance and accessibility',
            'Direct client relationship',
          ],
        },
        {
          date: 'Mar 2020',
          company: 'Personal Work',
          role: 'Open Source Plugins & Tooling',
          tech: ['java', 'kotlin', 'go', 'grpc', 'react', 'postgres', 'mysql'],
          desc: "Development of open-source plugins and tools for the Minecraft community: automated tournaments, queue systems, cross-platform microservices, optimized server forks. Passion projects that helped me grow as a developer.",
          tags: [
            'Open source Spigot and Paper plugins',
            'Queue and matchmaking systems',
            'Go microservices with gRPC',
            'React + WebAPI dashboards',
            'Contributions to community projects',
          ],
        },
        {
          date: 'Jan 2018',
          company: 'Self-taught',
          role: 'From curious to developer',
          tech: ['java', 'html', 'css', 'javascript'],
          desc: "I started by configuring Minecraft servers for friends, then moved on to writing my first plugins in Java. From there I jumped into more complex architectures, web development and distributed backends. All self-taught, one line of code at a time.",
          tags: [
            'Self-learning and continuous research',
            'First plugins in Java and Bukkit API',
            'Web development (HTML, CSS, JS)',
            'Problem solving and technical curiosity',
            'Open source and community contributions',
          ],
        },
      ] as ExperienceItem[],
    },
    projects: {
      kicker: 'Selected Work',
      title: 'Featured projects',
      subtitle: 'A selection of complex systems developed with a focus on technical precision.',
      moreSoon: 'More projects coming soon',
      moreSoonBody: "I'm constantly working on new projects. Stay tuned.",
      keyFeatures: 'Key features',
    },
    contact: {
      kicker: "Let's get in touch",
      title: 'Have a project in mind?',
      body: "From designing complex cores to building unique game mechanics. If your server or idea needs a technical step up, drop me a line.",
      cta: 'Contact me on Telegram',
    },
    footer: {
      built: 'Built with',
      by: 'by',
    },
    tech: {
      kicker: 'Tech Stack',
    },
  },
}

export type ExperienceItem = {
  date: string
  company: string
  role: string
  desc: string
  tech: string[]
  tags: string[]
}

export type Dict = typeof translations.it
