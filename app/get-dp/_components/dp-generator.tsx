'use client'
import { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Edit2, Download } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from "next/image";
import DPPreview from "./dp-preview";

const DPGenerator = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("white");
  const [originalImage, setOriginalImage] = useState<string>("");
  const [showCropInterface, setShowCropInterface] = useState(false);
  const [cropPreview, setCropPreview] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  });
  const imgRef = useRef<HTMLImageElement>(null);

  const generateCropPreview = useCallback(async () => {
    if (!imgRef.current || !crop.width || !crop.height) return;

    try {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
      setCropPreview(croppedImageUrl);
    } catch (error) {
      console.error('Error generating crop preview:', error);
    }
  }, [crop]);

  useEffect(() => {
    if (imgRef.current && crop.width && crop.height && showCropInterface) {
      generateCropPreview();
    }
  }, [crop, showCropInterface, generateCropPreview]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        setOriginalImage(imageUrl);
        
        const img = new window.Image();
        img.onload = async () => {
          try {
            const defaultCrop = {
              unit: '%' as const,
              width: 80,
              height: 80,
              x: 10,
              y: 10,
            };
            const croppedImageUrl = await getCroppedImg(img, defaultCrop);
            setPhoto(croppedImageUrl);
          } catch (error) {
            console.error('Error auto-cropping image:', error);
          }
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return Promise.reject('No 2d context');

    const pixelCrop = {
      x: (crop.x / 100) * image.naturalWidth,
      y: (crop.y / 100) * image.naturalHeight,
      width: (crop.width / 100) * image.naturalWidth,
      height: (crop.height / 100) * image.naturalHeight,
    };

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleSaveCrop = async () => {
    if (imgRef.current && crop.width && crop.height) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
        setPhoto(croppedImageUrl);
        setShowCropInterface(false);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  const handleEditImage = () => {
    if (originalImage) {
      setShowCropInterface(true);
    }
  };

  const handleCancelCrop = () => {
    setShowCropInterface(false);
    if (!photo) {
      setOriginalImage("");
    }
  };

  const downloadDP = async () => {
    const previewElement = document.querySelector('.dp-preview') as HTMLElement;
    
    if (!previewElement) {
      console.error('Preview element not found');
      return;
    }

    try {
      const { default: html2canvas } = await import('html2canvas-pro');
      
      // Wait for images to load
      const images = previewElement.querySelectorAll('img');
      await Promise.all(Array.from(images).map((img, index) => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(img);
          } else {
            img.onload = () => {
              resolve(img);
            };
            img.onerror = (e) => {
              console.error(`Image ${index + 1} failed to load:`, e);
              resolve(img);
            };
          }
        });
      }));
      
      const rect = previewElement.getBoundingClientRect();
      
      const canvas = await html2canvas(previewElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scale: 2,
        width: rect.width,
        height: rect.height,
        scrollX: 0,
        scrollY: 0,
        logging: true,
        imageTimeout: 30000,
        removeContainer: false,
        foreignObjectRendering: false,
        ignoreElements: () => false
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `BuildWithAI-DP-${name || 'User'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png', 0.95);
    } catch (error) {
      console.error('Error downloading DP:', error);
      try {
        await fallbackDownload();
      } catch (fallbackError) {
        console.error('Fallback method also failed:', fallbackError);
        alert('Download failed. Please try again or check your internet connection.');
      }
    }
  };

  // Fallback download method using canvas drawing
  const fallbackDownload = async () => { 
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    canvas.width = 800;
    canvas.height = 800;

    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 800);

    try {
      // Load and draw template image
      const templateImg = new window.Image();
      templateImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        templateImg.onload = resolve;
        templateImg.onerror = reject;
        templateImg.src = '/template.jpg';
      });
      
      ctx.drawImage(templateImg, 0, 0, 800, 800);

      // Get border color for the selected color
      const getBorderColor = (selectedColor: string) => {
        switch (selectedColor) {
          case 'white':
            return '#ffffff';
          case 'black':
            return '#000000';
          default:
            return '#ffffff';
        }
      };

      const borderColor = getBorderColor(selectedColor);

      // Draw user photo if available
      if (photo) {
        const userImg = new window.Image();
        userImg.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          userImg.onload = resolve;
          userImg.onerror = reject;
          userImg.src = photo;
        });

        // Draw circular user photo
        const photoSize = 224; // 112 * 2 for high res
        const photoX = 400 - photoSize / 2; // Center X
        const photoY = 240 - photoSize / 2; // 30% from top

        ctx.save();
        ctx.beginPath();
        ctx.arc(400, 240, photoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(userImg, photoX, photoY, photoSize, photoSize);
        ctx.restore();

        // Draw border around photo with selected color
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(400, 240, photoSize / 2 + 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw user name if available
      if (name) {
        ctx.fillStyle = '#ccf6c6'; // Match the preview background color
        ctx.strokeStyle = borderColor; // Use selected border color
        ctx.lineWidth = 2;
        
        // Measure text
        ctx.font = 'bold 32px Arial, sans-serif';
        const textMetrics = ctx.measureText(name);
        const textWidth = textMetrics.width;
        const textHeight = 32;
        
        const rectX = 400 - (textWidth + 32) / 2;
        const rectY = 600 - 20;
        const rectWidth = textWidth + 32;
        const rectHeight = textHeight + 16;
        
        // Draw background rectangle
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
        
        // Draw text
        ctx.fillStyle = '#1f2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, 400, rectY + rectHeight / 2);
      }

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob in fallback method');
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `BuildWithAI-DP-${name || 'User'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png', 0.95);

    } catch (error) {
      console.error('Error in fallback download:', error);
      throw error;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const imageUrl = e.target?.result as string;
          setOriginalImage(imageUrl);
          
          const img = new window.Image();
          img.onload = async () => {
            try {
              const defaultCrop = {
                unit: '%' as const,
                width: 80,
                height: 80,
                x: 10,
                y: 10,
              };
              const croppedImageUrl = await getCroppedImg(img, defaultCrop);
              setPhoto(croppedImageUrl);
            } catch (error) {
              console.error('Error auto-cropping image:', error);
            }
          };
          img.src = imageUrl;
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const isReadyToDownload = name.trim() !== "" && photo !== "";

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 space-y-4 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-gray-900">
            Customize Your DevFest DP
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Create your personalized DevFest Minna 2025 profile picture and spread the word you'll be attending!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-8">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name or nickname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Photo</Label>
              {!originalImage ? (
                <div 
                  className={`p-8 transition-colors border-2 border-dashed rounded-lg cursor-pointer ${
                    isDragOver 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
                  }`}
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 mx-auto text-gray-400">
                      <Upload className="w-full h-full" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Drag and drop to upload or click to browse
                      </p>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              ) : showCropInterface ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg border-gray-200">
                    <div className="w-full">
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        aspect={1}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          ref={imgRef}
                          src={originalImage}
                          alt="Crop preview"
                          className="object-contain w-full h-auto"
                        />
                      </ReactCrop>
                    </div>
                  </div>
                  
                  {cropPreview && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-900">Preview</Label>
                      <div className="p-4 border rounded-lg border-gray-200 bg-gray-50">
                        <div className="flex justify-center">
                          <div className="w-32 h-32 overflow-hidden border-2 border-blue-500 relative">
                            <Image
                              src={cropPreview}
                              alt="Cropped preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-center text-gray-500">
                          This is how your cropped image will look
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancelCrop} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleSaveCrop} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white">
                      Save Cropped Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative h-48 overflow-hidden border rounded-lg border-gray-200">
                    {photo && (
                      <Image
                        src={photo}
                        alt="Uploaded"
                        fill
                        className="object-contain"
                      />
                    )}
                    {photo && (
                      <button
                        onClick={handleEditImage}
                        className="absolute p-2 text-white transition-colors rounded-full top-2 right-2 bg-black/50 hover:bg-black/70 z-10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                    className="w-full"
                  >
                    Change Photo
                  </Button>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Download Button */}
            {isReadyToDownload && (
              <Button 
                onClick={downloadDP}
                variant="outline" 
                className="flex items-center w-full gap-2 py-6 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              >
                <Download className="w-5 h-5" />
                Download DP
              </Button>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <DPPreview name={name} photo={photo} color={selectedColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DPGenerator;