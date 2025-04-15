
export const renderIcon = (extension: string) => {

  const extensionToLower = extension.toLowerCase();

  switch (extensionToLower) {
    case ".pdf":
      return "icons/pdf.png";
    case ".doc":
    case ".docx":
      return "icons/word.svg";
    case ".xls":
    case ".xlsx":
      return "icons/excel.svg";
    case ".ppt":
    case ".pptx":
      return "icons/powerpoint.svg";
    case ".jpg":
    case ".jpeg":
    case ".png":
    case ".gif":
    case ".svg":
    case ".webp":
    case ".bmp":
    case ".ico":
    case ".tiff":
    case ".tif":
      return "icons/image.png";
    case ".mp3":
    case ".wav":
      return "icons/audio.png";
    case ".mp4":
    case ".avi":
    case ".mov":
      return "icons/video.png";
    case ".zip":
    case ".rar":
      return "icons/archive.png";
    case ".txt":
      return "icons/txt.png";
    case ".html":
    case ".css":
    case ".js":
    case ".ts":
    case ".jsx":
    case ".tsx":
    case ".json":
    case ".php":
    case ".py":
    case ".java":
    case ".rb":
    case ".go":
    case ".c":
    case ".cpp":
    case ".cs":
    case ".sql":
    case ".sh":
    case ".bat":
    case ".ps1":
    case ".psm1":
    case ".psd1":
    case ".ps1xml":
    case ".psc1":
    case ".pssc":
    case ".msh":
    case ".msh1":
    case ".msh2":
    case ".mshxml":
    case ".msh1xml":
    case ".msh2xml":
    case ".scm":
    case ".scd":
    case ".xml":
    case ".xsd":
    case ".xsl":
    case ".xslt":
    case ".dtd":
    case ".xhtml":
    case ".rss":
    case ".atom":
    case ".scss":
    case ".less":
    case ".sass":
    case ".styl":
    case ".stylus":
    case ".md":
    case ".markdown":
    case ".rmd":
    case ".r":
      return "icons/code.png";
    case ".exe":
    case ".msi":
      return "icons/exe.png";
    default:
      return "icons/file.svg";
  }
};
