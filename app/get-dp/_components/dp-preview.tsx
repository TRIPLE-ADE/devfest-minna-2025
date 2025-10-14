import { cn } from "@/lib/utils";

interface DPPreviewProps {
  name?: string;
  photo?: string;
  color?: string;
  photoPosition?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
  namePosition?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
}

const DPPreview = ({
  name = "",
  photo,
  photoPosition = {
    top: "45%",
    left: "25.5%",
    transform: "translate(-50%, -50%)",
  },
  namePosition = { top: "40%", left: "68%", transform: "translateX(-50%)" },
}: DPPreviewProps) => {
  return (
    <div className="w-full max-w-md mx-auto dp-preview font-sans">
      <div className="relative overflow-hidden aspect-square">
        {/* Template background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/dp.webp"
          alt="Devfest Minna 2025 Template"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="absolute inset-0">
          {/* User photo - positioned based on props */}
          <div
            className="absolute z-10"
            style={{
              top: photoPosition.top,
              bottom: photoPosition.bottom,
              left: photoPosition.left,
              right: photoPosition.right,
              transform: photoPosition.transform,
            }}
          >
            <div
              className="size-28 sm:size-40 mx-auto overflow-hidden rounded-2xl"
              style={{
                // border: `1.4px solid black`,
                backgroundColor: "#e5e7eb",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={name}
                  className="object-cover w-full h-full"
                  crossOrigin="anonymous"
                  onLoad={() => console.log("Image loaded successfully")}
                  onError={(e) => console.error("Image failed to load:", e)}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <span className="text-sm text-gray-400">Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* User name - positioned based on props */}
          <div
            className="absolute z-10"
            style={{
              top: namePosition.top,
              bottom: namePosition.bottom,
              left: namePosition.left,
              right: namePosition.right,
              transform: namePosition.transform,
            }}
          >
            <div
              className="py-1.5 rounded-4xl flex h-8 "
              // style={{
              //   backgroundColor: '#ccf6c6',
              //   border: `1.4px solid black`,
              //   boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              // }}
            >
              <p
                className={cn(
                  "sm:text-2xl text-xl text-wrap leading-none font-semibold text-left",
                  name ? "text-gray-800" : "text-gray-400",
                )}
              >
                {name ? name : "Name"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DPPreview;
