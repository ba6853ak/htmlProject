const noticeItems = document.getElementById('noticeItems');
        const upArrow = document.getElementById('upArrow');
        const downArrow = document.getElementById('downArrow');

        let currentIndex = 0;
        const totalNotices = document.querySelectorAll('.notice-item').length;
        const itemHeight = 60; // 각 공지 항목의 높이

        function scrollNotices(direction) {
            if (direction === 'up') {
                currentIndex = (currentIndex === 0) ? totalNotices - 1 : currentIndex - 1;
            } else if (direction === 'down') {
                currentIndex = (currentIndex === totalNotices - 1) ? 0 : currentIndex + 1;
            }
            noticeItems.style.top = `-${currentIndex * itemHeight}px`;
        }

        upArrow.addEventListener('click', () => scrollNotices('up'));
        downArrow.addEventListener('click', () => scrollNotices('down'));

        // 3초마다 자동 스크롤
        setInterval(() => scrollNotices('down'), 3000);
        let currentSlideIndex = 0;
        let autoSlideInterval;

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                moveSlide(1);
            }, 5000);
        }

        function moveSlide(direction) {
            const slides = document.querySelector('.slider');
            const totalSlides = 4;

            currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
            slides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            updateDots();
        }

        function currentSlide(index) {
            currentSlideIndex = index;
            const slides = document.querySelector('.slider');
            slides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            updateDots();
        }

        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlideIndex);
            });
        }

        window.onload = function () {
            updateDots();
            startAutoSlide();
        };

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        document.querySelector('.controls').addEventListener('click', resetAutoSlide);
        document.querySelector('.dots').addEventListener('click', resetAutoSlide);