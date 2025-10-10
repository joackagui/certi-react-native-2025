import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const IMAGE_MIME_MAP: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  heic: 'image/heic',
  heif: 'image/heif',
  gif: 'image/gif',
};

const DEFAULT_IMAGE_EXTENSION = 'jpg';
const DEFAULT_IMAGE_MIME = IMAGE_MIME_MAP.jpg;

const getExtensionFromUri = (uri: string) => {
  const sanitized = uri.split('?')[0] ?? '';
  const segments = sanitized.split('.');
  if (segments.length < 2) {
    return undefined;
  }

  return segments.pop()?.toLowerCase();
};

const guessMimeFromExtension = (extension?: string) => {
  if (!extension) {
    return DEFAULT_IMAGE_MIME;
  }

  return IMAGE_MIME_MAP[extension] ?? DEFAULT_IMAGE_MIME;
};

const buildFileName = (uri: string, extension?: string) => {
  const sanitized = decodeURIComponent(uri.split('?')[0] ?? '');
  const lastSegment = sanitized.split('/').pop();

  if (lastSegment && /\.[a-z0-9]+$/i.test(lastSegment)) {
    return lastSegment;
  }

  const ext = extension ?? DEFAULT_IMAGE_EXTENSION;
  return `upload-${Date.now()}.${ext}`;
};

const uriToFilePart = (uri: string) => {
  const extension = getExtensionFromUri(uri);
  const name = buildFileName(uri, extension);
  const type = guessMimeFromExtension(extension);

  return {
    uri,
    name,
    type,
  } as any;
};

type ParsedChatResponse = {
  text: string;
  imageUrl?: string;
};

const sanitizeFiles = (files?: string[]) =>
  (files ?? []).filter((uri): uri is string => typeof uri === 'string' && uri.length > 0);

const parseChatResponse = (raw: string): ParsedChatResponse => {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { text: '' };
  }

  try {
    const payload = JSON.parse(trimmed) as Record<string, unknown>;
    const text = typeof payload?.text === 'string' ? payload.text : trimmed;
    const imageUrl =
      typeof payload?.imageUrl === 'string' && payload.imageUrl.length > 0
        ? payload.imageUrl
        : undefined;

    if (imageUrl || text !== trimmed) {
      return { text, imageUrl };
    }
  } catch {
    // Ignore JSON parse errors; fall back to raw text.
  }

  return { text: raw };
};

export type ChatCompletionResult = ParsedChatResponse & {
  raw: string;
};

export const sendChatPrompt = async ({
  chatId,
  prompt,
  files = [],
}: {
  chatId: string;
  prompt: string;
  files?: string[];
}): Promise<ChatCompletionResult> => {
  const form = new FormData();
  form.append('chatId', chatId);
  form.append('prompt', prompt);

  sanitizeFiles(files).forEach((uri) => {
    form.append('files', uriToFilePart(uri));
  });

  const response = await axios.post(`${API_BASE_URL}/gemini/chat-stream`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'text/plain',
    },
    responseType: 'text',
    transformResponse: (value) => value,
  });

  const raw = typeof response.data === 'string' ? response.data : String(response.data ?? '');
  const parsed = parseChatResponse(raw);

  return {
    raw,
    ...parsed,
  };
};

export type ImageGenerationResult = {
  imageUrl?: string;
  text: string;
  raw: string;
};

export const postImageGeneration = async (
  prompt: string,
  files: string[] = [],
): Promise<ImageGenerationResult> => {
  const form = new FormData();
  form.append('prompt', prompt || '');
  sanitizeFiles(files).forEach((uri) => {
    form.append('files', uriToFilePart(uri));
  });

  const response = await axios.post(`${API_BASE_URL}/gemini/image-generation`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const parsePayload = (payload: unknown) => {
    if (typeof payload === 'string') {
      try {
        return JSON.parse(payload) as Record<string, unknown>;
      } catch {
        return { text: payload };
      }
    }

    if (payload && typeof payload === 'object') {
      return payload as Record<string, unknown>;
    }

    return {};
  };

  const result = parsePayload(response.data);
  const imageUrl =
    typeof result.imageUrl === 'string' && result.imageUrl.length > 0 ? result.imageUrl : undefined;
  const text = typeof result.text === 'string' ? result.text : '';
  const raw =
    typeof response.data === 'string' ? response.data : JSON.stringify(response.data ?? {});

  return {
    imageUrl,
    text,
    raw,
  };
};
