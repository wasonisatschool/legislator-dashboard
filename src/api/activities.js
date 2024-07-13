export const getActivities = async () => {
    return [
      {
        id: 1,
        title: "綠色能源政策說明會",
        date: "2024-07-15",
        time: "14:00 - 16:00",
        location: "台北市政府大禮堂",
        image: "/images/green-energy.webp",
        description: "在這場說明會中，翁曉玲立委將詳細介紹我們的綠色能源政策，包括如何推動可再生能源發展，減少碳排放，以及這項政策對台灣未來發展的重要性。",
        agenda: [
          "14:00 - 14:10 開幕致詞",
          "14:10 - 15:00 政策介紹",
          "15:00 - 15:30 問答環節",
          "15:30 - 16:00 茶敘交流"
        ]
      }
    ];
  };
  
  export const createActivity = async (activity) => {
    return { id: Math.random(), ...activity };
  };
  
  export const updateActivity = async (id, activity) => {
    return { id, ...activity };
  };
  
  export const deleteActivity = async (id) => {
    return { message: 'Activity deleted' };
  };
  
  export const uploadFile = async (file) => {
    return { url: URL.createObjectURL(file) };
  };
  