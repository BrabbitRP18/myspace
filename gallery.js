document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    let currentSlide = 0;
    
    // 创建导航点
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.gallery-dot');
    
    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }
    
    // 添加按钮事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 添加键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // 自动播放
    let autoplay = setInterval(nextSlide, 5000);
    
    // 鼠标悬停时暂停自动播放
    const slider = document.querySelector('.gallery-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.addEventListener('mouseleave', () => {
        autoplay = setInterval(nextSlide, 5000);
    });
}); 