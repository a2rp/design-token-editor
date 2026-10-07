export const normalizeTokenName = (name) => {
    const cleanName = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return cleanName || "token";
};

export const getTokenVariable = (token) => {
    return "--" + token.group + "-" + normalizeTokenName(token.name);
};
