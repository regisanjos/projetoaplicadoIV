import sharp from 'sharp';

export const resizeimage = async (imagePath, width, height) =>{
    try{
    const outputPath = `resezed-${width}X${height}-${imagePath}`;
    await sharp(imagePath).resize(width, height).toFile(outputPath);
    return outputPath;
    }catch (erro){
        console.error('Erro ao redimencionar imagem:', erro);
        throw new Error('Erro ao pasar imagem');
    }
};

