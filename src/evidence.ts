// Fictional source passages, with the excerpts kept beside the claims that cite them.
export const evidence = {
  id: {
    criteria: ['Pemetaan singkapan', 'Pencatatan sampel', 'Keselamatan lapangan'],
    clear: [
      {claim: 'Membuat peta singkapan dari enam titik pengamatan.', source: 'CV · Pengalaman pemetaan', passage: 'Pada latihan pemetaan, saya mencatat enam singkapan, mengukur jurus dan kemiringan lapisan, lalu menggambarkan kontak pada peta lintasan.', rationale: 'Pengukuran orientasi dan peta kontak menunjukkan pengalaman pemetaan langsung.'},
      {claim: 'Menghubungkan identitas sampel dengan lokasi pengambilan.', source: 'Catatan lapangan · Daftar sampel', passage: 'Sampel S-03 diberi label di lokasi. Nomor sampel, koordinat, dan nomor foto dicatat pada baris yang sama di buku lapangan.', rationale: 'Tiga pengenal yang saling terkait memungkinkan penelusuran sampel.'},
      {claim: 'Mengikuti pengarahan keselamatan sebelum lintasan.', source: 'CV · Praktik keselamatan', passage: 'Sebelum lintasan saya mengikuti pengarahan keselamatan, menguji radio, dan menyepakati titik kumpul dengan ketua tim.', rationale: 'Ada contoh persiapan keselamatan, tetapi belum ada contoh memimpin pengarahan.'},
    ],
    gap: [
      {claim: 'Mencatat litologi di tiga titik pengamatan.', source: 'CV · Praktikum lapangan', passage: 'Saya mendeskripsikan litologi di tiga titik pengamatan dan menandainya pada peta dasar bersama kelompok praktikum.', rationale: 'Contoh mendukung pengamatan litologi, tetapi tidak menyebutkan pengukuran orientasi.'},
      {claim: 'Memberi label pada kantong sampel.', source: 'Jawaban lamaran · Pengelolaan sampel', passage: 'Setiap kantong saya beri nomor. Setelah kembali ke pos, saya menyalin nomor tersebut ke daftar sampel harian.', rationale: 'Nomor sampel terdokumentasi. Hubungan dengan koordinat belum dijelaskan.'},
      {claim: 'Praktik keselamatan lapangan belum dijelaskan.', source: 'Jawaban lamaran · Keselamatan', passage: 'Belum saya sertakan dalam contoh lamaran ini.', rationale: 'Jawaban tidak cukup untuk menilai praktik keselamatan. Asesor perlu meminta bukti tambahan.'},
    ],
  },
  en: {
    criteria: ['Outcrop mapping', 'Sample records', 'Field safety'],
    clear: [
      {claim: 'Mapped outcrops at six observation stations.', source: 'CV · Mapping experience', passage: 'During a mapping exercise I logged six outcrops, measured bedding strike and dip, and drew the contacts on a traverse map.', rationale: 'Orientation measurements and mapped contacts demonstrate direct mapping experience.'},
      {claim: 'Linked sample identifiers to collection locations.', source: 'Field notes · Sample register', passage: 'Sample S-03 was labelled on site. I recorded the sample number, coordinates, and photo number on the same line in the field book.', rationale: 'Three linked identifiers make the sample traceable.'},
      {claim: 'Attended a safety briefing before the traverse.', source: 'CV · Safety practice', passage: 'Before the traverse I attended the safety briefing, tested the radio, and agreed on a meeting point with the team lead.', rationale: 'The passage documents preparation but gives no example of leading a briefing.'},
    ],
    gap: [
      {claim: 'Logged lithology at three observation stations.', source: 'CV · Field practical', passage: 'I described lithology at three stations and marked them on a base map with my practical group.', rationale: 'The example documents lithology observations but omits orientation measurements.'},
      {claim: 'Labelled sample bags.', source: 'Application answer · Sample handling', passage: 'I numbered each bag. Back at base I copied the numbers into the daily sample list.', rationale: 'Sample numbers are documented. Their relationship to coordinates is unclear.'},
      {claim: 'Field safety practice is undocumented.', source: 'Application answer · Safety', passage: 'I have yet to include this in my sample Application.', rationale: 'The answer provides insufficient evidence of safety practice. The Assessor needs additional evidence.'},
    ],
  },
}
