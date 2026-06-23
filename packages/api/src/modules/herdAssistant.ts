import axios, { type AxiosInstance } from "axios";
import { API_CONFIG } from "../config";
import { getAccessToken, hydrateTokenFromSession } from "../tokenStore";

export type HerdAssistantChatRequest = {
  message: string;
  conversation_id?: string;
  animal_uid?: string;
  chip_uid?: string;
  user_id?: string;
};

export type HerdAssistantChatResponse = {
  conversation_id: string;
  reply: string;
  herd_active_animal_uid?: string | null;
  herd_active_chip_uid?: string | null;
};

let fieldVetClient: AxiosInstance | null = null;

function getFieldVetClient(): AxiosInstance {
  if (!fieldVetClient) {
    hydrateTokenFromSession();
    fieldVetClient = axios.create({
      baseURL: API_CONFIG.fieldVetUrl.replace(/\/$/, ""),
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    fieldVetClient.interceptors.request.use((config) => {
      const token = getAccessToken();
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
  return fieldVetClient;
}

export async function postHerdAssistantChat(
  body: HerdAssistantChatRequest,
): Promise<HerdAssistantChatResponse> {
  const { data } = await getFieldVetClient().post<HerdAssistantChatResponse>(
    "/herd-assistant/chat",
    body,
  );
  return data;
}
