export interface NewsItem {
  id: string
  date: string
  category: string
  title: string
  summary: string
  url?: string
}

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Princípios", href: "#principios" },
  { label: "Sobre", href: "#sobre" },
  { label: "Propostas", href: "#propostas" },
  { label: "Baixar Plano", href: "#plano" },
  { label: "Notícias", href: "#noticias" },
  { label: "Candidatos", href: "#candidatos" },
  { label: "Participe", href: "#participe" },
]

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "1",
    date: "05 AGO 2026",
    category: "Campanha",
    title:
      "Prof. Winter Naves lança plano de governo com foco nos direitos do povo tocantinense",
    summary:
      "Candidato apresenta documento com mais de 100 propostas para transformar o Tocantins em um estado mais justo e igualitário.",
  },
  {
    id: "2",
    date: "02 AGO 2026",
    category: "Evento",
    title: "Grande ato público reúne apoiadores em Palmas",
    summary:
      "Manifestação marca o início oficial da campanha e reforça o compromisso com a democracia e a participação popular.",
  },
  {
    id: "3",
    date: "28 JUL 2026",
    category: "Proposta",
    title: "Professor Witer defende investimento histórico na educação pública",
    summary:
      "Candidato anuncia prioridade máxima para a educação pública estadual como pilar do Tocantins de Toda Nossa Gente.",
  },
]

export const PROPOSALS = [
  {
    icon: "🏥",
    area: "Saúde",
    text: "Ampliar o acesso à saúde pública com qualidade em todos os municípios do Tocantins.",
  },
  {
    icon: "📚",
    area: "Educação",
    text: "Investir em educação de qualidade, valorizando professores e escolas públicas.",
  },
  {
    icon: "💼",
    area: "Trabalho e Renda",
    text: "Gerar emprego e renda por meio do desenvolvimento sustentável e da economia solidária.",
  },
  {
    icon: "🌿",
    area: "Meio Ambiente",
    text: "Proteger o Cerrado e as águas do Tocantins com políticas ambientais efetivas.",
  },
  {
    icon: "🏘️",
    area: "Habitação",
    text: "Garantir moradia digna para as famílias tocantinenses com programas habitacionais.",
  },
  {
    icon: "🚌",
    area: "Mobilidade",
    text: "Melhorar a infraestrutura de transporte e mobilidade em todo o estado.",
  },
]

// Conteúdo dos princípios extraído do PDF
export const PRINCIPLES_DETAIL = [
  {
    id: "direito",
    color: "#8f238f",
    bg: "bg-gradient-to-br from-[#8f238f] to-[#5b1178]",
    icon: "🤝",
    title: "O DIREITO DA GENTE",
    tagline: "Garantir direitos é garantir dignidade.",
    intro:
      "O Direito da Gente representa o compromisso de garantir que todos os tocantinenses tenham acesso universal às condições essenciais da cidadania, independentemente do município onde vivem, de sua renda, raça, gênero, geração ou condição social.",
    desc: "Esse sistema integra políticas públicas destinadas à proteção social, promoção da igualdade e garantia dos direitos fundamentais.",
    areas: [
      {
        icon: "🏥",
        title: "Saúde",
        desc: "Política Estadual de Saúde com acesso universal e qualidade em todos os municípios. Saúde pública funcionando de verdade para toda a população tocantinense.",
      },
      {
        icon: "📚",
        title: "Educação",
        desc: "Política Estadual de Educação com valorização dos professores e fortalecimento das escolas públicas estaduais em todo o Tocantins.",
      },
      {
        icon: "🫂",
        title: "Assistência Social",
        desc: "Política Estadual de Assistência Social e Proteção Social, garantindo proteção e emancipação das pessoas mais vulneráveis.",
      },
      {
        icon: "🛡️",
        title: "Segurança",
        desc: "Política Estadual de Segurança Pública e Segurança Cidadã, com foco na prevenção e na garantia da ordem democrática.",
      },
      {
        icon: "⚖️",
        title: "Direitos Humanos",
        desc: "Política Estadual dos Direitos da Gente e da Justiça Cidadã, assegurando proteção e dignidade a todos.",
      },
      {
        icon: "♀",
        title: "Mulheres",
        desc: "Política Estadual da Mulher com igualdade de direitos, proteção contra violência e oportunidades para todas as mulheres tocantinenses.",
      },
      {
        icon: "✊",
        title: "Igualdade Racial",
        desc: "Política Estadual de Igualdade Racial, combatendo o racismo e promovendo uma sociedade mais justa e inclusiva.",
      },
      {
        icon: "🌿",
        title: "Povos Originários",
        desc: "Política Estadual dos Povos Originários, Quilombolas e Comunidades Tradicionais, respeitando culturas e garantindo direitos.",
      },
      {
        icon: "🎭",
        title: "Cultura e Juventude",
        desc: "Política Estadual da Cultura, Juventude e Economia Criativa, valorizando a identidade tocantinense e as novas gerações.",
      },
      {
        icon: "⚽",
        title: "Esporte",
        desc: "Política Estadual de Esporte e Juventude, criando oportunidades e qualidade de vida para toda a população.",
      },
    ],
  },
  {
    id: "bem-estar",
    color: "#6f1688",
    bg: "bg-gradient-to-br from-[#761b91] to-[#4c0b66]",
    icon: "🌱",
    title: "O BEM-ESTAR DA GENTE",
    tagline:
      "Desenvolvimento só faz sentido quando melhora a vida das pessoas.",
    intro:
      "O Bem-estar da Gente organiza o Sistema Estadual de Desenvolvimento Territorial. O desenvolvimento econômico do Tocantins precisa produzir qualidade de vida para o conjunto da população.",
    desc: "O desenvolvimento deixa de ser compreendido apenas pelo crescimento do PIB e passa a ser orientado pela melhoria das condições materiais de existência da população tocantinense.",
    areas: [
      {
        icon: "🌾",
        title: "Agricultura Familiar",
        desc: "Apoio à agricultura familiar, agroecologia e desenvolvimento rural, valorizando populações originárias, quilombolas e o campo tocantinense.",
      },
      {
        icon: "📈",
        title: "Desenvolvimento Econômico",
        desc: "Política de Desenvolvimento Econômico com indústria, comércio, ciência, tecnologia e inovação para gerar riqueza com distribuição.",
      },
      {
        icon: "💼",
        title: "Trabalho e Renda",
        desc: "Geração de emprego, renda e economia solidária para todos os tocantinenses, com apoio ao empreendedorismo local.",
      },
      {
        icon: "🏗️",
        title: "Infraestrutura",
        desc: "Agência Estadual de Infraestrutura e Mobilidade integrada ao território, conectando os 139 municípios do Tocantins.",
      },
      {
        icon: "🏘️",
        title: "Habitação e Cidades",
        desc: "Política de Cidades, Habitação, Mobilidade e Saneamento para garantir moradia digna e qualidade de vida urbana.",
      },
      {
        icon: "💧",
        title: "Saneamento e Águas",
        desc: "Instituto Tocantinense das Águas, Saneamento e Mudanças Climáticas, protegendo os recursos hídricos do estado.",
      },
      {
        icon: "🌳",
        title: "Meio Ambiente",
        desc: "Proteção do Cerrado, patrimônio natural e desenvolvimento territorial sustentável para preservar o futuro do Tocantins.",
      },
      {
        icon: "🗺️",
        title: "Turismo",
        desc: "Política de Turismo, Economia Criativa e Patrimônio Natural valorizando as riquezas culturais e naturais do estado.",
      },
      {
        icon: "🤝",
        title: "Economia Solidária",
        desc: "Instituto Estadual de Economia Solidária e Cooperativismo, apoiando cooperativas e empreendimentos coletivos.",
      },
      {
        icon: "🗾",
        title: "Desenvolvimento Regional",
        desc: "Agência Estadual de Desenvolvimento Regional promovendo equilíbrio territorial entre todas as regiões do Tocantins.",
      },
    ],
  },
  {
    id: "bem-querer",
    color: "#a52a91",
    bg: "bg-gradient-to-br from-[#a52a91] to-[#64126f]",
    icon: "💬",
    title: "O BEM-QUERER DA GENTE",
    tagline: "Governar é ouvir, dialogar e construir junto.",
    intro:
      "O Bem-querer da Gente organiza o Sistema Estadual de Governança Democrática. Seu objetivo é reconstruir a relação entre Estado, municípios e sociedade.",
    desc: "Governar deixa de significar apenas administrar recursos públicos e passa a representar a construção permanente de consensos democráticos, por meio do diálogo entre governo e sociedade.",
    areas: [
      {
        icon: "👥",
        title: "Participação Popular",
        desc: "Política Estadual de Participação Popular e Territorialização, fortalecendo conselhos, conferências e planejamento participativo.",
      },
      {
        icon: "🔍",
        title: "Transparência",
        desc: "Política Estadual de Transparência e Controle Social, garantindo o acesso à informação e o controle democrático dos atos públicos.",
      },
      {
        icon: "💻",
        title: "Governo Digital",
        desc: "Política Estadual de Governo Digital com modernização dos serviços públicos por meio da tecnologia e inovação.",
      },
      {
        icon: "📋",
        title: "Planejamento Participativo",
        desc: "Política de Planejamento, Gestão e Inovação Pública orientada pelas necessidades reais da população tocantinense.",
      },
      {
        icon: "📡",
        title: "Comunicação Pública",
        desc: "Política de Comunicação Pública e Participação Social com transparência e diálogo permanente com a sociedade.",
      },
      {
        icon: "🤝",
        title: "Cooperação Federativa",
        desc: "Política de Relações Institucionais e Cooperação Federativa fortalecendo a articulação entre Estado, municípios e União.",
      },
      {
        icon: "🏛️",
        title: "Gestão Pública",
        desc: "Instituto Tocantinense de Gestão Pública e Formação Permanente dos Servidores, valorizando quem serve ao povo.",
      },
    ],
  },
]
