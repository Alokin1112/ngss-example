export const statisticsCall = async (path: string, value: unknown) => {
  return await fetch(`http://127.0.0.1:5000/save/${path}`, {
    method: 'POST',
    body: JSON.stringify({ value }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json() as Promise<{ line_count: number }>)
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));