export interface CuratorStory {
  era: string;
  significance: string;
  visualAnalysis: string;
  locationContext: string;
}

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
  curator?: CuratorStory;
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
  imageUrl: '/assets/images/photos/hero-hanoi.jpg',
  fallbackUrl: '/assets/images/photo-fallback.svg',
  exif: {
    focal: '85mm',
    aperture: 'f/8.0',
    iso: '100',
    shutter: '1/320s',
  },
  narrative: 'Bình minh phủ sương trên những tầng kiến trúc Thủ đô ngàn năm văn hiến, nơi đỉnh Ba Vì huyền thoại canh giữ nhịp chuyển mình mạnh mẽ của thành phố đương đại.',
  tag: 'MỞ MÀN ĐIỆN ẢNH',
  curator: {
    era: 'Thế kỷ XI — Hiện đại',
    significance: 'Đỉnh Ba Vì gắn liền với huyền tích Tản Viên Sơn Thánh, là bình phong che chắn cho đồng bằng Bắc Bộ từ buổi đầu dựng nước.',
    visualAnalysis: 'Góc chụp ống kính tầm xa 85mm nén chặt chiều sâu giữa lớp sương sớm mờ ảo, các khối nhà cao tầng đương đại và dáng hình hùng vĩ của dãy Tản Viên.',
    locationContext: 'Toạ độ chụp từ phía Đông sông Hồng nhìn về hướng Tây Thủ đô trong khoảnh khắc bình minh vừa rạng rỡ.',
  },
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
    imageUrl: '/assets/images/photos/heritage-incense.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '35mm',
      aperture: 'f/4.0',
      iso: '200',
      shutter: '1/500s',
    },
    narrative: 'Sắc đỏ son của những bó chân hương xòe rộng như đóa hoa mặt trời, lưu giữ tinh hoa truyền thống tâm linh và hồn cốt làng quê Bắc Bộ qua hàng thế kỷ.',
    tag: 'DI SẢN THỦ CÔNG',
    curator: {
      era: 'Hơn 100 năm gìn giữ làng nghề',
      significance: 'Nghề làm tăm hương truyền thống nuôi dưỡng đời sống tâm linh, gắn kết cộng đồng làng xã qua nhiều thế hệ.',
      visualAnalysis: 'Bố cục góc nhìn từ trên cao (top-down) với nhịp điệu hình học tròn đồng tâm, sắc đỏ sơn mài rực rỡ tạo cảm giác như một bức họa trừu tượng sống động.',
      locationContext: 'Sân phơi nắng tự nhiên thuộc xã Quảng Phú Cầu, huyện Ứng Hòa, cách trung tâm Hà Nội khoảng 35km.',
    },
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
    imageUrl: '/assets/images/photos/heritage-hoian.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '50mm',
      aperture: 'f/1.8',
      iso: '800',
      shutter: '1/60s',
    },
    narrative: 'Bến cảng giao thương cổ xưa sáng bừng ánh đèn lồng lụa, nơi ký ức phương Đông lắng đọng trên từng vách gỗ rêu phong và dòng sông Hoài êm đềm.',
    tag: 'DI SẢN THẾ GIỚI UNESCO',
    curator: {
      era: 'Thế kỷ XVI — XVIII (Thương cảng Faifo)',
      significance: 'Được UNESCO công nhận là Di sản Văn hóa Thế giới năm 1999 nhờ tính nguyên vẹn của quần thể kiến trúc phố cổ Á Đông.',
      visualAnalysis: 'Khẩu độ lớn f/1.8 tạo hiệu ứng bokeh ấm áp từ hàng trăm lồng đèn lụa Hà Đông, tương phản nhẹ nhàng với mặt nước sông Hoài về đêm.',
      locationContext: 'Dọc bến thuyền sông Hoài và các tuyến phố cổ Nguyễn Thái Học, Trần Phú thuộc trung tâm Hội An.',
    },
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
    imageUrl: '/assets/images/photos/heritage-cathedral.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '24mm',
      aperture: 'f/5.6',
      iso: '160',
      shutter: '1/250s',
    },
    narrative: 'Tường gạch vôi phong sương giữa lòng phố cổ Hà Nội, biểu trưng cho sự giao thoa hài hòa giữa phong cách Tân Gothic châu Âu và nhịp sống đường phố Tràng An.',
    tag: 'KIẾN TRÚC PHÁP CỔ',
    curator: {
      era: 'Khánh thành Giáng sinh năm 1886',
      significance: 'Nhà thờ Công giáo cổ nhất còn nguyên vẹn ở thủ đô, là giao điểm văn hóa giữa kiến trúc phương Tây và sinh hoạt phố thị Á Đông.',
      visualAnalysis: 'Góc rộng 24mm thu trọn diện mạo đối xứng uy nghiêm với hai tháp chuông cao 31.5m và lớp rêu phong phong sương của hơn một thế kỷ.',
      locationContext: 'Quảng trường Nhà Thờ, phường Hàng Trống, quận Hoàn Kiếm, Hà Nội.',
    },
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
    imageUrl: '/assets/images/photos/heritage-thehuc.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '45mm',
      aperture: 'f/4.5',
      iso: '200',
      shutter: '1/400s',
    },
    narrative: 'Cây cầu gỗ cong uốn lượn sắc đỏ son nối liền vào đền Ngọc Sơn giữa làn nước biếc, biểu tượng bất tử của sự thanh tao và trí tuệ dân tộc.',
    tag: 'BIỂU TƯỢNG VĂN HÓA',
    curator: {
      era: 'Khởi dựng năm 1865 (triều Nguyễn, danh sĩ Nguyễn Siêu)',
      significance: 'Mang ý nghĩa "nơi ngưng tụ ánh sáng mặt trời ban mai", hợp cùng Tháp Bút và Đài Nghiên thành biểu tượng hiếu học Thăng Long.',
      visualAnalysis: 'Đường cong duyên dáng sắc đỏ son tương phản mạnh mẽ với màu xanh ngọc bích của mặt nước Hồ Gươm và tán liễu rủ.',
      locationContext: 'Phía Đông Bắc Hồ Hoàn Kiếm, nối bờ hồ với Đắc Nguyệt Lâu trên đảo Ngọc.',
    },
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
    imageUrl: '/assets/images/photos/city-skyline.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '28mm',
      aperture: 'f/8.0',
      iso: '100',
      shutter: '1/500s',
    },
    narrative: 'Thành phố không ngủ vươn mình với những tòa tháp chọc trời phản chiếu mặt nước sông Sài Gòn, tạo nên bức tranh đô thị năng động bậc nhất Đông Nam Á.',
    tag: 'ĐÔ THỊ HIỆN ĐẠI',
    curator: {
      era: 'Kỷ nguyên thế kỷ XXI',
      significance: 'Đầu tàu kinh tế và sáng tạo của cả nước, biểu trưng cho sự vươn mình mạnh mẽ và cởi mở đón chào tương lai.',
      visualAnalysis: 'Toàn cảnh panorama trải dài với nhịp điệu cao thấp của các tòa tháp hiện đại phản chiếu trên mặt nước lượn sóng của sông Sài Gòn.',
      locationContext: 'Góc nhìn từ bán đảo Thủ Thiêm nhìn về trung tâm Quận 1.',
    },
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
    imageUrl: '/assets/images/photos/city-landmark81.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '24mm',
      aperture: 'f/4.0',
      iso: '640',
      shutter: '1/30s',
    },
    narrative: 'Lấy cảm hứng từ bó tre truyền thống kiên cường của người Việt, tòa tháp xé toang màn đêm bằng hệ thống chiếu sáng hiện đại, biểu trưng cho khát vọng vươn tầm.',
    tag: 'KIẾN TRÚC ĐỈNH CAO',
    curator: {
      era: 'Khánh thành năm 2018',
      significance: 'Công trình cao nhất Việt Nam, lấy cảm hứng từ bó tre Thánh Gióng kiên cường, thể hiện năng lực kỹ thuật của người Việt.',
      visualAnalysis: 'Chụp đêm với ánh sáng LED phản chiếu trên các khối giật cấp vươn thẳng lên bầu trời, tạo chiều sâu thị giác đầy năng lượng.',
      locationContext: 'Công viên ven sông Tân Cảng, quận Bình Thạnh, TP. Hồ Chí Minh.',
    },
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
    imageUrl: '/assets/images/photos/city-traffic.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '50mm',
      aperture: 'f/5.6',
      iso: '400',
      shutter: '1/125s',
    },
    narrative: 'Dòng xe máy cuộn chảy nhịp nhàng như dòng máu đỏ nuôi dưỡng đô thị, tạo nên một vũ điệu đường phố độc nhất vô nhị chỉ có ở Việt Nam.',
    tag: 'NHỊP SỐNG ĐƯỜNG PHỐ',
    curator: {
      era: 'Đương đại',
      significance: 'Dòng chảy xe máy là nét văn hóa đặc thù của đô thị Việt Nam, biểu hiện sức sống bền bỉ và nhịp chuyển động không ngừng.',
      visualAnalysis: 'Tốc độ màn trập 1/125s bắt trọn khoảnh khắc chuyển động của hàng trăm phương tiện, bố cục chéo tạo cảm giác tốc độ liên tục.',
      locationContext: 'Giao lộ các đại lộ trung tâm thành phố vào giờ cao điểm hoàng hôn.',
    },
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
    imageUrl: '/assets/images/photos/everyday-coffee.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '50mm',
      aperture: 'f/2.8',
      iso: '200',
      shutter: '1/160s',
    },
    narrative: 'Từng giọt cà phê tí tách rơi trên đá lạnh và sữa đặc là khoảng lặng thiền định giữa cuộc sống hối hả. Một thói quen đã trở thành triết lý sống khoan thai của người Việt.',
    tag: 'VĂN HÓA CÀ PHÊ',
    curator: {
      era: 'Thế kỷ XIX — Hiện đại',
      significance: 'Cà phê phin sữa đá là một trong những nét văn hóa ẩm thực độc đáo nhất thế giới, biểu trưng cho sự nhẫn nại và kết nối bạn bè.',
      visualAnalysis: 'Ánh sáng tự nhiên làm nổi bật độ trong của giọt cà phê và lớp sữa đặc béo ngậy, mang lại cảm giác thân thuộc và tĩnh tại.',
      locationContext: 'Quán cóc vỉa hè quen thuộc dưới bóng mát cây xanh hè phố.',
    },
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
    imageUrl: '/assets/images/photos/everyday-aodai.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '70mm',
      aperture: 'f/2.8',
      iso: '125',
      shutter: '1/640s',
    },
    narrative: 'Tà áo dài lụa bay nhẹ trong làn gió thu, kín đáo nhưng gợi cảm, kết tinh vẻ đẹp thanh lịch thuần khiết của người phụ nữ Việt Nam qua mọi thời đại.',
    tag: 'QUỐC PHỤC TRUYỀN THỐNG',
    curator: {
      era: 'Từ áo ngũ thân truyền thống đến quốc phục đương đại',
      significance: 'Tà áo dài là biểu tượng văn hóa bất hủ của vẻ đẹp duyên dáng, thanh tao và lòng tự hào dân tộc.',
      visualAnalysis: 'Khẩu độ f/2.8 xóa phông nhẹ nhàng phố cổ, làm nổi bật đường nét uốn lượn bay bổng của vạt lụa trắng trong làn gió nhẹ.',
      locationContext: 'Khu vực 36 phố phường cổ kính Hà Nội trong không khí mùa thu thanh lịch.',
    },
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
    imageUrl: '/assets/images/photos/everyday-opera.jpg',
    fallbackUrl: '/assets/images/photo-fallback.svg',
    exif: {
      focal: '35mm',
      aperture: 'f/4.0',
      iso: '250',
      shutter: '1/200s',
    },
    narrative: 'Màu vàng rực rỡ và những vòm cung cổ điển dưới ánh tà dương, nơi những thanh âm nghệ thuật giao thoa cùng dòng người tấp nập của phố Tràng Tiền.',
    tag: 'NGHỆ THUẬT & KIẾN TRÚC',
    curator: {
      era: 'Xây dựng 1901 — 1911',
      significance: 'Tuyệt tác kiến trúc Tân Cổ điển kiểu Pháp và là chứng nhân lịch sử của cuộc Cách mạng Tháng Tám 1945.',
      visualAnalysis: 'Ánh hoàng hôn vàng ấm áp rọi lên tường vôi và hàng cột Corinthian, tạo nên giai điệu trang nhã giữa nhịp sống phố Tràng Tiền.',
      locationContext: 'Quảng trường Cách mạng Tháng Tám, đầu phố Tràng Tiền, Hà Nội.',
    },
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
  motionRationale?: string;
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
    motionRationale: 'Sử dụng clip-path polygon kết hợp hàm gia tốc power4.out giúp GPU tối ưu rendering, tạo nhịp điệu mở khung hình chuẩn điện ảnh.',
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
    motionRationale: 'quickTo() tạo hàm setter nội suy liên tục cho CSS Transform, giảm thiểu tạo đối tượng mới trên từng frame chuột.',
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
    motionRationale: 'Stagger từ tâm (from: "center") tạo nhịp điệu sóng đối xứng tự nhiên, mô phỏng phản xạ cơ học đàn hồi.',
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
    motionRationale: 'scaleX kết hợp transformOrigin ở hai mép biên tạo cảm giác kéo rèm nhà hát mượt mà trên mọi thiết bị.',
  },
];

export const ALL_ARTWORKS: PhotoItem[] = [
  HERO_PHOTO,
  ...HERITAGE_PHOTOS,
  ...MODERN_CITY_PHOTOS,
  ...EVERYDAY_PHOTOS,
];
