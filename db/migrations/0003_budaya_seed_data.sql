-- Seed data for budaya section
-- This file populates the database with initial cultural content

-- First, we need to get the kabupaten IDs for reference
-- We'll use CTEs to make the inserts cleaner

-- ==============================
-- SEED DATA: Budaya Items
-- ==============================

-- Helper: Get kabupaten IDs
with kab as (
  select id, slug from kabupatens
),
cat as (
  select id, slug from budaya_categories
)

-- Insert items for Kota Padang
insert into budaya_items (
  name, slug, kabupaten_id, category_id, type, description, long_description,
  image_url, rating, reviews_count, tags, status, featured
)
select 
  'Pantai Air Manis', 'pantai-air-manis', 
  (select id from kab where slug = 'padang'),
  (select id from cat where slug = 'pantai'),
  'objek',
  'Pantai indah dengan legenda batu Malin Kundang, menawarkan sunset spektakuler.',
  'Pantai Air Manis merupakan salah satu destinasi wisata favorit di Kota Padang. Terletak sekitar 10 km dari pusat kota, pantai ini menawarkan pemandangan sunset yang menakjubkan. Legenda Malin Kundang yang terkenal menjadi daya tarik tersendiri, dengan patung batu yang konon merupakan wujud dari Malin Kundang yang dikutuk ibunya. Pengunjung dapat menikmati suasana pantai yang tenang, bermain pasir, atau menyewa perahu untuk berkeliling. Tersedia warung makan yang menjual makanan laut segar dan hidangan khas Padang.',
  'https://asset.kompas.com/crops/OFi4brLn8Ieda4bRXTxsK8SZnf8%3D/0x17%3A1361x924/1200x800/data/photo/2024/10/22/6717ad6aa9584.jpg',
  4.8, 1420,
  array['Pantai', 'Sunset', 'Legenda'],
  'published', true
union all
select 
  'Masjid Raya Sumbar', 'masjid-raya-sumbar',
  (select id from kab where slug = 'padang'),
  (select id from cat where slug = 'religi'),
  'objek',
  'Masjid megah dengan arsitektur modern dan tradisional, landmark ikonik Kota Padang.',
  'Masjid Raya Sumatera Barat adalah masjid terbesar di provinsi ini dengan arsitektur yang memadukan elemen tradisional Minangkabau dan modern. Dibangun pada tahun 2007, masjid ini menjadi landmark ikonik Kota Padang. Kubah utama berdiameter 32 meter dan dapat menampung hingga 20.000 jamaah. Interior masjid dihiasi kaligrafi indah dan ornamen khas Minangkabau. Halaman masjid yang luas sering digunakan untuk kegiatan keagamaan dan sosial. Pengunjung non-muslim diperbolehkan masuk dengan berpakaian sopan.',
  'https://upload.wikimedia.org/wikipedia/en/b/b1/Masjid_Raya_Sumbar_3_MTQN_2020.jpg',
  4.9, 1680,
  array['Religi', 'Arsitektur', 'Landmark'],
  'published', true
union all
select 
  'Rumah Makan Sederhana', 'rm-sederhana-padang',
  (select id from kab where slug = 'padang'),
  (select id from cat where slug = 'kuliner'),
  'kuliner',
  'Restoran legendaris yang menyajikan masakan Padang autentik dengan cita rasa khas.',
  'Rumah Makan Sederhana adalah salah satu restoran Padang tertua dan paling terkenal di Indonesia. Berdiri sejak tahun 1974, restoran ini telah menjadi ikon kuliner Sumatera Barat. Menyajikan hidangan khas Padang dengan resep turun-temurun, seperti rendang, gulai, ayam pop, dan berbagai lauk lainnya. Sistem penyajian khas Padang dengan menempatkan semua hidangan di atas meja membuat pengalaman makan menjadi unik. Cabang-cabang RM Sederhana tersebar di berbagai kota di Indonesia dan mancanegara.',
  'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/30/3047303522.jpg',
  4.7, 3000,
  array['Kuliner', 'Rendang', 'Halal'],
  'published', true
union all
select 
  'Tradisi Tabuik', 'tradisi-tabuik-padang',
  (select id from kab where slug = 'padang'),
  (select id from cat where slug = 'budaya'),
  'tradisi',
  'Perayaan budaya tahunan dengan prosesi khas Minangkabau.',
  'Tradisi Tabuik adalah upacara adat yang diselenggarakan setiap bulan Muharram untuk memperingati gugurnya Hasan dan Husein, cucu Nabi Muhammad SAW. Tradisi yang telah berlangsung ratusan tahun ini menampilkan prosesi arak-arakan Tabuik (replika makam) yang megah dan penuh warna. Ribuan orang terlibat dalam persiapan dan pelaksanaan upacara ini. Puncak acara adalah saat Tabuik dilarung ke laut. Tradisi ini memadukan unsur Islam dengan budaya lokal Minangkabau, menciptakan ritual yang unik dan spektakuler.',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxKFKHwPXJiCoc-OqeI6Y-ubbfr9Xm36HyPF4wsOPbdL-Nyj1e-hRi9aJHQzatMrI_x3gfb3N0Tqg4tnb6RYcfP32zc0nxUOoyOTLGw&s=10',
  4.8, 920,
  array['Tradisi', 'Budaya', 'Festival'],
  'published', false;

-- Items for Kabupaten Agam
with kab as (select id, slug from kabupatens), cat as (select id, slug from budaya_categories)
insert into budaya_items (name, slug, kabupaten_id, category_id, type, description, long_description, image_url, rating, reviews_count, tags, status, featured)
select 
  'Danau Maninjau', 'danau-maninjau',
  (select id from kab where slug = 'agam'),
  (select id from cat where slug = 'danau'),
  'objek',
  'Danau indah dengan pemandangan 44 kelok yang menakjubkan dan udara sejuk pegunungan.',
  'Danau Maninjau adalah danau vulkanik yang terletak di ketinggian 461,5 meter di atas permukaan laut. Danau ini memiliki luas sekitar 99,5 km² dengan kedalaman maksimal 165 meter. Perjalanan menuju danau melalui 44 kelok (tikungan) yang menawarkan pemandangan spektakuler. Kawasan danau menjadi destinasi favorit untuk bersepeda, memancing, atau sekadar menikmati keindahan alam. Terdapat berbagai penginapan dan kafe di sekitar danau. Air danau yang jernih dan udara pegunungan yang sejuk membuat tempat ini ideal untuk relaksasi.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Maninjau.jpg/330px-Maninjau.jpg',
  4.9, 1850,
  array['Danau', 'Alam', 'Road Trip'],
  'published', true
union all
select 
  'Ngarai Sianok', 'ngarai-sianok',
  (select id from kab where slug = 'agam'),
  (select id from cat where slug = 'alam'),
  'objek',
  'Lembah hijau yang menakjubkan dengan tebing curam dan pemandangan spektakuler.',
  'Ngarai Sianok atau Canyon Sianok adalah ngarai dengan kedalaman mencapai 100 meter yang membentang sepanjang 15 km. Lembah hijau ini menawarkan pemandangan alam yang dramatis dengan tebing-tebing curam dan Sungai Batang Sianok di dasarnya. Terdapat beberapa spot viewing yang menawarkan panorama berbeda. Aktivitas yang dapat dilakukan antara lain trekking, fotografi landscape, atau sekadar menikmati keindahan dari kejauhan. Kawasan ini juga memiliki nilai sejarah karena dulunya digunakan sebagai benteng pertahanan.',
  'https://upload.wikimedia.org/wikipedia/commons/a/a1/Ngarai_Sianok_Hijau.jpg',
  4.8, 1200,
  array['Alam', 'Hiking', 'Fotografi'],
  'published', true
union all
select 
  'Rendang Lokan Agam', 'rendang-lokan-agam',
  (select id from kab where slug = 'agam'),
  (select id from cat where slug = 'kuliner'),
  'kuliner',
  'Olahan khas berbahan lokan dengan bumbu rendang lezat.',
  'Rendang Lokan adalah hidangan khas Kabupaten Agam yang menggunakan lokan (sejenis kerang air tawar) sebagai bahan utama. Lokan dimasak dengan bumbu rendang khas Minangkabau yang kaya rempah. Proses memasak yang lama membuat bumbu meresap sempurna ke dalam daging lokan. Tekstur daging lokan yang kenyal berpadu dengan kuah rendang yang gurih menciptakan cita rasa yang unik. Hidangan ini biasanya disajikan dengan nasi hangat dan sambal lado. Beberapa warung di sekitar Danau Maninjau terkenal dengan rendang lokan mereka.',
  'https://katasumbar.com/wp-content/uploads/2022/10/Rendang-lokan-Padangkita-1024x576.jpg',
  4.6, 310,
  array['Kuliner', 'Khas', 'Rendang'],
  'published', false;

-- Items for Kabupaten Tanah Datar
with kab as (select id, slug from kabupatens), cat as (select id, slug from budaya_categories)
insert into budaya_items (name, slug, kabupaten_id, category_id, type, description, long_description, image_url, rating, reviews_count, tags, status, featured)
select 
  'Istana Pagaruyung', 'istana-pagaruyung',
  (select id from kab where slug = 'tanah-datar'),
  (select id from cat where slug = 'budaya'),
  'objek',
  'Istana kerajaan Minangkabau yang megah, menampilkan arsitektur tradisional dan sejarah budaya.',
  'Istana Pagaruyung adalah replika istana Kerajaan Pagaruyung yang merupakan pusat kebudayaan Minangkabau. Bangunan tiga tingkat dengan atap gonjong khas Minangkabau ini menjadi simbol kejayaan kebudayaan Minang. Interior istana menampilkan berbagai koleksi artefak bersejarah, senjata tradisional, pakaian adat, dan dokumentasi sejarah kerajaan. Pengunjung dapat mempelajari filosofi adat Minangkabau dan sistem pemerintahan matrilineal yang unik. Lokasi istana dikelilingi pemandangan sawah dan Gunung Marapi yang menambah keindahan. Tersedia pemandu wisata yang menjelaskan sejarah secara detail.',
  'https://uwitan.id/wp-content/uploads/2025/01/Istana-Basa-Pagaruyung.jpg',
  4.6, 2100,
  array['Budaya', 'Sejarah', 'Wisata Edukasi'],
  'published', true
union all
select 
  'Maanta Pabukoan', 'maanta-pabukoan',
  (select id from kab where slug = 'tanah-datar'),
  (select id from cat where slug = 'budaya'),
  'tradisi',
  'Tradisi berbagi makanan jelang berbuka yang kental nilai kekerabatan.',
  'Maanta Pabukoan adalah tradisi unik masyarakat Tanah Datar saat bulan Ramadan. Masyarakat saling mengirimkan makanan untuk berbuka puasa ke rumah saudara dan tetangga. Tradisi ini melambangkan kebersamaan, silaturahmi, dan kepedulian sosial. Setiap keluarga menyiapkan beberapa porsi makanan dalam dulang atau piring, kemudian anak-anak mengantar ke rumah-rumah tetangga. Tidak jarang satu rumah menerima puluhan dulang makanan dari berbagai keluarga. Tradisi ini memperkuat ikatan kekeluargaan dan menjaga nilai gotong royong dalam masyarakat Minangkabau.',
  'https://sumbar.kabardaerah.com/wp-content/uploads/2022/04/IMG-20220406-WA0052.jpg',
  4.7, 640,
  array['Tradisi', 'Ramadan', 'Budaya'],
  'published', false;

-- Items for Kabupaten Lima Puluh Kota
with kab as (select id, slug from kabupatens), cat as (select id, slug from budaya_categories)
insert into budaya_items (name, slug, kabupaten_id, category_id, type, description, long_description, image_url, rating, reviews_count, tags, status, featured)
select 
  'Lembah Harau', 'lembah-harau',
  (select id from kab where slug = 'lima-puluh-kota'),
  (select id from cat where slug = 'alam'),
  'objek',
  'Surga tersembunyi dengan tebing tinggi 100 meter, air terjun indah, dan pemandangan menakjubkan.',
  'Lembah Harau adalah kawasan alam yang dikelilingi tebing granit setinggi 100-500 meter. Lembah hijau yang subur dengan sawah dan perkebunan ini menawarkan pemandangan yang sangat fotogenik. Terdapat beberapa air terjun cantik seperti Air Terjun Aka Barayun dan Sarasah Bunta. Kawasan ini menjadi surga bagi pecinta panjat tebing dengan berbagai jalur dari level pemula hingga profesional. Tersedia homestay dan camping ground bagi yang ingin menginap. Aktivitas lain yang dapat dilakukan: trekking, bersepeda, mengamati burung, dan menikmati keindahan alam yang masih asri.',
  'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lembah_harau_50_kota.jpg',
  4.9, 1040,
  array['Alam', 'Hiking', 'Air Terjun'],
  'published', true
union all
select 
  'Kelok Sembilan', 'kelok-sembilan',
  (select id from kab where slug = 'lima-puluh-kota'),
  (select id from cat where slug = 'alam'),
  'objek',
  'Jalan berkelok dengan pemandangan indah, ikon perjalanan Sumbar.',
  'Kelok Sembilan adalah jalan berkelok yang menjadi ikon perjalanan di Sumatera Barat. Meskipun bernama Kelok Sembilan (sembilan tikungan), sebenarnya terdapat lebih dari 9 tikungan tajam. Jalan ini menghubungkan kota Payakumbuh dengan Danau Maninjau. Pembangunan jembatan layang telah mempersingkat waktu perjalanan, namun jalan lama masih dapat dilalui untuk menikmati sensasi berkendara di tikungan ekstrem. Pemandangan lembah hijau dan pegunungan dari atas jembatan sangat menakjubkan. Spot foto favorit wisatawan yang melewati jalur trans Sumatera.',
  'https://upload.wikimedia.org/wikipedia/commons/1/10/Kelok_9_HPN.jpg',
  4.7, 1500,
  array['Alam', 'Road Trip', 'Fotografi'],
  'published', true
union all
select 
  'Randang Talua', 'randang-talua',
  (select id from kab where slug = 'lima-puluh-kota'),
  (select id from cat where slug = 'kuliner'),
  'kuliner',
  'Kreasi rendang berbahan telur khas masyarakat setempat.',
  'Randang Talua atau Rendang Telur adalah variasi rendang yang menggunakan telur sebagai bahan utama. Telur rebus dimasak dengan bumbu rendang khas Minangkabau hingga kuah mengering dan bumbu meresap. Proses memasaknya lebih cepat dibanding rendang daging, namun tetap menghasilkan cita rasa yang kaya rempah. Tekstur telur yang padat menyerap bumbu dengan sempurna. Hidangan ini sering disajikan sebagai alternatif rendang daging dan cocok untuk vegetarian yang mengonsumsi telur. Beberapa warung di Lima Puluh Kota terkenal dengan randang talua mereka yang lezat.',
  'https://cdn0-production-images-kly.akamaized.net/0cyhUNGPltPsf1XXuiwatk1iU6k=/0x460:4640x3075/469x260/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3954588/original/095492700_1646636681-shutterstock_2091118177.jpg',
  4.4, 220,
  array['Kuliner', 'Rendang', 'Khas'],
  'published', false;

-- Items for Kabupaten Pesisir Selatan
with kab as (select id, slug from kabupatens), cat as (select id, slug from budaya_categories)
insert into budaya_items (name, slug, kabupaten_id, category_id, type, description, long_description, image_url, rating, reviews_count, tags, status, featured)
select 
  'Pantai Carocok Painan', 'pantai-carocok-painan',
  (select id from kab where slug = 'pesisir-selatan'),
  (select id from cat where slug = 'pantai'),
  'objek',
  'Pantai dengan pulau kecil yang bisa dicapai dengan jembatan, pemandangan sunset indah.',
  'Pantai Carocok Painan adalah destinasi wisata pantai yang terletak di ibu kota Kabupaten Pesisir Selatan. Daya tarik utama adalah Pulau Cingkuak yang terhubung dengan daratan melalui jembatan gantung. Pengunjung dapat berjalan di jembatan sambil menikmati deburan ombak di bawahnya. Dari pulau kecil ini, pemandangan sunset sangat indah dengan latar Samudra Hindia yang luas. Terdapat mercusuar tua yang menambah nilai historis. Pantai ini cocok untuk aktivitas santai seperti jalan-jalan, memancing, atau bermain di pasir. Tersedia fasilitas warung makan dan area parkir yang memadai.',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJbgJ7b7hoRiIYqgbsCvEK0pSZObRKpFTOqg&s',
  4.6, 980,
  array['Pantai', 'Sunset', 'Jembatan'],
  'published', true
union all
select 
  'Serabi Painan', 'serabi-painan',
  (select id from kab where slug = 'pesisir-selatan'),
  (select id from cat where slug = 'kuliner'),
  'kuliner',
  'Serabi tradisional dengan santan gurih dan gula merah.',
  'Serabi Painan adalah jajanan tradisional khas Pesisir Selatan yang terbuat dari tepung beras, santan, dan gula merah. Proses pembuatan masih menggunakan cara tradisional dengan cetakan tanah liat dan arang sebagai bahan bakar. Teksturnya lembut, sedikit kenyal, dengan aroma pandan yang harum. Biasanya disajikan dengan taburan kelapa parut dan siraman gula merah cair. Rasa manis gurih yang pas menjadikan serabi ini favorit sebagai teman minum teh atau kopi. Banyak penjual serabi di sepanjang jalan utama Painan, terutama di pagi dan sore hari.',
  'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/26/3488222075.jpg',
  4.5, 310,
  array['Kuliner', 'Jajanan', 'Tradisional'],
  'published', false;

-- Items for Kabupaten Solok
with kab as (select id, slug from kabupatens), cat as (select id, slug from budaya_categories)
insert into budaya_items (name, slug, kabupaten_id, category_id, type, description, long_description, image_url, rating, reviews_count, tags, status, featured)
select 
  'Danau Kembar', 'danau-kembar',
  (select id from kab where slug = 'solok'),
  (select id from cat where slug = 'danau'),
  'objek',
  'Dua danau yang berdampingan di ketinggian, pemandangan alam yang menawan.',
  'Danau Kembar atau Danau di Atas dan Danau di Bawah adalah dua danau yang letaknya berdampingan di kawasan Alahan Panjang, Kabupaten Solok. Terletak di ketinggian sekitar 1.400 meter di atas permukaan laut, kedua danau ini menawarkan udara sejuk dan pemandangan alam yang asri. Danau di Atas memiliki air yang lebih jernih dengan warna biru kehijauan, sementara Danau di Bawah lebih tenang dan dikelilingi hutan. Aktivitas yang dapat dilakukan: memancing, berkeliling danau dengan perahu, camping, atau sekadar menikmati keindahan alam. Terdapat beberapa resort dan penginapan di sekitar danau.',
  'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/10/2023/08/21/Danau-Kembar-3770746387.jpg',
  4.7, 750,
  array['Danau', 'Alam', 'Camping'],
  'published', true
union all
select 
  'Bareh Solok', 'bareh-solok',
  (select id from kab where slug = 'solok'),
  (select id from cat where slug = 'kuliner'),
  'kuliner',
  'Beras khas Solok yang terkenal pulen sebagai ikon kuliner daerah.',
  'Bareh Solok atau Beras Solok adalah beras premium yang menjadi kebanggaan Kabupaten Solok. Beras ini ditanam di dataran tinggi dengan iklim sejuk dan air yang jernih dari pegunungan. Hasilnya adalah beras dengan tekstur pulen, aroma harum, dan rasa yang enak. Bareh Solok memiliki kadar amilosa yang pas sehingga nasi tidak cepat basi dan tetap enak meski dingin. Beras ini telah mendapat sertifikasi indikasi geografis. Produk ini tidak hanya dijual lokal, tetapi juga diekspor ke berbagai daerah. Sering dijadikan oleh-oleh khas Solok oleh wisatawan.',
  'https://statis.topsumbar.co.id/assets/mitra/2/2023/09/Keunggulan-Bareh-Solok-dibandingkan-Beras-Lainnya-di-Sumatera-Barat.jpg',
  4.6, 540,
  array['Kuliner', 'Ikon', 'Beras'],
  'published', false;

-- Items for Kabupaten Padang Pariaman
with kab as (select id, slug from kabupatens), cat as (select id, slug from budaya_categories)
insert into budaya_items (name, slug, kabupaten_id, category_id, type, description, long_description, image_url, rating, reviews_count, tags, status, featured)
select 
  'Pantai Gandoriah', 'pantai-gandoriah',
  (select id from kab where slug = 'padang-pariaman'),
  (select id from cat where slug = 'pantai'),
  'objek',
  'Pantai dengan mercusuar ikonik dan pemandangan laut yang indah.',
  'Pantai Gandoriah terletak di Kota Pariaman dan menjadi salah satu destinasi wisata favorit di Kabupaten Padang Pariaman. Pantai ini memiliki pasir putih yang bersih dan ombak yang relatif tenang. Mercusuar tua yang berdiri di atas pulau kecil menjadi ikon pantai ini. Pulau dapat dicapai dengan jembatan saat air laut surut. Terdapat taman bermain anak, area kuliner, dan jogging track di sepanjang pantai. Sunset di Pantai Gandoriah sangat indah dengan siluet mercusuar dan perahu nelayan. Fasilitas lengkap tersedia: toilet, mushola, parkir luas, dan area piknik keluarga.',
  'https://indonesiakaya.com/wp-content/uploads/2020/10/8__IMG_3493_Posisi_yang_strategis_panorama_indah_dan_kontur_yang_landai_menyatu_di_Pantai_Gandoriah.jpg',
  4.5, 1100,
  array['Pantai', 'Mercusuar', 'Sunset'],
  'published', true
union all
select 
  'Bika Pariaman', 'bika-pariaman',
  (select id from kab where slug = 'padang-pariaman'),
  (select id from cat where slug = 'kuliner'),
  'kuliner',
  'Kue tradisional lembut dengan rasa manis khas Pariaman.',
  'Bika Pariaman adalah kue tradisional yang menjadi oleh-oleh wajib dari Pariaman. Terbuat dari bahan dasar tepung beras, telur, gula, dan santan yang difermentasi, menghasilkan tekstur yang lembut berpori-pori. Proses pembuatan memerlukan ketelitian khususnya dalam tahap fermentasi dan pemanggangan. Hasilnya adalah kue dengan rasa manis legit, tekstur lembut berserabut, dan aroma pandan yang khas. Berbeda dengan bika Medan yang lebih tebal, bika Pariaman lebih tipis dan lembut. Banyak toko oleh-oleh di Pariaman yang menjual bika dengan berbagai varian rasa modern seperti durian, keju, dan cokelat.',
  'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/995/2024/09/22/mg3-959418195.png',
  4.5, 780,
  array['Kuliner', 'Oleh-oleh', 'Kue'],
  'published', false;

-- Items for Kota Bukittinggi
with kab as (select id, slug from kabupatens), cat as (select id, slug from budaya_categories)
insert into budaya_items (name, slug, kabupaten_id, category_id, type, description, long_description, image_url, rating, reviews_count, tags, status, featured)
select 
  'Jam Gadang', 'jam-gadang',
  (select id from kab where slug = 'bukittinggi'),
  (select id from cat where slug = 'budaya'),
  'objek',
  'Menara jam ikonik Bukittinggi dengan arsitektur unik, simbol kota.',
  'Jam Gadang adalah menara jam setinggi 26 meter yang menjadi landmark Kota Bukittinggi. Dibangun pada tahun 1926 saat era kolonial Belanda, menara ini memiliki keunikan tersendiri. Atapnya berbentuk gonjong khas rumah Minangkabau dengan hiasan ukiran tradisional. Jam di keempat sisinya menggunakan angka romawi dengan keunikan: angka IV ditulis sebagai IIII bukan IV. Pada malam hari, Jam Gadang diterangi lampu yang membuatnya semakin cantik. Area sekitar Jam Gadang adalah pusat kota dengan pasar, toko oleh-oleh, dan berbagai kuliner khas. Tempat ini selalu ramai dikunjungi wisatawan untuk berfoto.',
  'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/217/2025/09/05/sejarah-jam-gadang-di-bukittinggi-dan-berkibarnya-bendera-merah-putih-trf-1675272965.jpg',
  4.8, 2400,
  array['Budaya', 'Landmark', 'Sejarah'],
  'published', true
union all
select 
  'Turun Mandi Bukittinggi', 'turun-mandi-bukittinggi',
  (select id from kab where slug = 'bukittinggi'),
  (select id from cat where slug = 'budaya'),
  'tradisi',
  'Upacara adat memandikan bayi pertama kali dengan prosesi khas.',
  'Turun Mandi adalah upacara adat Minangkabau untuk memandikan bayi pertama kali ke sungai atau mata air. Tradisi ini biasanya dilakukan saat bayi berusia sekitar 40-44 hari. Prosesi dimulai dari rumah dengan membawa bayi dalam ayunan yang dihias indah, diiringi rombongan keluarga dan tetangga dengan musik tradisional. Di lokasi pemandian, bayi dimandikan oleh datuk atau orang tua yang dituakan sambil membacakan doa. Setelah itu diadakan selamatan dengan menyajikan makanan untuk tamu. Tradisi ini melambangkan perkenalan bayi kepada alam dan masyarakat, serta doa agar anak tumbuh sehat dan berakhlak mulia.',
  'https://cdn.rri.co.id/berita/Bukittinggi/o/1734711670131-turun-mandi-62baed17bb44867e1e6f3c08/o94elf8mrlxs36u.jpeg',
  4.6, 420,
  array['Tradisi', 'Adat', 'Budaya'],
  'published', false;

-- ==============================
-- Note about data structure:
-- - Featured items will be highlighted on the homepage
-- - Status 'published' means visible to public
-- - Tags array allows flexible categorization
-- - Long_description provides detailed information for detail pages
-- - Latitude/longitude for items can be added later for precise mapping
-- ==============================
