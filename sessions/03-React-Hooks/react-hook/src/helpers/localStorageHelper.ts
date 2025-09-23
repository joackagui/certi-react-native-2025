
export const save = (KEY: string, value: string ) => {
    localStorage.setItem(KEY, value);
};

export const getItem = (KEY: string) => {
    return localStorage.getItem(KEY);
};
