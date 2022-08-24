export const normalizeGoogleData = async (data: any) => {
  return {
    email: data.email,
    firstName: data.given_name,
    lastName: data.family_name,
    avatar: data.picture || null,
    authProvider: "GOOGLE",
  };
};

export const normalizeFacebookData = async (data: Record<string, any>) => {
  return {
    fullName: data.name,
    authProvider: String(data.graphDomain).toUpperCase(),
    email: data.email,
  };
};
