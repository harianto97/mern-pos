const rules = {
    nama_alamat: {
      required: { value: true, message: "Nama alamat tidak boleh kosong." },
      maxLength: {
        value: 100,
        message: "Panjang nama alamat maksimal 100 karakter",
      },
      minLength: { value: 5, message: "Panjang nama alamat minimal 5 karakter" },
    },
    provinsi: {
      required: { value: true, message: "Provinsi harus dipilih." },
    },
    kabupaten: {
      required: { value: true, message: "Kabupaten harus dipilih." },
    },
    kelurahan: {
      required: { value: true, message: "Keluarahan harus dipilih." },
    },
    detail_alamat: {
      required: { value: true, message: "Detail alamat harus diisi" },
      maxLength: {
        value: 500,
        message: "Panjang detail alamat maksimal 500 karakter",
      },
    },
  };
  
  export { rules };