const Hashids = require("hashids");
const hashids = new Hashids(process.env.HASHIDS_SALT || "your-salt-string", 10); // Salt dan panjang hash minimum

// Fungsi untuk mengenkripsi ID numerik
const encodeId = (id) => {
  return hashids.encode(id);
};

// Fungsi untuk mendekripsi ID yang terenkripsi
const decodeId = (hash) => {
  const decoded = hashids.decode(hash);
  return decoded.length > 0 ? decoded[0] : null;
};

module.exports = { encodeId, decodeId };
