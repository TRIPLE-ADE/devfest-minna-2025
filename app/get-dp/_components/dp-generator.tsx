"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  Edit2,
  Download,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";
import DPPreview from "./dp-preview";
import { uploadDPImage, saveDPRecord, type DPRecord } from "@/lib/appwrite";

const DPGenerator = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [originalImage, setOriginalImage] = useState<string>("");
  const [showCropInterface, setShowCropInterface] = useState(false);
  const [cropPreview, setCropPreview] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState<Blob | null>(
    null,
  );
  const [copySuccess, setCopySuccess] = useState(false);
  const [uploadedDPUrl, setUploadedDPUrl] = useState<string>("");
  const [dpRecord, setDpRecord] = useState<DPRecord | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dpGenerated, setDpGenerated] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
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
      console.error("Error generating crop preview:", error);
    }
  }, [crop]);

  useEffect(() => {
    if (imgRef.current && crop.width && crop.height && showCropInterface) {
      generateCropPreview();
    }
  }, [crop, showCropInterface, generateCropPreview]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
              unit: "%" as const,
              width: 80,
              height: 80,
              x: 10,
              y: 10,
            };
            const croppedImageUrl = await getCroppedImg(img, defaultCrop);
            setPhoto(croppedImageUrl);
          } catch (error) {
            console.error("Error auto-cropping image:", error);
          }
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: Crop,
  ): Promise<string> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return Promise.reject("No 2d context");

    const pixelCrop = {
      x: (crop.x / 100) * image.naturalWidth,
      y: (crop.y / 100) * image.naturalHeight,
      width: (crop.width / 100) * image.naturalWidth,
      height: (crop.height / 100) * image.naturalHeight,
    };

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        0.95,
      );
    });
  };

  const handleSaveCrop = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imgRef.current && crop.width && crop.height) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
        setPhoto(croppedImageUrl);
        setShowCropInterface(false);

        // Smooth scroll to keep the photo area in view after transition
        setTimeout(() => {
          const photoSection = document.querySelector("[data-photo-section]");
          if (photoSection) {
            photoSection.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 50);
      } catch (error) {
        console.error("Error cropping image:", error);
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
    const previewElement = document.querySelector(".dp-preview") as HTMLElement;

    if (!previewElement) {
      console.error("Preview element not found");
      return;
    }

    try {
      const { default: html2canvas } = await import("html2canvas-pro");

      // Wait for images to load
      const images = previewElement.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img, index) => {
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
        }),
      );

      const rect = previewElement.getBoundingClientRect();

      const canvas = await html2canvas(previewElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        scale: 2,
        width: rect.width,
        height: rect.height,
        scrollX: 0,
        scrollY: 0,
        logging: true,
        imageTimeout: 30000,
        removeContainer: false,
        foreignObjectRendering: false,
        ignoreElements: () => false,
      });

      // Convert canvas to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Failed to create blob");
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `BuildWithAI-DP-${name || "User"}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        },
        "image/png",
        0.95,
      );
    } catch (error) {
      console.error("Error downloading DP:", error);
      try {
        await fallbackDownload();
      } catch (fallbackError) {
        console.error("Fallback method also failed:", fallbackError);
        alert(
          "Download failed. Please try again or check your internet connection.",
        );
      }
    }
  };

  // Generate image blob for sharing
  const generateImageBlob = async (): Promise<Blob | null> => {
    const previewElement = document.querySelector(".dp-preview") as HTMLElement;

    if (!previewElement) {
      console.error("Preview element not found");
      return null;
    }

    try {
      const { default: html2canvas } = await import("html2canvas-pro");

      // Wait for images to load
      const images = previewElement.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img, index) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve(img);
            } else {
              img.onload = () => resolve(img);
              img.onerror = (e) => {
                console.error(`Image ${index + 1} failed to load:`, e);
                resolve(img);
              };
            }
          });
        }),
      );

      const rect = previewElement.getBoundingClientRect();

      const canvas = await html2canvas(previewElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        scale: 2,
        width: rect.width,
        height: rect.height,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        imageTimeout: 30000,
        removeContainer: false,
        foreignObjectRendering: false,
        ignoreElements: () => false,
      });

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/png",
          0.95,
        );
      });
    } catch (error) {
      console.error("Error generating image blob:", error);
      return null;
    }
  };

  // Generate DP and save to Appwrite
  const handleGenerateDP = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateImageBlob();
      if (!blob) {
        alert("Failed to generate DP. Please try again.");
        return;
      }

      setGeneratedImageBlob(blob);

      // Try to upload to Appwrite (optional - don't block if it fails)
      try {
        const fileName = `devfest-dp-${name || "user"}-${Date.now()}.png`;
        const imageUrl = await uploadDPImage(blob, fileName);

        // Save record to database
        const dpData: Omit<DPRecord, "id"> = {
          name: name || "Anonymous",
          imageId: fileName,
          imageUrl: imageUrl,
        };

        const savedRecord = await saveDPRecord(dpData);
        setDpRecord(savedRecord);
        setUploadedDPUrl(imageUrl);
        console.log("DP successfully saved to cloud!");
      } catch (cloudError) {
        console.warn(
          "Failed to save DP to cloud, but local download is still available:",
          cloudError,
        );
        // Still allow download even if cloud save fails
        setDpRecord(null);
        setUploadedDPUrl("");
      }

      // Only set dpGenerated to true after cloud save attempt is complete
      setDpGenerated(true);
    } catch (error) {
      console.error("Error generating DP:", error);
      alert("Failed to generate DP. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Share functionality (only works if DP was saved to cloud)
  const handleShare = async () => {
    if (!dpGenerated) {
      alert("Please generate your DP first!");
      return;
    }
    if (!dpRecord) {
      alert(
        "Cloud sharing is unavailable. Please download your DP and share it manually.",
      );
      return;
    }
    setShowShareModal(true);
  };

  const shareToTwitter = () => {
    if (!dpRecord) {
      console.error("No DP record available for sharing");
      return;
    }
    const text = `🎉 Just created my DevFest Minna 2025 profile picture! 

Ready to attend this amazing tech event on November 8th at Rasheedat Restaurant, Minna. 

Join the tech community! 🚀

#DevFestMinna2025 #BuildWithAI #GDGMinna #TechEvent

View my DP:`;

    const dpPageUrl = `${window.location.protocol}//${window.location.host}/dp/${dpRecord.id}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(dpPageUrl)}`;
    window.open(url, "_blank");
  };

  const shareToFacebook = () => {
    if (!dpRecord) {
      console.error("No DP record available for sharing");
      return;
    }
    const dpPageUrl = `${window.location.protocol}//${window.location.host}/dp/${dpRecord.id}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      dpPageUrl,
    )}`;
    window.open(url, "_blank");
  };

  const shareToLinkedIn = () => {
    if (!dpRecord) {
      console.error("No DP record available for sharing");
      return;
    }
    const dpPageUrl = `${window.location.protocol}//${window.location.host}/dp/${dpRecord.id}`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      dpPageUrl,
    )}`;
    window.open(url, "_blank");
  };

  const copyLink = async () => {
    if (!dpRecord) {
      console.error("No DP record available for sharing");
      return;
    }
    try {
      const shareUrl = `${window.location.protocol}//${window.location.host}/dp/${dpRecord.id}`;
      const eventInfo = `Check out my DevFest Minna 2025 profile picture! 

DevFest Minna 2025 - November 8th at Rasheedat Restaurant, Minna
Free tech conference with expert speakers and workshops

View my DP: ${shareUrl}
Create yours: ${window.location.protocol}//${window.location.host}/get-dp`;

      await navigator.clipboard.writeText(eventInfo);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareViaWebAPI = async () => {
    if (navigator.share && generatedImageBlob) {
      try {
        const file = new File(
          [generatedImageBlob],
          `DevFest-Minna-2025-DP-${name || "User"}.png`,
          {
            type: "image/png",
          },
        );

        await navigator.share({
          title: "My DevFest Minna 2025 Profile Picture",
          text: `Check out my DevFest Minna 2025 profile picture! Join me at this amazing tech event on November 8th at Rasheedat Restaurant, Minna. #DevFestMinna2025 #BuildWithAI`,
          files: [file],
        });
        setShowShareModal(false);
      } catch (error) {
        console.error("Error sharing via Web Share API:", error);
      }
    }
  };

  // Fallback download method using canvas drawing
  const fallbackDownload = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context not available");
    }

    canvas.width = 800;
    canvas.height = 800;

    // Set white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 800, 800);

    try {
      // Load and draw template image
      const templateImg = new window.Image();
      templateImg.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        templateImg.onload = resolve;
        templateImg.onerror = reject;
        templateImg.src = "/template.jpg";
      });

      ctx.drawImage(templateImg, 0, 0, 800, 800);

      // Draw user photo if available
      if (photo) {
        const userImg = new window.Image();
        userImg.crossOrigin = "anonymous";

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
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(400, 240, photoSize / 2 + 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw user name if available
      if (name) {
        ctx.fillStyle = "#ccf6c6"; // Match the preview background color
        ctx.strokeStyle = "#ffffff"; // Use selected border color
        ctx.lineWidth = 2;

        // Measure text
        ctx.font = "bold 32px Arial, sans-serif";
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
        ctx.fillStyle = "#1f2937";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(name, 400, rectY + rectHeight / 2);
      }

      // Convert to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Failed to create blob in fallback method");
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `BuildWithAI-DP-${name || "User"}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        },
        "image/png",
        0.95,
      );
    } catch (error) {
      console.error("Error in fallback download:", error);
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
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const imageUrl = e.target?.result as string;
          setOriginalImage(imageUrl);

          const img = new window.Image();
          img.onload = async () => {
            try {
              const defaultCrop = {
                unit: "%" as const,
                width: 80,
                height: 80,
                x: 10,
                y: 10,
              };
              const croppedImageUrl = await getCroppedImg(img, defaultCrop);
              setPhoto(croppedImageUrl);
            } catch (error) {
              console.error("Error auto-cropping image:", error);
            }
          };
          img.src = imageUrl;
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const isReadyToGenerate = name.trim() !== "" && photo !== "";
  const isReadyForActions = dpGenerated && dpRecord;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 space-y-4 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-gray-900">
            Customize Your DevFest DP
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Create your personalized DevFest Minna 2025 profile picture and
            spread the word you'll be attending!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-8">
            {/* Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-900"
              >
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
            <div className="space-y-2" data-photo-section>
              <Label className="text-sm font-medium text-gray-900">Photo</Label>
              <div className="overflow-hidden transition-all duration-500 ease-in-out">
                {!originalImage ? (
                  <div
                    className={`p-8 transition-colors border-2 border-dashed rounded-lg cursor-pointer ${
                      isDragOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
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
                        <Label className="text-sm font-medium text-gray-900">
                          Preview
                        </Label>
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
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelCrop}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSaveCrop}
                        className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        Save Cropped Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative h-80 overflow-hidden border rounded-lg border-gray-200">
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
                      onClick={() =>
                        document.getElementById("photo-upload")?.click()
                      }
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
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Step 1: Generate DP Button */}
              {isReadyToGenerate && !dpGenerated && (
                <Button
                  onClick={handleGenerateDP}
                  disabled={isGenerating}
                  className="flex items-center w-full gap-2 py-6 bg-accent-orange hover:bg-accent-orange/90 text-greyscale-dark font-bold disabled:opacity-50"
                >
                  <Share2 className="w-5 h-5" />
                  {isGenerating ? "Generating DP..." : "Generate Your DP"}
                </Button>
              )}

              {/* Step 2: Success Message */}
              {dpGenerated && (
                <div
                  className={`${
                    dpRecord
                      ? "bg-green-50 border-green-200"
                      : "bg-blue-50 border-blue-200"
                  } border rounded-lg p-4 mb-3`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      dpRecord ? "text-green-800" : "text-blue-800"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">
                      DP Generated Successfully!
                    </span>
                  </div>
                  <p
                    className={`${
                      dpRecord ? "text-green-700" : "text-blue-700"
                    } text-sm mt-1`}
                  >
                    {dpRecord
                      ? "Your DevFest profile picture is ready to download and share."
                      : "Your DevFest profile picture is ready to download. (Cloud save unavailable)"}
                  </p>
                  {dpRecord && (
                    <a
                      href={`${window.location.origin}/dp/${dpRecord.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm mt-2"
                    >
                      View your DP page <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}

              {/* Step 3: Download and Share Buttons */}
              {dpGenerated && (
                <>
                  {/* Download is always available once DP is generated */}
                  <Button
                    onClick={downloadDP}
                    variant="outline"
                    className="flex items-center w-full gap-2 py-6 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    <Download className="w-5 h-5" />
                    Download DP
                  </Button>

                  {/* Share is only available if DP was saved to cloud */}
                  {dpRecord ? (
                    <Button
                      onClick={handleShare}
                      className="flex items-center w-full gap-2 py-6"
                    >
                      <Share2 className="w-5 h-5" />
                      Share Your DP
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="flex items-center w-full gap-2 py-6 cursor-not-allowed"
                      title="Cloud sharing unavailable - download and share manually"
                    >
                      <Share2 className="w-5 h-5" />
                      Cloud Sharing Unavailable
                    </Button>
                  )}
                </>
              )}

              {/* Step 4: Generate New DP Button */}
              {dpGenerated && (
                <Button
                  onClick={() => {
                    setDpGenerated(false);
                    setDpRecord(null);
                    setUploadedDPUrl("");
                    setGeneratedImageBlob(null);
                  }}
                  variant="outline"
                  className="flex items-center w-full gap-2 py-6 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  Generate New DP
                </Button>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <DPPreview name={name} photo={photo} color={"#ffffff"} />
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && dpRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-lg p-6 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Share Your DP
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Show uploaded DP preview */}
              <div className="mb-4 text-center">
                <div className="relative w-32 h-32 mx-auto mb-2">
                  <Image
                    src={uploadedDPUrl}
                    alt="Your DevFest DP"
                    fill
                    className="object-cover rounded-lg border-2 border-blue-500"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Your DP is live and ready to share!
                </p>
                <a
                  href={`${window.location.origin}/dp/${dpRecord.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  View your DP page <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-gray-600 mb-6 text-sm">
                Share your DevFest Minna 2025 profile picture and let everyone
                know you'll be attending!
              </p>

              {/* Web Share API Button (if supported) */}
              {typeof navigator !== "undefined" &&
                "share" in navigator &&
                generatedImageBlob && (
                  <Button
                    onClick={shareViaWebAPI}
                    className="w-full mb-4 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Image
                  </Button>
                )}

              {/* Social Media Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <Button
                  onClick={shareToTwitter}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto border-blue-400 text-blue-600 hover:bg-blue-50"
                >
                  <Twitter className="w-6 h-6 mb-1" />
                  <span className="text-xs">Twitter</span>
                </Button>

                <Button
                  onClick={shareToFacebook}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto border-blue-600 text-blue-800 hover:bg-blue-50"
                >
                  <Facebook className="w-6 h-6 mb-1" />
                  <span className="text-xs">Facebook</span>
                </Button>

                <Button
                  onClick={shareToLinkedIn}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto border-blue-700 text-blue-900 hover:bg-blue-50"
                >
                  <Linkedin className="w-6 h-6 mb-1" />
                  <span className="text-xs">LinkedIn</span>
                </Button>
              </div>

              {/* Copy Link Button */}
              <Button
                onClick={copyLink}
                variant="outline"
                className={`w-full ${
                  copySuccess
                    ? "border-green-500 text-green-600"
                    : "border-gray-300 text-gray-700"
                } hover:bg-gray-50`}
              >
                {copySuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Share Link
                  </>
                )}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Your DP is saved and can be shared with this unique link!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DPGenerator;
