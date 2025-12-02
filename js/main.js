// 云服务器折扣信息聚合网站 - 主要JavaScript功能

// 模拟折扣数据
const discountData = [
    {
        id: 1,
        provider: '阿里云',
        providerKey: 'aliyun',
        title: '新用户专享云服务器',
        description: '1核2G云服务器，1年仅需99元，适合个人开发者和小项目',
        originalPrice: '299元',
        discountPrice: '99元',
        discount: '3.3折',
        link: 'https://www.aliyun.com',
        validUntil: '2023-12-31',
        category: '云服务器'
    },
    {
        id: 2,
        provider: '腾讯云',
        providerKey: 'tencent',
        title: '轻量应用服务器',
        description: '2核4G轻量服务器，3年仅需588元，企业上云首选',
        originalPrice: '1200元',
        discountPrice: '588元',
        discount: '4.9折',
        link: 'https://cloud.tencent.com',
        validUntil: '2023-11-30',
        category: '云服务器'
    },
    {
        id: 3,
        provider: '华为云',
        providerKey: 'huawei',
        title: '弹性云服务器特惠',
        description: '4核8G ECS，配置灵活，性能稳定，适合中大型项目',
        originalPrice: '2500元',
        discountPrice: '1299元',
        discount: '5.2折',
        link: 'https://www.huaweicloud.com',
        validUntil: '2023-12-15',
        category: '云服务器'
    },
    {
        id: 4,
        provider: 'UCloud',
        providerKey: 'ucloud',
        title: '云主机优惠套餐',
        description: '2核4G云主机，性价比之选，新用户专享优惠',
        originalPrice: '800元',
        discountPrice: '399元',
        discount: '5折',
        link: 'https://www.ucloud.cn',
        validUntil: '2023-11-20',
        category: '云服务器'
    }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载最新折扣信息
    loadLatestDiscounts();
    
    // 设置轮播图自动播放
    const carouselElement = document.getElementById('mainCarousel');
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            wrap: true
        });
    }
});

// 加载最新折扣信息
function loadLatestDiscounts() {
    const container = document.getElementById('latestDiscounts');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 显示最新的4个折扣信息
    const latestDiscounts = discountData.slice(0, 4);
    
    latestDiscounts.forEach(discount => {
        const discountCard = createDiscountCard(discount);
        container.appendChild(discountCard);
    });
}

// 创建折扣卡片元素
function createDiscountCard(discount) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-3';
    card.innerHTML = `
        <div class="card discount-card h-100">
            <div class="card-body">
                <span class="discount-provider provider-${discount.providerKey}">${discount.provider}</span>
                <h5 class="discount-title">${discount.title}</h5>
                <p class="discount-description">${discount.description}</p>
                <div class="discount-price">
                    <span class="current-price">¥${discount.discountPrice}</span>
                    <span class="discount-original-price">¥${discount.originalPrice}</span>
                </div>
                <div class="mt-2">
                    <span class="badge bg-danger">${discount.discount} 折扣</span>
                    <small class="text-muted d-block mt-1">有效期至: ${discount.validUntil}</small>
                </div>
            </div>
            <div class="card-footer">
                <a href="${discount.link}" class="btn btn-primary w-100" target="_blank">立即购买</a>
            </div>
        </div>
    `;
    
    return card;
}

// 根据云服务商加载特定折扣信息的函数
function loadProviderDiscounts(providerKey) {
    const filteredDiscounts = discountData.filter(discount => discount.providerKey === providerKey);
    return filteredDiscounts;
}

// 搜索功能
function searchDiscounts(query) {
    if (!query) return discountData;
    
    return discountData.filter(discount => 
        discount.title.toLowerCase().includes(query.toLowerCase()) ||
        discount.description.toLowerCase().includes(query.toLowerCase()) ||
        discount.provider.toLowerCase().includes(query.toLowerCase())
    );
}

// 获取特定提供商的折扣信息（用于提供商页面）
function getProviderPageContent(providerKey) {
    const providerNames = {
        'aliyun': '阿里云',
        'tencent': '腾讯云',
        'huawei': '华为云',
        'ucloud': 'UCloud'
    };
    
    const providerName = providerNames[providerKey];
    const providerDiscounts = loadProviderDiscounts(providerKey);
    
    let content = `<h2>${providerName} 优惠活动</h2>`;
    content += '<div class="row">';
    
    providerDiscounts.forEach(discount => {
        content += `
            <div class="col-md-6 col-lg-4">
                <div class="card discount-card h-100">
                    <div class="card-body">
                        <h5 class="discount-title">${discount.title}</h5>
                        <p class="discount-description">${discount.description}</p>
                        <div class="discount-price">
                            <span class="current-price">¥${discount.discountPrice}</span>
                            <span class="discount-original-price">¥${discount.originalPrice}</span>
                        </div>
                        <div class="mt-2">
                            <span class="badge bg-danger">${discount.discount} 折扣</span>
                            <small class="text-muted d-block mt-1">有效期至: ${discount.validUntil}</small>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="${discount.link}" class="btn btn-primary w-100" target="_blank">立即购买</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    content += '</div>';
    return content;
}