import { vi } from "vitest";

export const toastMock = () => ({ toast: vi.fn(), dismiss: vi.fn(), toasts: [] });
