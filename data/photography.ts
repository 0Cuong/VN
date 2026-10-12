export interface PhotoItem {
  id: string;
  title: string;
  titleVi: string;
  subtitle: string;
  location: string;
  coordinates: string;
  year: string;
  photographer: string;
  license: string;
  sourceUrl: string;
  imageUrl: string;
  fallbackUrl: string;
  exif: {
    camera?: string;
    focal?: string;
    aperture?: string;
    iso?: string;
    shutter?: string;
  };
  narrative: string;
  tag: string;
}

export const HERO_PHOTO: PhotoItem = {
  id: 'hero-hanoi',
  title: 'Hanoi Horizon & Ba Vi Peaks',
  titleVi: 'Hà Nội — Chân trời Ba Vì đón bình minh',
  subtitle: 'A living dialogue between heritage and the modern city',
  location: 'Hà Nội, Việt Nam',
  coordinates: '21°01\'42.6"N 105°51\'15.5"E',
  year: '2022',
  photographer: 'Wikimedia Commons Contributor',
  license: 'CC BY-SA 4.0',
  sourceUrl: 'https://en.wikipedia.org/wiki/Hanoi',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg',
  fallbackUrl: '/assets/images/photo-fallback.svg',
  exif: {
    focal: '85mm',
    aperture: 'f/8.0',
    iso: '100',
    shutter: '1/320s',
  },
  narrative: 'Bình minh phủ sương trên những tầng kiến trúc Thủ đô ngàn năm văn hiến, nơi đỉnh Ba Vì huyền thoại canh giữ nhịp chuyển mình mạnh mẽ của thành phố đương đại.',
  tag: 'HERO CINEMATIC',
};

export const HERITAGE_PHOTOS: PhotoItem[] = [
  {
    id: 'heritage-incense',
    title: 'Crimson Bouquets of Quang Phu Cau',
    titleVi: 'Hương đỏ làng nghề Quảng Phú Cầu',
    subtitle: 'Century-old sacred incense craft in Ung Hoa',
    location: 'Ứng Hòa, Hà Nội',
    coordinates: '20°49\'30.7"N 105°46\'21.0"E',
    year: '2021',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Incense_in_Vietnam.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Incense_in_Vietnam.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '35mm',
      aperture: 'f/4.0',
      iso: '200',
      shutter: '1/500s',
    },
    narrative: 'Sắc đỏ son của những bó chân hương xòe rộng như đóa hoa mặt trời, lưu giữ tinh hoa truyền thống tâm linh và hồn cốt làng quê Bắc Bộ qua hàng thế kỷ.',
    tag: 'DI SẢN THỦ CÔNG',
  },
  {
    id: 'heritage-hoian',
    title: 'Lantern Reverie of Hoi An Harbor',
    titleVi: 'Đêm hoa đăng phố cổ Hội An',
    subtitle: 'UNESCO World Heritage harbor along the Hoai River',
    location: 'Hội An, Quảng Nam',
    coordinates: '15°52\'48.4"N 108°20\'16.8"E',
    year: '2019',
    photographer: 'Mstyslav Chernov / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hoi_An_Laternen_und_Lampions_(39543426861).jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Hoi_An_Laternen_und_Lampions_%2839543426861%29.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '50mm',
      aperture: 'f/1.8',
      iso: '800',
      shutter: '1/60s',
    },
    narrative: 'Bến cảng giao thương cổ xưa sáng bừng ánh đèn lồng lụa, nơi ký ức phương Đông lắng đọng trên từng vách gỗ rêu phong và dòng sông Hoài êm đềm.',
    tag: 'DI SẢN THẾ GIỚI',
  },
  {
    id: 'heritage-cathedral',
    title: 'Gothic Elegance — St. Joseph Cathedral',
    titleVi: 'Nhà Thờ Lớn — Dấu ấn kiến trúc Pháp cổ',
    subtitle: 'Neo-Gothic heritage monument founded in 1886',
    location: 'Hoàn Kiếm, Hà Nội',
    coordinates: '21°01\'43.3"N 105°50\'57.8"E',
    year: '2020',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:St._Joseph%27s_Cathedral_-_Hanoi,_Vietnam.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/St._Joseph%27s_Cathedral_-_Hanoi%2C_Vietnam.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '24mm',
      aperture: 'f/5.6',
      iso: '160',
      shutter: '1/250s',
    },
    narrative: 'Tường gạch vôi phong sương giữa lòng phố cổ Hà Nội, biểu trưng cho sự giao thoa hài hòa giữa phong cách Tân Gothic châu Âu và nhịp sống đường phố Tràng An.',
    tag: 'KIẾN TRÚC PHÁP CỔ',
  },
  {
    id: 'heritage-thehuc',
    title: 'The Scarlet Huc Bridge & Sword Lake',
    titleVi: 'Cầu Thê Húc — Nơi lưu giữ ánh dương ban mai',
    subtitle: 'Connecting the mainland to Ngoc Son Temple',
    location: 'Hồ Hoàn Kiếm, Hà Nội',
    coordinates: '21°01\'50.5"N 105°51\'11.9"E',
    year: '2019',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Th%C3%AA_H%C3%BAc_bridge_with_flags.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Th%C3%AA_H%C3%BAc_bridge_with_flags.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '45mm',
      aperture: 'f/4.5',
      iso: '200',
      shutter: '1/400s',
    },
    narrative: 'Cây cầu gỗ cong uốn lượn sắc đỏ son nối liền vào đền Ngọc Sơn giữa làn nước biếc, biểu tượng bất tử của sự thanh tao và trí tuệ dân tộc.',
    tag: 'BIỂU TƯỢNG VĂN HÓA',
  },
];

export const MODERN_CITY_PHOTOS: PhotoItem[] = [
  {
    id: 'city-skyline',
    title: 'Saigon Urban Choreography',
    titleVi: 'Sài Gòn — Bản giao hưởng đô thị ven sông',
    subtitle: 'Dynamic high-rises mirroring upon the Saigon River',
    location: 'Quận 1, TP. Hồ Chí Minh',
    coordinates: '10°46\'36.8"N 106°42\'03.2"E',
    year: '2019',
    photographer: 'Lê Minh Phát / Wikimedia Commons',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_City_panorama_2019.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Ho_Chi_Minh_City_panorama_2019.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '28mm',
      aperture: 'f/8.0',
      iso: '100',
      shutter: '1/500s',
    },
    narrative: 'Thành phố không ngủ vươn mình với những tòa tháp chọc trời phản chiếu mặt nước sông Sài Gòn, tạo nên bức tranh đô thị năng động bậc nhất Đông Nam Á.',
    tag: 'ĐÔ THỊ HIỆN ĐẠI',
  },
  {
    id: 'city-landmark81',
    title: 'Landmark 81 — Skyward Monolith',
    titleVi: 'Landmark 81 — Đỉnh cao kiêu hãnh 461.2 mét',
    subtitle: 'The towering pinnacle inspired by traditional bamboo bundles',
    location: 'Bình Thạnh, TP. Hồ Chí Minh',
    coordinates: '10°47\'42.0"N 106°43\'18.8"E',
    year: '2020',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_Landmark_81_at_night.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/The_Landmark_81_at_night.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '24mm',
      aperture: 'f/4.0',
      iso: '640',
      shutter: '1/30s',
    },
    narrative: 'Lấy cảm hứng từ bó tre truyền thống kiên cường của người Việt, tòa tháp xé toang màn đêm bằng hệ thống chiếu sáng hiện đại, biểu trưng cho khát vọng vươn tầm.',
    tag: 'KIẾN TRÚC ĐỈNH CAO',
  },
  {
    id: 'city-traffic',
    title: 'The Electric Pulse — Saigon Flow',
    titleVi: 'Dòng chảy đường phố — Nhịp đập xe máy',
    subtitle: 'Continuous kinetic stream of millions across city boulevards',
    location: 'Đại lộ TP. Hồ Chí Minh',
    coordinates: '10°45\'45.4"N 106°39\'36.7"E',
    year: '2018',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Traffic_In_Saigon_(244218359).jpeg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Traffic_In_Saigon_%28244218359%29.jpeg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '50mm',
      aperture: 'f/5.6',
      iso: '400',
      shutter: '1/125s',
    },
    narrative: 'Dòng xe máy cuộn chảy nhịp nhàng như dòng máu đỏ nuôi dưỡng đô thị, tạo nên một vũ điệu đường phố độc nhất vô nhị chỉ có ở Việt Nam.',
    tag: 'NHỊP SỐNG ĐƯỜNG PHỐ',
  },
];

export const EVERYDAY_PHOTOS: PhotoItem[] = [
  {
    id: 'everyday-coffee',
    title: 'Vietnamese Phin — Ritual of Slow Time',
    titleVi: 'Cà phê phin — Nghệ thuật của sự chậm rãi',
    subtitle: 'Drops of dark robusta condensed with sweetened milk',
    location: 'Quán cóc hè phố, Sài Gòn & Hà Nội',
    coordinates: '10°46\'40.0"N 106°41\'50.0"E',
    year: '2020',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Saigon_cafe_filtre_01.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Saigon_cafe_filtre_01.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '50mm',
      aperture: 'f/2.8',
      iso: '200',
      shutter: '1/160s',
    },
    narrative: 'Từng giọt cà phê tí tách rơi trên đá lạnh và sữa đặc là khoảng lặng thiền định giữa cuộc sống hối hả. Một thói quen đã trở thành triết lý sống khoan thai của người Việt.',
    tag: 'VĂN HÓA CÀ PHÊ',
  },
  {
    id: 'everyday-aodai',
    title: 'Poetry in Motion — The Grace of Ao Dai',
    titleVi: 'Tà áo dài trắng — Nét duyên dáng trường tồn',
    subtitle: 'Silk fluttering through historic streets of Hanoi',
    location: 'Phố cổ Hà Nội',
    coordinates: '21°02\'15.0"N 105°51\'02.0"E',
    year: '2019',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lady_in_white_ao_dai,_Hanoi_(18538703922).jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Lady_in_white_ao_dai%2C_Hanoi_%2818538703922%29.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '70mm',
      aperture: 'f/2.8',
      iso: '125',
      shutter: '1/640s',
    },
    narrative: 'Tà áo dài lụa bay nhẹ trong làn gió thu, kín đáo nhưng gợi cảm, kết tinh vẻ đẹp thanh lịch thuần khiết của người phụ nữ Việt Nam qua mọi thời đại.',
    tag: 'QUỐC PHỤC TRUYỀN THỐNG',
  },
  {
    id: 'everyday-opera',
    title: 'Hanoi Opera House — Twilight Cadence',
    titleVi: 'Nhà hát Lớn Hà Nội — Giai điệu hoàng hôn',
    subtitle: 'Classic Beaux-Arts architecture facing Trang Tien avenue',
    location: 'Quảng trường Cách mạng Tháng Tám, Hà Nội',
    coordinates: '21°01\'27.5"N 105°51\'28.5"E',
    year: '2018',
    photographer: 'Wikimedia Commons Contributor',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_Opera_House_2018_b.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Hanoi_Opera_House_2018_b.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '35mm',
      aperture: 'f/4.0',
      iso: '250',
      shutter: '1/200s',
    },
    narrative: 'Màu vàng rực rỡ và những vòm cung cổ điển dưới ánh tà dương, nơi những thanh âm nghệ thuật giao thoa cùng dòng người tấp nập của phố Tràng Tiền.',
    tag: 'NGHỆ THUẬT & KIẾN TRÚC',
  },
];

export interface MotionExperiment {
  id: string;
  number: string;
  title: string;
  titleVi: string;
  technique: string;
  gsapApi: string;
  description: string;
  image: PhotoItem;
  defaultEase: string;
}

export const MOTION_EXPERIMENTS: MotionExperiment[] = [
  {
    id: 'exp-mask',
    number: '01',
    title: 'Cinematic Clip-Path Reveal',
    titleVi: 'Mở màn đa giác Clip-Path',
    technique: 'POLYGONAL MASK & STAGGER',
    gsapApi: 'gsap.fromTo() + clipPath + power4.out',
    description: 'Chuyển động mở góc điện ảnh từ tâm ảnh, kết hợp ease lũy thừa tạo cảm giác màn trập máy ảnh bung nở chân thực.',
    image: HERITAGE_PHOTOS[0], // Quang Phu Cau incense
    defaultEase: 'power4.out',
  },
  {
    id: 'exp-perspective',
    number: '02',
    title: '3D Spatial Parallax & Tilt',
    titleVi: 'Không gian thị sai 3D đa tầng',
    technique: 'SPATIAL DEPTH & QUICKTO',
    gsapApi: 'gsap.quickTo() + rotateX/Y + transformOrigin',
    description: 'Bắt chuyển động con trỏ với bộ đệm mượt (quickTo), tách lớp foreground và background tạo chiều sâu thị giác hữu hình.',
    image: MODERN_CITY_PHOTOS[1], // Landmark 81
    defaultEase: 'power3.out',
  },
  {
    id: 'exp-kinetic',
    number: '03',
    title: 'Kinetic Typography Choreography',
    titleVi: 'Vũ điệu ký tự Kinetic Type',
    technique: 'GLYPH STAGGER & ROTATEX',
    gsapApi: 'gsap.timeline() + stagger.from("center")',
    description: 'Từng con chữ Việt Nam bung xòe như tà áo lụa với góc xoay trục X và độ giãn nở đàn hồi (elastic easing).',
    image: EVERYDAY_PHOTOS[1], // Ao Dai
    defaultEase: 'elastic.out(1, 0.45)',
  },
  {
    id: 'exp-curtain',
    number: '04',
    title: 'Split Curtain Narrative Wipe',
    titleVi: 'Chuyển cảnh rèm đôi đối xứng',
    technique: 'DUAL CURTAIN SPLIT & YOYO',
    gsapApi: 'gsap.to() + scaleX + transformPerspective',
    description: 'Hai vạt lụa sơn mài trượt ngược chiều xé toạc khung hình, hé lộ câu chuyện đời sống bình dị đằng sau nhịp sống đô thị.',
    image: EVERYDAY_PHOTOS[0], // Coffee
    defaultEase: 'expo.inOut',
  },
];
