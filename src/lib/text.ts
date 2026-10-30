// Utilitas teks yang dipakai bersama oleh Remotion dan scripts/ (Node).

export const splitWords = (text: string) => text.trim().split(/\s+/);

// Hash sederhana (djb2) untuk mendeteksi naskah yang berubah
export const hashText = (text: string) => {
  let h = 5381;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  }
  return h.toString(16);
};

// Perkiraan durasi bila VO belum dibuat: anak-anak bercerita ~2,3 kata/detik
export const estimateDuration = (text: string) =>
  Math.max(3, splitWords(text).length / 2.3);
