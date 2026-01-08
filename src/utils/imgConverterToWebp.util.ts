import sharp from "sharp";

export function imgConverterToWebp(file: Express.Multer.File) {
    const optimizedBuffer = sharp(file.buffer)
        .resize(1080)
        .webp({ quality: 80 })
        .toBuffer();

    return optimizedBuffer;
}