import sharp from 'sharp';

export const resizeImage = async (imagePath, width, height) => {
  try {
    const outputPath = `resized-${width}x${height}-${imagePath}`;
    await sharp(imagePath).resize(width, height).toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.error('Erro ao redimensionar imagem:', error);
    throw new Error('Erro ao processar imagem');
  }
};
