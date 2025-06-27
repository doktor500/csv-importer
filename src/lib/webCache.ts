import { revalidatePath as nextRevalidatePath } from "next/cache";

export const webCache = {
  revalidatePath: (path: string) => nextRevalidatePath(path),
};
