export const getTokenValue = (tokens, tokenId, fallback) => {
    const token = tokens.find((item) => item.id === tokenId);
    return token?.value || fallback;
};
