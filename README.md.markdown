# MOTION-LAB — VIETNAM: WHERE HERITAGE MEETS MOTION

> **Vietnamese Contemporary Culture × Cinematic GSAP Experience**  
> An independent digital exhibition crafted by **0Cuong**.

- **Official Repository**: [https://github.com/0Cuong/MOTION-LAB](https://github.com/0Cuong/MOTION-LAB)
- **Official Facebook**: [https://www.facebook.com/share/19kRK8AiuD/?mibextid=wwXIfr](https://www.facebook.com/share/19kRK8AiuD/?mibextid=wwXIfr)

---

## 1. Vision & Art Direction

MOTION-LAB is an immersive digital motion showcase celebrating contemporary Vietnamese culture, heritage architecture, and modern urban kinetic energy. Rather than a standard SaaS landing page, it is designed as an editorial exhibition where **GSAP (GreenSock Animation Platform)** serves as the primary visual storytelling instrument.

### Bảng màu (Color Palette)
- **Warm Ivory (`#F4F0E8`)**: Nền sáng thanh lịch cho các phân cảnh đời thường (Scene 04).
- **Deep Charcoal (`#151515`)**: Nền tối điện ảnh làm bật chiều sâu thị giác (Scenes 01, 02, 03, 05, 06).
- **Vietnamese Lacquer Red (`#B52B26`)**: Điểm nhấn sắc đỏ sơn mài truyền thống cho các chi tiết cốt lõi, đường kẻ và nút tương tác.
- **Muted Gold (`#B69A62`)**: Sắc vàng hoàng kim lắng đọng thời gian cho nhãn phân loại, toạ độ và metadata.
- **Concrete Grey (`#85847F`)**: Màu bê tông đô thị trung tính cho chú thích EXIF và thông số kỹ thuật.

### Typography System
- **Display Headlines**: 'Playfair Display', 'Cormorant Garamond' (serif cổ điển kết hợp tương phản hiện đại, hỗ trợ tiếng Việt đầy đủ).
- **Body Text**: 'Plus Jakarta Sans', 'Be Vietnam Pro' (sans-serif đương đại, độ tương phản cao, tối ưu khả năng đọc).
- **Technical & EXIF Data**: 'DM Mono', 'Space Mono' (monospace sắc nét cho toạ độ địa lý, thông số màn trập và nhãn phân cảnh).

---

## 2. Visual Storyline (6 Cinematic Scenes)

### Scene 01 — Cinematic Opening (Mở màn điện ảnh)
- Tác phẩm nhiếp ảnh: **Chân trời Hà Nội & dãy Ba Vì đón bình minh** (21°01'42.6"N 105°51'15.5"E).
- Animation: Màn trập đa giác mở rộng (`clip-path: polygon(...)`), kinetic split-text reveal theo nhịp, parallax đa tầng theo cuộn chuột.
- Chức năng: Phát lại hiệu ứng mở màn (Replay Intro) và chỉ báo cuộn trang trực quan.

### Scene 02 — Heritage, Still Alive (Di sản trường tồn)
- Bố cục editorial bất đối xứng kết hợp 4 bức ảnh di sản:
  1. *Làng nghề hương đỏ Quảng Phú Cầu, Ứng Hòa, Hà Nội* (CC BY-SA 4.0).
  2. *Đêm hoa đăng sông Hoài, phố cổ Hội An* (CC BY-SA 3.0, Mstyslav Chernov).
  3. *Nhà Thờ Lớn Hà Nội — Dấu ấn Gothic thời Pháp cổ* (CC BY-SA 4.0).
  4. *Cầu Thê Húc đỏ son soi bóng Hồ Hoàn Kiếm* (CC BY 2.0).
- Animation: `clip-path` reveal theo chiều dọc/ngang khi cuộn vào tầm nhìn, text-mask reveal, parallax tốc độ khác nhau.

### Scene 03 — The Modern City (Nhịp thở đô thị đương đại)
- Nhịp sống sôi động của TP. Hồ Chí Minh:
  1. *Skyline ven sông Sài Gòn* (Lê Minh Phát, CC BY 2.0).
  2. *Tháp Landmark 81 cao 461.2 mét* (CC BY-SA 4.0).
  3. *Dòng chảy xe máy & động mạch giao thông Sài Gòn* (CC BY 3.0).
- Animation: Dải horizontal narrative pinning trên desktop qua `ScrollTrigger.create({ pin: true, scrub: 1 })`, chuyển đổi linh hoạt sang dạng thẻ cuộn dọc trên mobile; bộ đếm số liệu động (stat counters) tăng mượt mà.

### Scene 04 — Everyday Vietnam (Khoảnh khắc đời thường)
- Khoảng nghỉ thị giác ấm áp với gam màu Warm Ivory (`#F4F0E8`):
  1. *Cà phê phin truyền thống — Nghệ thuật của sự kiên nhẫn* (Saigon & Hanoi cafe culture).
  2. *Tà áo dài trắng trong gió phố Hà Nội* (Quốc phục truyền thống).
  3. *Nhà hát Lớn Hà Nội trong ánh tà dương*.
- Chức năng: Interactive focal showcase cho phép người xem chọn từng khoảnh khắc đời thường và khám phá câu chuyện văn hóa cùng thông số ống kính EXIF.

### Scene 05 — Motion Playground (Phòng thí nghiệm GSAP)
- Năm bài thực hành animation engineering có thể tương tác trực tiếp:
  1. **Polygonal Clip-Path Reveal**: Màn trập camera mở góc đa giác với `power4.out`.
  2. **3D Spatial Parallax & Tilt**: Tương tác con trỏ 3D tilt theo góc nhìn thực qua `gsap.quickTo()` và độ sâu trục Z.
  3. **Kinetic Typography Wave**: Từng ký tự tiếng Việt bung xòe với `elastic.out` ease và stagger đối xứng từ tâm.
  4. **Magnetic Cursor Force**: Lưới nam châm phản hồi vị trí con trỏ theo định luật khoảng cách suy giảm.
  5. **Split Curtain Wipe**: Hiệu ứng kéo rèm sơn mài đối xứng hai vạt lụa qua `expo.inOut`.
- Tầng nền điêu khắc không gian: Three.js ambient sculpture với tông màu vàng đồng hoàng kim và đỏ sơn mài ấm áp.

### Scene 06 — Developer Signature (Dấu ấn tác giả 0Cuong)
- Nhận diện thương hiệu cá nhân của **0Cuong**:
  - MOTION-LAB
  - Crafted by 0Cuong
  - Independent GSAP motion experiment.
  - Facebook: [https://www.facebook.com/share/19kRK8AiuD/?mibextid=wwXIfr](https://www.facebook.com/share/19kRK8AiuD/?mibextid=wwXIfr)
  - GitHub: [https://github.com/0Cuong/MOTION-LAB](https://github.com/0Cuong/MOTION-LAB)
- Nút "Trở về đầu trang" cuộn mượt bằng GSAP `ScrollToPlugin`.
- Bảng tra cứu nguồn ảnh & giấy phép bản quyền (Credits Modal) minh bạch toàn bộ 10 tác phẩm nhiếp ảnh từ Wikimedia Commons.

---

## 3. Tech Stack & Engineering

- **React 19 & TypeScript 5.8**: Kiến trúc component phân tách sạch sẽ, typing nghiêm ngặt.
- **GSAP 3.15 (@gsap/react, ScrollTrigger, ScrollToPlugin)**: Công cụ điều phối chuyển động, quản lý lifecycle với `useGSAP` và cleanup tự động.
- **Three.js**: Lớp trang trí điêu khắc ánh sáng nền nhẹ, tự động tối ưu tài nguyên và tự hủy GPU geometry/material khi unmount.
- **CSS Architecture**: CSS Custom Properties, Responsive Media Queries (375px, 430px, 768px, 1440px, 1920px), hỗ trợ `prefers-reduced-motion`.
- **Vite & Vercel**: Tương thích hoàn toàn với quy trình build tĩnh và preview deployments.

---

## 4. Run Locally & Verification

```bash
# Cài đặt thư viện (môi trường có kết nối registry)
npm install

# Kiểm tra kiểu dữ liệu TypeScript
npm run typecheck

# Chạy server phát triển (HMR)
npm run dev

# Đóng gói sản phẩm (Production build)
npm run build
```

---

## 5. Photo Attribution & License Table

| STT | Địa danh / Tác phẩm | Tác giả / Nguồn | Giấy phép |
|---|---|---|---|
| 01 | Hà Nội & Ba Vì đón bình minh | Wikimedia Commons Contributor | CC BY-SA 4.0 |
| 02 | Làng nghề hương Quảng Phú Cầu | Wikimedia Commons Contributor | CC BY-SA 4.0 |
| 03 | Phố cổ Hội An & đèn hoa đăng | Mstyslav Chernov / Wikimedia Commons | CC BY-SA 3.0 |
| 04 | Nhà Thờ Lớn Hà Nội | Wikimedia Commons Contributor | CC BY-SA 4.0 |
| 05 | Cầu Thê Húc & Hồ Hoàn Kiếm | Wikimedia Commons Contributor | CC BY 2.0 |
| 06 | Toàn cảnh Skyline TP. Hồ Chí Minh | Lê Minh Phát / Wikimedia Commons | CC BY 2.0 |
| 07 | Tòa tháp The Landmark 81 về đêm | Wikimedia Commons Contributor | CC BY-SA 4.0 |
| 08 | Giao thông đường phố Sài Gòn | Wikimedia Commons Contributor | CC BY 3.0 |
| 09 | Cà phê phin truyền thống Sài Gòn | Wikimedia Commons Contributor | CC BY-SA 3.0 |
| 10 | Tà áo dài trắng phố cổ Hà Nội | Wikimedia Commons Contributor | CC BY 2.0 |
| 11 | Nhà hát Lớn Hà Nội | Wikimedia Commons Contributor | CC BY-SA 4.0 |

Mọi hình ảnh đều được đính kèm lớp fallback vector poster cục bộ tại `public/assets/images/` để đảm bảo giao diện luôn hiển thị toàn vẹn ngay cả trong điều kiện mạng giới hạn.
