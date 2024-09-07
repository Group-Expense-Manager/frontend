import { ImagePickerAsset } from 'expo-image-picker';

export function handleImageChoice(
  imagePickerAsset: ImagePickerAsset,
  onFileTypeNotSupported: () => void,
  onImageTooLarge: () => void,
  onSuccess: () => void,
) {
  const size = imagePickerAsset.fileSize;
  const mimeType = imagePickerAsset.mimeType;

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
  const allowedMaxSize = 5 * 1024 * 1024;

  switch (true) {
    case !!mimeType && !allowedMimeTypes.includes(mimeType): {
      onFileTypeNotSupported();
      break;
    }
    case !!size && size > allowedMaxSize: {
      onImageTooLarge();
      break;
    }
    default: {
      onSuccess();
      break;
    }
  }
}
