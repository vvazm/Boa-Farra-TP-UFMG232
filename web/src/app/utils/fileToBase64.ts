export async function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64Data = event.target.result.toString();
        resolve(base64Data);
      } else {
        reject(new Error('Erro ao ler o arquivo.'));
      }
    };

    reader.onerror = (event) => {
      reject(event.target?.error || new Error('Erro ao acessar o arquivo.'));
    };

    reader.readAsDataURL(file);
  });
}