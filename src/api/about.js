export const getAboutInfo = async () => {
    return {
      name: "翁曉玲",
      title: "為台灣的未來而努力的立法委員",
      image: "/images/hero-image.webp",
      biography: [
        "翁曉玲，出生於台北市，畢業於國立台灣大學法律系，後赴美國哈佛大學攻讀公共政策碩士。回國後，她投身公共事務，致力於推動教育改革、環境保護和社會正義。",
        "作為立法委員，翁曉玲一直秉持「為民服務、推動進步」的理念，積極參與立法工作，為台灣的永續發展貢獻自己的力量。"
      ],
      education: ['國立台灣大學法律系學士', '哈佛大學公共政策碩士'],
      expertise: ['教育政策', '環境法規', '社會福利'],
      volunteer: ['弱勢兒童教育', '環境保護志工', '社區營造'],
      philosophy: [
        '推動教育改革，確保每個孩子都有接受優質教育的機會',
        '制定和完善環境保護法規，推動台灣向綠色經濟轉型',
        '強化社會福利制度，照顧弱勢群體，縮小貧富差距',
        '促進科技創新，提升台灣的國際競爭力'
      ]
    };
  };
  
  export const updateAboutInfo = async (aboutInfo) => {
    return { message: 'About information updated successfully', data: aboutInfo };
  };
  
  export const uploadFile = async (file) => {
    return { url: URL.createObjectURL(file) };
  };
  