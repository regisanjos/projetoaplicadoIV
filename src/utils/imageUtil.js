const sharp = require('sharp');
const path = require('path');

const resizeImage = async (imagePath, width, height) => {
  try {
    const outputPath = path.join(
      path.dirname(imagePath),
      `resized-${width}x${height}-${path.basename(imagePath)}`
    );

    await sharp(imagePath).resize(width, height).toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.error('Erro ao redimensionar imagem:', error);
    throw new Error('Erro ao processar imagem');
  }
};

module.exports = { resizeImage };
