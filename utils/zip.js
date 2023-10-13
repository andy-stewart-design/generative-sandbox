import JSZip from "jszip";

export async function generateZip(arr) {
  const res = arr.map(async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return blob;
  });

  const imageData = await Promise.all(res);
  const zip = new JSZip();

  imageData.forEach((blob, index) => {
    zip.file(`${index}.png`, blob);
  });

  const zipFile = await zip.generateAsync({ type: "blob" });
  downloadFile(zipFile);
}

export function downloadFile(file) {
  const a = document.createElement("a");
  a.download = "frames.zip";
  const url = URL.createObjectURL(file);
  a.href = url;
  a.innerHTML = "Download";
  document.body.append(a);
}
