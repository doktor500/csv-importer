const post = async (url: string, request: RequestInit) => {
  const response = await fetch(url, { method: "POST", body: request.body });

  return response.ok ? response : Promise.reject(new Error(`HTTP error! status: ${response.status}`));
};

export const httpClient = { post };
