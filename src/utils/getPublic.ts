const { BASE_URL } = import.meta.env;

export const getPublic = (filePath: string) => BASE_URL + filePath;

export const getPublicImage = (filePath: string, imagesDirName = 'images') => {
  return getPublic(`${imagesDirName}/${filePath}`);
};

export const getPublicIcon = (filePath: string, iconsDirName = 'icons') => {
  return getPublic(`${iconsDirName}/${filePath}`);
};
