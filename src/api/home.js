export const getHomeInfo = async () => {
    return {
      hero: {
        title: "翁曉玲",
        subtitle: "為台灣的未來而努力",
        image: "/images/hero-image.webp"
      },
      about: {
        title: "關於我們",
        content: "翁曉玲立委致力於為民眾服務，推動進步政策，建設更美好的台灣。我們相信透過共同努力，能夠創造一個更加繁榮、公平且永續的社會。"
      },
      news: [
        {
          id: 1,
          date: '2024-07-01',
          title: '翁曉玲立委提出新的教育改革方案',
          summary: '為了提升台灣的教育品質，翁曉玲立委今日在立法院提出了全新的教育改革方案...'
        },
        {
          id: 2,
          date: '2024-06-28',
          title: '關注環境永續發展：翁曉玲立委參與淨灘活動',
          summary: '為了喚起民眾對海洋污染的重視，翁曉玲立委昨日參與了在新北市舉行的淨灘活動...'
        },
        {
          id: 3,
          date: '2024-06-25',
          title: '推動科技創新：翁曉玲立委訪問科學園區',
          summary: '為了促進台灣的科技發展，翁曉玲立委本週走訪了多家科學園區的企業...'
        }
      ],
      policies: [
        {
          id: 1,
          title: '綠色能源政策',
          description: '推動可再生能源發展，減少碳排放',
          image: '/images/green-energy.webp',
          color: 'from-emerald-400 to-teal-500'
        },
        {
          id: 2,
          title: '數位轉型計劃',
          description: '協助傳統產業進行數位化轉型',
          image: '/images/digital-transformation.webp',
          color: 'from-indigo-400 to-purple-500'
        }
      ]
    };
  };
  
  export const updateHomeInfo = async (homeInfo) => {
    return { message: 'Home information updated successfully', data: homeInfo };
  };
  
  export const uploadFile = async (file) => {
    return { url: URL.createObjectURL(file) };
  };
  