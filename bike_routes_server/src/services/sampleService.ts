
export const createSampleData = async (data: string) => {
    if (!data || data.length < 3) {
      throw new Error("Data must be at least 3 characters long");
    }
    
    return "Dummy data";
  };