import React, { useState } from 'react';
import { CLOUDINARY_WIDGET_URL } from '../../Urls';
import { Camera, Upload, X } from 'lucide-react';

export default function CloudinaryImageUploader({ onImageUpload, currentImageUrl }) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');

  // Replace these with your Cloudinary credentials

  const CLOUDINARY_CLOUD_NAME = 'dunv12mwu';
  const CLOUDINARY_UPLOAD_PRESET = 'workin_profile_pics';

  const openCloudinaryWidget = () => {
    setUploading(true);

    // Create Cloudinary upload widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'camera', 'url'],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        croppingDefaultSelectionRatio: 1,
        croppingShowDimensions: true,
        singleUploadAutoClose: true,
        croppingCoordinatesMode: 'custom',
        croppingForce: true,
        showSkipCropButton: false,
        folder: 'profile_pictures',
        clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
        maxFileSize: 5000000, // 5MB
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        theme: 'minimal',
        styles: {
          palette: {
            window: '#1a1a1a',
            windowBorder: '#404040',
            tabIcon: '#ffffff',
            menuIcons: '#ffffff',
            textDark: '#000000',
            textLight: '#ffffff',
            link: '#0078FF',
            action: '#0078FF',
            inactiveTabIcon: '#808080',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#2a2a2a'
          }
        },
        showPoweredBy: false
      },
      (error, result) => {
        setUploading(false);
        
        if (error) {
          console.error('Upload error:', error);
          alert('Failed to upload image. Please try again.');
          return;
        }

        if (result.event === 'success') {
          const imageUrl = result.info.secure_url;
          setPreviewUrl(imageUrl);
          onImageUpload(imageUrl);
          widget.close();
        }
      }
    );

    widget.open();
  };

  const removeImage = () => {
    setPreviewUrl('');
    onImageUpload('');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Preview Area */}
      <div className="relative">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center">
            <Camera size={40} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={openCloudinaryWidget}
        disabled={uploading}
        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
      >
        <Upload size={18} />
        {uploading ? 'Uploading...' : previewUrl ? 'Change Photo' : 'Upload Photo'}
      </button>

      <p className="text-sm text-gray-400 text-center">
        Click to upload and crop your profile picture
      </p>

      {/* Load Cloudinary Widget Script */}
      <script src={CLOUDINARY_WIDGET_URL} type="text/javascript"></script>
    </div>
  );
}
