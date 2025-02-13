// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // 更新轮播点状态
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // 初始化所有功能
    if (slides.length > 0) {
        startSlideshow();
    }

    // 聊天功能

    // 回到顶部按钮
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 2) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加轮播图点击控制
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderDots = document.querySelector('.slider-dots');

    // 只有当所有元素都存在时才初始化轮播图
    if (slides.length > 0 && prevBtn && nextBtn && sliderDots) {
        // 创建轮播点
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
            sliderDots.appendChild(dot);
        });

        // 添加前后按钮事件
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        // 鼠标悬停时暂停轮播
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlideshow);
            sliderContainer.addEventListener('mouseleave', startSlideshow);
        }
    }

    // 初始化联系方式点击复制
    const contactItems = document.querySelectorAll('.contact-dropdown-content .contact-item');
    if (contactItems.length > 0) {
        contactItems.forEach(item => {
            item.addEventListener('click', function() {
                const text = this.querySelector('p').textContent;
                navigator.clipboard.writeText(text).then(() => {
                    // 创建提示元素
                    const tooltip = document.createElement('div');
                    tooltip.className = 'copy-tooltip';
                    tooltip.textContent = '已复制到剪贴板';
                    document.body.appendChild(tooltip);

                    // 3秒后移除提示
                    setTimeout(() => {
                        tooltip.remove();
                    }, 3000);
                });
            });
        });
    }

    // 相册预览轮播
    function initGalleryPreview() {
        const slides = document.querySelectorAll('.gallery-preview-slide');
        const prevBtn = document.querySelector('.gallery-preview-prev');
        const nextBtn = document.querySelector('.gallery-preview-next');
        const dotsContainer = document.querySelector('.gallery-preview-dots');
        
        let currentSlide = 0;
        
        // 创建导航点
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('gallery-preview-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.gallery-preview-dot');
        
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
        
        // 自动播放
        let autoplay = setInterval(nextSlide, 5000);
        
        // 鼠标悬停时暂停自动播放
        const slider = document.querySelector('.gallery-preview-slider');
        slider.addEventListener('mouseenter', () => clearInterval(autoplay));
        slider.addEventListener('mouseleave', () => {
            autoplay = setInterval(nextSlide, 5000);
        });
    }

    // 初始化相册预览
    const gallerySlider = document.querySelector('.gallery-preview-slider');
    if (gallerySlider) {
        initGalleryPreview();
    }

    // AI 聊天功能
    function initAIChat() {
        const chatContainer = document.getElementById('chat-container');
        const chatMessages = document.querySelector('.chat-messages');
        const chatToggle = document.getElementById('chat-toggle');
        const sendButton = document.querySelector('.send-message');
        const chatInput = document.querySelector('.chat-input');
        const closeChat = document.querySelector('.close-chat');

        // 保存对话历史
        let messageHistory = [
            { role: "system", content: "你是A4的小跟班，一个友好、活泼的AI助手。你的回答应该简洁、友好，带有一些可爱的语气。" }
        ];

        // 添加消息到聊天界面
        function addMessageToChat(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
            messageDiv.textContent = content;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // 更新对话历史
            messageHistory.push({
                role: isUser ? "user" : "assistant",
                content: content
            });
            
            // 保持历史记录在合理范围内
            if (messageHistory.length > 10) {
                messageHistory = [
                    messageHistory[0],
                    ...messageHistory.slice(-9)
                ];
            }
        }

        async function sendMessage(message) {
            try {
                const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer sk-tiouivfajsthfhucflhlcqefnrjmfzsbexdrcxgkfpmoffcm",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "deepseek-ai/DeepSeek-V3",
                        messages: messageHistory,
                        temperature: 0.8,
                        max_tokens: 1000
                    })
                });

                if (!response.ok) {
                    throw new Error("API请求失败");
                }

                const data = await response.json();
                return data.choices[0].message.content;
            } catch (error) {
                console.error("发送消息错误:", error);
                return "抱歉，我遇到了一些问题，请稍后再试。";
            }
        }

        // 绑定事件
        if (chatToggle) {
            chatToggle.addEventListener('click', () => {
                if (chatContainer) {
                    chatContainer.classList.toggle('hidden');
                    // 如果是第一次打开，显示欢迎消息
                    if (!chatContainer.classList.contains('hidden') && 
                        chatMessages && 
                        chatMessages.children.length === 0) {
                        addMessageToChat("你好呀！我是A4的小跟班，有什么我可以帮你的吗？");
                    }
                }
            });
        }

        if (closeChat) {
            closeChat.addEventListener('click', () => {
                if (chatContainer) {
                    chatContainer.classList.add('hidden');
                }
            });
        }

        if (sendButton && chatInput) {
            sendButton.addEventListener('click', async () => {
                const message = chatInput.value.trim();
                if (message) {
                    addMessageToChat(message, true);
                    chatInput.value = '';
                    
                    // 显示加载状态
                    const loadingDiv = document.createElement('div');
                    loadingDiv.className = 'chat-message ai-message loading';
                    loadingDiv.textContent = '思考中...';
                    chatMessages.appendChild(loadingDiv);
                    
                    try {
                        const response = await sendMessage(message);
                        loadingDiv.remove();
                        addMessageToChat(response);
                    } catch (error) {
                        loadingDiv.remove();
                        addMessageToChat("抱歉，我遇到了一些问题，请稍后再试。");
                    }
                }
            });

            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendButton.click();
                }
            });
        }

        // 监听滚动显示聊天按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                chatToggle.classList.add('show');
            } else {
                chatToggle.classList.remove('show');
                if (chatContainer && !chatContainer.classList.contains('hidden')) {
                    chatContainer.classList.add('hidden');
                }
            }
        });
    }

    // 初始化 AI 聊天
    initAIChat();

    // 头像滚动缩放效果
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const triggerPoint = 100; // 开始缩放的滚动位置
            
            if (scrolled > triggerPoint) {
                const scale = Math.min(1.3, 1 + (scrolled - triggerPoint) / 500); // 最大放大到1.3倍
                const rotate = Math.min(10, (scrolled - triggerPoint) / 20); // 添加轻微旋转
                avatar.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
                avatar.style.opacity = Math.min(1, scale);
            } else {
                avatar.style.transform = 'scale(1) rotate(0deg)';
                avatar.style.opacity = 1;
            }
        });
    }

    // 监听滚动显示简介区域
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
        window.addEventListener('scroll', () => {
            const sectionTop = introSection.offsetTop;
            const windowBottom = window.scrollY + window.innerHeight;
            
            // 当页面滚动到简介区域时显示
            if (windowBottom > sectionTop + 100) { // 添加100px的偏移，使效果更自然
                introSection.classList.add('visible');
            }
        });
    }

    // 添加 logo 点击事件
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            // 检查当前页面
            if (window.location.pathname.includes('workplace.html')) {
                window.location.href = 'index.html';
            } else {
                window.location.href = 'workplace.html';
            }
        });
    }

    // 初始化轮播图
    function initSlider() {
        const dots = document.querySelectorAll('.slider-dot');
        const slides = document.querySelectorAll('.slider-item');
        
        if (!dots.length || !slides.length) return;

        // 设置自动轮播
        let currentSlide = 0;
        const autoSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider(currentSlide);
        };

        let slideInterval = setInterval(autoSlide, 5000);

        // 点击切换
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                updateSlider(index);
                slideInterval = setInterval(autoSlide, 5000);
            });
        });

        // 更新轮播状态
        function updateSlider(index) {
            dots.forEach(d => d.classList.remove('active'));
            slides.forEach(s => s.classList.remove('active'));
            dots[index].classList.add('active');
            slides[index].classList.add('active');
            currentSlide = index;
        }
    }

    // 调用初始化
    initSlider();
}); 