import { readFileSync, writeFileSync } from "fs";


export class FileCache<T> {

    public Set(cacheKey: string, value: T): { success: boolean; } {
        try {
            const file = JSON.stringify(value);
            writeFileSync(`cache/${cacheKey}`, file, { encoding: 'utf-8' });
            return { success: true };
        } catch {
            return { success: false };
        }
    }

    public TryGet(cacheKey: string): { success: boolean; value?: T; } {
        try {
            const file = readFileSync(`cache/${cacheKey}`, { encoding: 'utf-8' });
            const value = JSON.parse(file);
            return { success: true, value };
        } catch {
            return { success: false };
        }
    }
}
