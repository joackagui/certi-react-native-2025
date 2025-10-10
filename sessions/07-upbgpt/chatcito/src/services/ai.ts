import axios from "axios";

export const getGeminiMessage = async (message: string) => {
    const response = await
        axios.post('http://localhost:3000/api/gemini/basic-prompt', { 'prompt': message });
    return response.data;
}