const { v2: cloudinary } = require('cloudinary');

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

function isPlaceholder(val) {
  if (!val) return true;
  const s = String(val).toLowerCase();
  return s.includes('your-') || s.includes('placeholder') || s.includes('change-me');
}

const isCloudinaryConfigured = Boolean(
  CLOUD_NAME &&
    API_KEY &&
    API_SECRET &&
    !isPlaceholder(CLOUD_NAME) &&
    !isPlaceholder(API_KEY) &&
    !isPlaceholder(API_SECRET),
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });
}

function uploadImageBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'sevasathi/profile-photos',
        resource_type: 'image',
        transformation: [
          { width: 400, height: 400, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
        ...options,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload failed.'));
        }
        return resolve(result);
      },
    );

    stream.end(buffer);
  });
}

function destroyImage(publicId) {
  if (!publicId) return Promise.resolve();
  return cloudinary.uploader.destroy(publicId);
}

module.exports = {
  cloudinary,
  destroyImage,
  isCloudinaryConfigured,
  uploadImageBuffer,
};
