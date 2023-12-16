let currentSlide = 0;

        function showSlide(index) {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            const offset = -currentSlide * 100 + '%';
            slider.style.transform = 'translateX(' + offset + ')';
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // 自动播放，每隔3000毫秒（3秒）切换一张图片
        setInterval(nextSlide, 3000);