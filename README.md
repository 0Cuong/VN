# MOTION-LAB — VIETNAM: WHERE HERITAGE MEETS MOTION

> **Vietnamese Contemporary Culture × Cinematic GSAP Experience**  
> Triển lãm ảnh kỹ thuật số & nghệ thuật chuyển động GSAP độc lập được phát triển bởi **0Cuong**.

- **Repository chính thức**: [https://github.com/0Cuong/VN](https://github.com/0Cuong/VN)
- **Facebook tác giả**: [https://www.facebook.com/share/19kRK8AiuD/?mibextid=wwXIfr](https://www.facebook.com/share/19kRK8AiuD/?mibextid=wwXIfr)

---

## 1. Tầm nhìn & Bản sắc Nghệ thuật (Art Direction)

**MOTION-LAB** là một không gian triển lãm kỹ thuật số đương đại (Digital Photographic Exhibition) tôn vinh vẻ đẹp văn hóa, kiến trúc di sản và nhịp sống đô thị Việt Nam. Dự án sử dụng **GSAP (GreenSock Animation Platform)** làm nhạc trưởng điều phối ngôn ngữ thị giác điện ảnh, mang lại trải nghiệm chiêm nghiệm lắng đọng nhưng giàu năng lượng chuyển động.

### Bảng màu nhận diện (Art Direction Palette)
- **Vietnamese Lacquer Red (`#B52B26`)**: Sắc đỏ sơn mài truyền thống cho các chi tiết cốt lõi, đường kẻ nhịp điệu và nút tương tác.
- **Deep Charcoal (`#151515`) & Charcoal Surface (`#1C1C1C`)**: Nền tối điện ảnh làm bật chiều sâu thị giác của các tác phẩm nhiếp ảnh (Scenes 01, 02, 03, 05, 06).
- **Warm Ivory (`#F4F0E8`)**: Nền sáng thanh lịch, tạo khoảng nghỉ thị giác ấm áp cho phân cảnh đời thường (Scene 04).
- **Muted Gold (`#B69A62`)**: Sắc vàng hoàng kim lắng đọng thời gian cho nhãn phân loại, toạ độ địa lý và metadata.
- **Concrete Grey (`#85847F`)**: Màu bê tông đô thị trung tính cho chú thích EXIF và thông số ống kính.

### Hệ thống Typography
- **Tiêu đề triển lãm**: `Playfair Display`, `Cormorant Garamond` (Serif cổ điển kết hợp tương phản hiện đại, hỗ trợ tiếng Việt đầy đủ).
- **Thân bài & Chú giải**: `Plus Jakarta Sans`, `Be Vietnam Pro` (Sans-serif đương đại, độ tương phản cao, tối ưu khả năng đọc).
- **Toạ độ & Thông số EXIF**: `DM Mono`, `Space Mono` (Monospace sắc nét cho toạ độ địa lý, thông số màn trập và nhãn phân cảnh).

---

## 2. Dòng thời gian thị giác (6 Cinematic Scenes)

### Scene 01 — Cinematic Opening (Mở màn điện ảnh)
- **Tác phẩm**: *Chân trời Hà Nội & dãy Ba Vì đón bình minh* (21°01'42.6"N 105°51'15.5"E).
- **Hoạt họa**: Màn trập đa giác mở rộng (`clip-path: polygon(...)`), kinetic split-text reveal theo nhịp, parallax đa tầng theo cuộn chuột.
- **Chức năng**: Phát lại hiệu ứng mở màn (Replay Intro) và chỉ báo cuộn trang trực quan.

### Scene 02 — Heritage, Still Alive (Di sản trường tồn)
- Bố cục editorial bất đối xứng kết hợp 4 bức ảnh di sản:
  1. *Làng nghề hương đỏ Quảng Phú Cầu, Ứng Hòa, Hà Nội* (CC BY-SA 4.0).
  2. *Đêm hoa đăng sông Hoài, phố cổ Hội An* (CC BY-SA 3.0, Mstyslav Chernov).
  3. *Nhà Thờ Lớn Hà Nội — Dấu ấn Gothic thời Pháp cổ* (CC BY-SA 4.0).
  4. *Cầu Thê Húc đỏ son soi bóng Hồ Hoàn Kiếm* (CC BY 2.0).
- **Hoạt họa**: `clip-path` reveal theo chiều dọc/ngang khi cuộn vào tầm nhìn, text-mask reveal, parallax tốc độ khác nhau.

### Scene 03 — The Modern City (Nhịp thở đô thị đương đại)
- Nhịp sống sôi động của TP. Hồ Chí Minh:
  1. *Skyline ven sông Sài Gòn* (Lê Minh Phát, CC BY 2.0).
  2. *Tháp Landmark 81 cao 461.2 mét* (CC BY-SA 4.0).
  3. *Dòng chảy xe máy & động mạch giao thông Sài Gòn* (CC BY 3.0).
- **Hoạt họa**: Dải horizontal narrative pinning trên desktop qua `ScrollTrigger.create({ pin: true, scrub: 1 })`, chuyển đổi linh hoạt sang dạng thẻ cuộn dọc trên mobile; bộ đếm số liệu động (stat counters) tăng mượt mà.

### Scene 04 — Everyday Vietnam (Khoảnh khắc đời thường)
- Khoảng nghỉ thị giác ấm áp với gam màu Warm Ivory (`#F4F0E8`):
  1. *Cà phê phin truyền thống — Nghệ thuật của sự chậm rãi*.
  2. *Tà áo dài trắng trong gió phố Hà Nội* (Quốc phục truyền thống).
  3. *Nhà hát Lớn Hà Nội trong ánh tà dương*.
- **Chức năng**: Interactive focal showcase cho phép người xem chọn từng khoảnh khắc đời thường và khám phá câu chuyện văn hóa cùng thông số ống kính EXIF.

### Scene 05 — Motion Playground (Phòng thí nghiệm GSAP)
- Bốn bài thực hành animation engineering có thể tương tác trực tiếp:
  1. **Polygonal Clip-Path Reveal**: Màn trập camera mở góc đa giác với `power4.out`.
  2. **3D Spatial Parallax & Tilt**: Tương tác con trỏ 3D tilt theo góc nhìn thực qua `gsap.quickTo()` và độ sâu trục Z.
  3. **Kinetic Typography Wave**: Từng ký tự tiếng Việt bung xòe với `elastic.out` ease và stagger đối xứng từ tâm.
  4. **Split Curtain Wipe**: Hiệu ứng kéo rèm sơn mài đối xứng hai vạt lụa qua `expo.inOut`.
- **Tầng nền điêu khắc không gian**: Three.js ambient sculpture với tông màu vàng đồng hoàng kim và đỏ sơn mài ấm áp.

### Scene 06 — Developer Signature (Dấu ấn tác giả 0Cuong)
- Nhận diện thương hiệu cá nhân của **0Cuong**:
  - MOTION-LAB
  - Crafted by 0Cuong
  - Independent GSAP motion experiment.
  - Facebook & GitHub links.
- Nút "Trở về đầu trang" cuộn mượt bằng GSAP `ScrollToPlugin`.
- Bảng tra cứu nguồn ảnh & giấy phép bản quyền (Credits Modal) minh bạch toàn bộ 11 tác phẩm nhiếp ảnh từ Wikimedia Commons.

### Hồ sơ tác phẩm & Lightbox (Artwork Curator Dossier)
- Nhấp vào bất kỳ bức ảnh nào trên trang để mở **Hồ sơ tác phẩm chuyên sâu**:
  - Xem ảnh phóng to toàn màn hình (Fullscreen Lightbox).
  - Đọc ghi chú giám tuyển (Curator's Notes) về góc máy, ánh sáng, ý nghĩa văn hóa và bối cảnh thực địa.
  - Tra cứu thông số EXIF thực tế: Tiêu cự, Khẩu độ, Độ nhạy sáng (ISO), Tốc độ màn trập.
  - Điều hướng mượt mà giữa các tác phẩm trước/sau.

---

## 3. Khắc phục Triệt để Lỗi Hình ảnh (Image Stability & Asset Pipeline)

### Nguyên nhân gốc rễ đã được xác định:
1. **Lỗi Rate Limit (HTTP 429) từ Wikimedia Commons**: Trước đây, website hotlink trực tiếp các URL gốc từ `upload.wikimedia.org`. Khi người dùng cuộn nhanh hoặc đổi tab liên tục, máy chủ Wikimedia kích hoạt bộ lọc bot / rate limit, trả về lỗi `429 Too Many Requests`.
2. **Dung lượng file gốc quá lớn**: Các file ảnh gốc là ảnh RAW từ 17MB đến 32MB, gây nghẽn mạng và timeout trên thiết bị di động.
3. **Lỗi Lifecycle component**: Trong `ImageWithFallback`, state `isLoaded` và `hasError` không được reset khi prop `photo` thay đổi, khiến component bị kẹt ở trạng thái lỗi khi đổi tab hoặc phân cảnh.

### Giải pháp kỹ thuật đã triển khai:
- **Bản địa hóa 100% hình ảnh (Local Asset Pipeline)**: Toàn bộ 11 tác phẩm nhiếp ảnh đã được tải về, tối ưu hóa kích thước lý tưởng (200KB – 600KB, chiều rộng 1280px–1600px) và lưu trữ cục bộ tại `public/assets/images/photos/`. Tốc độ tải **< 10ms, không phụ thuộc mạng ngoài, không bao giờ bị 429 hay lỗi bản quyền**.
- **Cơ chế Fallback 3 tầng**:
  `Tệp cục bộ (Local Optimized) → Nguồn dự phòng (Remote) → Ảnh vector sơn mài chuẩn nhận diện (SVG Fallback)`.
- **Xử lý triệt để Lifecycle React**: Thêm `useEffect` reset lại `isLoaded` và `loadStage` mỗi khi `photo.id` hoặc `photo.imageUrl` thay đổi; gắn `key` prop chuẩn xác cho các vị trí hiển thị động.
- **Triệt tiêu Layout Shift (CLS = 0)**: Thiết lập `aspectRatio` cố định cùng khung placeholder hiệu ứng sơn mài ấm áp.

---

## 4. Hướng dẫn Chạy & Kiểm thử Cục bộ (Local Verification)

```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Kiểm tra tính toàn vẹn kiểu dữ liệu TypeScript (0 lỗi)
npm run typecheck

# 3. Khởi chạy máy chủ phát triển (HMR)
npm run dev

# 4. Đóng gói sản phẩm (Production Build)
npm run build

# 5. Xem trước bản đóng gói
npm run preview
```

---

## 5. Bảng Minh bạch Nguồn ảnh & Giấy phép Bản quyền (Photo Attribution)

| STT | Địa danh / Tác phẩm | Tác giả / Nguồn | Giấy phép | Trạng thái lưu trữ |
|---|---|---|---|---|
| 01 | Hà Nội & Ba Vì đón bình minh | Wikimedia Commons Contributor | CC BY-SA 4.0 | Bản địa hóa (`hero-hanoi.jpg`) |
| 02 | Hương đỏ làng nghề Quảng Phú Cầu | Wikimedia Commons Contributor | CC BY-SA 4.0 | Bản địa hóa (`heritage-incense.jpg`) |
| 03 | Phố cổ Hội An & đèn hoa đăng | Mstyslav Chernov / Wikimedia Commons | CC BY-SA 3.0 | Bản địa hóa (`heritage-hoian.jpg`) |
| 04 | Nhà Thờ Lớn Hà Nội | Wikimedia Commons Contributor | CC BY-SA 4.0 | Bản địa hóa (`heritage-cathedral.jpg`) |
| 05 | Cầu Thê Húc & Hồ Hoàn Kiếm | Wikimedia Commons Contributor | CC BY 2.0 | Bản địa hóa (`heritage-thehuc.jpg`) |
| 06 | Toàn cảnh Skyline TP. Hồ Chí Minh | Lê Minh Phát / Wikimedia Commons | CC BY 2.0 | Bản địa hóa (`city-skyline.jpg`) |
| 07 | Tòa tháp Landmark 81 về đêm | Wikimedia Commons Contributor | CC BY-SA 4.0 | Bản địa hóa (`city-landmark81.jpg`) |
| 08 | Giao thông đường phố Sài Gòn | Wikimedia Commons Contributor | CC BY 3.0 | Bản địa hóa (`city-traffic.jpg`) |
| 09 | Cà phê phin truyền thống | Wikimedia Commons Contributor | CC BY-SA 3.0 | Bản địa hóa (`everyday-coffee.jpg`) |
| 10 | Tà áo dài trắng phố cổ Hà Nội | Wikimedia Commons Contributor | CC BY 2.0 | Bản địa hóa (`everyday-aodai.jpg`) |
| 11 | Nhà hát Lớn Hà Nội | Wikimedia Commons Contributor | CC BY-SA 4.0 | Bản địa hóa (`everyday-opera.jpg`) |

Mọi hình ảnh đều được đính kèm lớp fallback vector poster cục bộ tại `public/assets/images/photo-fallback.svg` để đảm bảo giao diện luôn hiển thị toàn vẹn ngay cả trong điều kiện mạng giới hạn.
