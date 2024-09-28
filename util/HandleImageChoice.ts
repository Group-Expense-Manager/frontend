import * as ImageManipulator from 'expo-image-manipulator';
import { ImagePickerAsset } from 'expo-image-picker';

export async function handleImageChoice(
  imagePickerAsset: ImagePickerAsset,
  onFileTypeNotSupported: () => void,
  onSuccess: (mimeType?: string, base64?: string | null) => void,
) {
  const size = imagePickerAsset.fileSize;
  const mimeType = imagePickerAsset.mimeType;

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
  const allowedMaxSize = 1024 * 1024;

  if (!!mimeType && !allowedMimeTypes.includes(mimeType)) {
    onFileTypeNotSupported();
    return;
  }

  if (!!size && size > allowedMaxSize) {
    const resize =
      imagePickerAsset.height > imagePickerAsset.width ? { height: 1000 } : { width: 1000 };
    const resizedImage = await ImageManipulator.manipulateAsync(
      imagePickerAsset.uri,
      [{ resize }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true },
    );

    onSuccess('image/jpeg', resizedImage.base64);
  } else {
    onSuccess(mimeType, imagePickerAsset?.base64);
  }
}
