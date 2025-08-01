document.addEventListener('DOMContentLoaded', function() {
    // 导航栏高亮当前部分
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav ul li');
    
    // 平滑滚动到锚点
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
            
            // 更新URL但不跳转
            history.pushState(null, null, targetId);
        });
    });
    
    // 滚动时更新导航栏高亮
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('a').getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-level');
    
    // 初始状态：所有技能条宽度为0
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        // 存储目标宽度为自定义属性
        bar.setAttribute('data-width', targetWidth);
    });
    
    // 检测元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // 滚动时检测并触发动画
    function handleScroll() {
        const skillsSection = document.getElementById('skills');
        
        if (isInViewport(skillsSection)) {
            // 触发技能条动画
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = targetWidth;
            });
            
            // 动画只需触发一次，移除滚动监听
            window.removeEventListener('scroll', handleScroll);
        }
    }
    
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll);
    
    // 页面加载时也检查一次（如果技能部分已在视口中）
    handleScroll();
    
    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});