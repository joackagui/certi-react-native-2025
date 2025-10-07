import axios from "axios";

export const getGeminiMessage = async (message: string) => {
    const response = await
        axios.post('https://foreignly-unhealable-april.ngrok-free.dev/api/gemini/basic-prompt', { 'prompt': message });
    return response.data;
}