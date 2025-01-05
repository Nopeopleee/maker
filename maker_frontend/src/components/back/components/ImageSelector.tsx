import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Helper from "@/lib/helper";

interface ImageSelectorProps {
  value: string;
  column: string;
  label?: string;
  onChange?: (key: string, value: string | number | boolean) => void;
}

const ImageSelector = ({
  value,
  column,
  label,
  onChange,
}: ImageSelectorProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(value || "");
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    setPreviewUrl(Helper.getFilePath(value));
  }, [value]);

  const handleOpenFileManager = () => {
    const fileManager = window.open(
      "/backend/file-browser?mode=select",
      "file-manager",
      "width=1200,height=800"
    );

    if (fileManager) {
      const handleMessage = (event: MessageEvent) => {
        console.log(event.data);
        if (
          event.origin === window.location.origin &&
          event.data.type === "file-browser"
        ) {
          setPreviewUrl(Helper.getFilePath(event.data.path));
          onChange?.(column, event.data.path);
          window.removeEventListener("message", handleMessage);
        }
      };

      window.addEventListener("message", handleMessage);
    }
  };

  const handlePreviewClick = () => {
    if (previewUrl) {
      setOpenPreview(true);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl("");
    onChange?.(column, "");
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          size="small"
          fullWidth
          label={label}
          value={previewUrl}
          placeholder="選擇圖片"
          slotProps={{
            input: {
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start" onClick={handleOpenFileManager}>
                    <Icon icon="mdi:folder-open" />
                  </IconButton>
                  {previewUrl && (
                    <IconButton edge="start" onClick={handleClear}>
                      <Icon icon="mdi:close" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="預覽"
                    slots={{
                      transition: Zoom,
                    }}
                  >
                    <Avatar
                      src={previewUrl}
                      alt="預覽圖片"
                      onClick={handlePreviewClick}
                      sx={{
                        width: 32,
                        height: 32,
                        cursor: previewUrl ? "pointer" : "default",
                        bgcolor: "grey.50",
                        border: 1,
                        borderColor: "grey.300",
                        transition: "all 0.2s ease-in-out",
                        my: -0.5,
                        "&:hover": {
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      {!previewUrl && (
                        <Icon
                          icon="mdi:image"
                          fontSize={20}
                          style={{
                            color: "rgb(0 0 0 / 38%)",
                          }}
                        />
                      )}
                    </Avatar>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={previewUrl}
            alt="預覽圖片"
            width={800}
            height={600}
            priority
            unoptimized
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageSelector;
