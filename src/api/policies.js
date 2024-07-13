export const getPolicies = async () => {
    return [
      {
        id: 1,
        title: "綠色能源政策",
        description: "推動可再生能源發展，減少碳排放",
        image: "/images/green-energy.webp",
        content: "我們的綠色能源政策旨在加速台灣向可再生能源轉型，減少對化石燃料的依賴，從而降低碳排放，應對氣候變化。這項政策包括擴大太陽能和風能的應用，提高能源效率，以及鼓勵清潔能源技術的創新和應用。",
        objectives: [
          "到2030年，可再生能源占總發電量的30%",
          "減少碳排放，實現2050年碳中和目標",
          "創造綠色就業機會，促進經濟可持續發展"
        ],
        implementation: [
          "提供綠色能源補貼和稅收優惠",
          "投資可再生能源基礎設施建設",
          "支持綠色能源相關研究和技術創新",
          "推動能源效率標準和綠色建築規範"
        ],
        timeline: "2024-2030"
      }
    ];
  };
  
  export const createPolicy = async (policy) => {
    return { id: Math.random(), ...policy };
  };
  
  export const updatePolicy = async (id, policy) => {
    return { id, ...policy };
  };
  
  export const deletePolicy = async (id) => {
    return { message: 'Policy deleted' };
  };
  
  export const uploadFile = async (file) => {
    return { url: URL.createObjectURL(file) };
  };
  