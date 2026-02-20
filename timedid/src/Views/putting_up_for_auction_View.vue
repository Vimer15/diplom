<template>
    <div class="auction-creation-page">
        <!-- Шапка -->
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <div class="header-left">
                        <button class="back-button" @click="$router.push('/profile')">
                            <i class="fas fa-arrow-left"></i> Вернуться в профиль
                        </button>
                    </div>
                    <div class="header-center">
                        <a href="#" class="logo">
                            <i class="fas fa-stopwatch logo-icon"></i>
                            Timedid
                        </a>
                    </div>
                    <div class="header-right">
                        <div class="user-info">
                            <span class="user-name">Иванов И.И.</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Основное содержимое -->
        <div class="container">
            <div class="main-content">
                
                
                <!-- Форма создания аукциона -->
                <div class="auction-form-container">
                    <!-- Левая часть: Форма -->
                    <div class="form-section">
                        <!-- Основная информация -->
                        <div class="section-title">
                            <i class="fas fa-info-circle section-icon"></i>
                            Основная информация
                        </div>

                        <div class="form-group">
                            <label class="form-label required">Название лота</label>
                            <input type="text" class="form-input" placeholder="Например: Apple MacBook Pro 2022">
                            <div class="form-hint">
                                <i class="fas fa-lightbulb hint-icon"></i>
                                Короткое и понятное название привлечет больше покупателей
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label required">Категория</label>
                            <div class="select-wrapper">
                                <select class="form-select">
                                    <option value="">Выберите категорию</option>
                                    <option value="electronics">Электроника</option>
                                    <option value="real-estate">Недвижимость</option>
                                    <option value="cars">Автомобили</option>
                                    <option value="antiques">Антиквариат</option>
                                    <option value="collectibles">Коллекционные предметы</option>
                                    <option value="home">Для дома</option>
                                    <option value="clothing">Одежда и аксессуары</option>
                                    <option value="other">Другое</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label required">Описание товара</label>
                            <textarea class="form-input form-textarea" placeholder="Опишите товар подробно: состояние, характеристики, особенности..."></textarea>
                            <div class="form-hint">
                                <i class="fas fa-lightbulb hint-icon"></i>
                                Чем подробнее описание, тем выше доверие покупателей
                            </div>
                        </div>

                        <!-- Изображения -->
                        <div class="section-title section-margin">
                            <i class="fas fa-images section-icon"></i>
                            Фотографии товара
                        </div>

                        <div class="image-upload-area">
                            <i class="fas fa-cloud-upload-alt upload-icon"></i>
                            <div class="upload-text">Перетащите сюда фотографии или нажмите для выбора</div>
                            <div class="upload-hint">До 10 изображений в формате JPG, PNG (максимум 5 МБ каждое)</div>
                        </div>

                        <div class="preview-images">
                            <div class="preview-image">
                                <div class="image-placeholder">
                                    <i class="fas fa-camera"></i>
                                </div>
                            </div>
                            <div class="preview-image">
                                <div class="image-placeholder">
                                    <i class="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Параметры торгов -->
                        <div class="section-title section-margin">
                            <i class="fas fa-cog section-icon"></i>
                            Параметры торгов
                        </div>

                        <div class="auction-params">
                            <div class="param-card">
                                <div class="param-title">
                                    <i class="fas fa-ruble-sign param-icon"></i>
                                    Стартовая цена
                                </div>
                                <input type="number" class="form-input" placeholder="0" min="0" step="100">
                                <div class="form-hint small-margin">
                                    Минимальная цена, с которой начнутся торги
                                </div>
                            </div>

                            <div class="param-card">
                                <div class="param-title">
                                    <i class="fas fa-arrow-up param-icon"></i>
                                    Шаг ставки
                                </div>
                                <input type="number" class="form-input" placeholder="100" min="10" step="10">
                                <div class="form-hint small-margin">
                                    Минимальное увеличение ставки
                                </div>
                            </div>
                        </div>

                        <div class="auction-params params-margin">
                            <div class="param-card">
                                <div class="param-title">
                                    <i class="fas fa-clock param-icon"></i>
                                    Длительность торгов
                                </div>
                                <div class="select-wrapper">
                                    <select class="form-select">
                                        <option value="24">24 часа</option>
                                        <option value="48">2 дня</option>
                                        <option value="72" selected>3 дня</option>
                                        <option value="168">7 дней</option>
                                        <option value="336">14 дней</option>
                                    </select>
                                </div>
                            </div>

                            <div class="param-card">
                                <div class="param-title">
                                    <i class="fas fa-calendar-alt param-icon"></i>
                                    Дата начала
                                </div>
                                <input type="datetime-local" class="form-input">
                                <div class="form-hint small-margin">
                                    Торги начнутся в указанное время
                                </div>
                            </div>
                        </div>

                        <!-- Дополнительные параметры -->
                        <div class="section-title section-margin">
                            <i class="fas fa-sliders-h section-icon"></i>
                            Дополнительные параметры
                        </div>

                        <div class="form-group">
                            <div class="checkbox-group">
                                <input type="checkbox" id="auto-extend" class="checkbox-input" checked>
                                <label for="auto-extend" class="checkbox-label">
                                    Автопродление торгов при ставках в последние 5 минут
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="buyout" class="checkbox-input">
                                <label for="buyout" class="checkbox-label">
                                    Разрешить мгновенный выкуп (Buy It Now)
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="reserve" class="checkbox-input">
                                <label for="reserve" class="checkbox-label">
                                    Установить резервную цену (минимальную для продажи)
                                </label>
                            </div>
                        </div>

                        <!-- Кнопки действий -->
                        <div class="form-actions">
                            <button class="cancel-button" @click="$router.push('/auctions')">
                                Отмена
                            </button>
                            <button class="submit-button">
                                <i class="fas fa-rocket"></i> Начать торги
                            </button>
                        </div>
                    </div>

                    <!-- Правая часть: Предпросмотр -->
                    <div class="preview-section">
                        <h3 class="preview-title">Предпросмотр лота</h3>

                        <div class="preview-card">
                            <div class="preview-image-placeholder">
                                <i class="fas fa-box-open preview-icon"></i>
                            </div>
                            
                            <div class="preview-item-title">
                                Ваш товар будет выглядеть так
                            </div>
                            
                            <div class="preview-item-desc">
                                Здесь будет отображаться описание товара, которое вы укажете в форме слева.
                            </div>
                            
                            <div class="preview-details">
                                <span class="preview-detail">Категория</span>
                                <span class="preview-detail">Старт: 0 ₽</span>
                                <span class="preview-detail">3 дня</span>
                            </div>
                            
                            <div class="auction-status">
                                <i class="fas fa-clock"></i> Торги начнутся по расписанию
                            </div>
                        </div>

                        <div class="preview-card">
                            <h4 class="preview-subtitle">
                                <i class="fas fa-check-circle success-icon"></i> Советы для успешных торгов:
                            </h4>
                            <ul class="tips-list">
                                <li>Добавьте качественные фотографии со всех ракурсов</li>
                                <li>Честно опишите состояние и недостатки товара</li>
                                <li>Установите реалистичную стартовую цену</li>
                                <li>Укажите точные сроки доставки</li>
                                <li>Будьте готовы отвечать на вопросы покупателей</li>
                            </ul>
                        </div>

                        <div class="preview-card">
                            <h4 class="preview-subtitle">
                                <i class="fas fa-exclamation-triangle warning-icon"></i> Правила платформы:
                            </h4>
                            <ul class="rules-list">
                                <li>Запрещена продажа запрещенных товаров</li>
                                <li>Товар должен соответствовать описанию</li>
                                <li>Обязательная отправка товара после продажи</li>
                                <li>Комиссия платформы: 5% от финальной цены</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuctionCreationPage',
    mounted() {
        // Подключаем Font Awesome если нет в проекте
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(link);
        }
    }
}
</script>

<style scoped>
/* Сброс и базовые стили для компонента */
.auction-creation-page {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: #f5f7fa;
    color: #212529;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    line-height: 1.5;
}

.auction-creation-page * {
    box-sizing: border-box;
}

/* Контейнер */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Шапка */
.header {
    background: #ffffff;
    border-bottom: 1px solid #e1e5eb;
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.header-left,
.header-center,
.header-right {
    flex: 1;
    display: flex;
    align-items: center;
}

.header-left {
    justify-content: flex-start;
}

.header-center {
    justify-content: center;
}

.header-right {
    justify-content: flex-end;
}

/* Кнопка возврата в шапке */
.back-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: #ffffff;
    color: #495057;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    text-decoration: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
    background: #f8f9fa;
    border-color: #28a745;
    color: #28a745;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(40, 167, 69, 0.15);
}

.back-button i {
    font-size: 14px;
}

/* Логотип */
.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 26px;
    font-weight: 800;
    color: #212529;
    text-decoration: none;
    transition: opacity 0.3s;
}

.logo:hover {
    opacity: 0.9;
}

.logo-icon {
    color: #28a745;
    font-size: 28px;
}

.user-name {
    color: #495057;
    font-weight: 600;
    font-size: 16px;
}

/* Основное содержимое */
.main-content {
    padding: 30px 0 50px;
}

/* Заголовок страницы */
.page-header {
    margin-bottom: 35px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e1e5eb;
    text-align: center;
}

.page-title {
    font-size: 32px;
    font-weight: 800;
    color: #212529;
    position: relative;
    display: inline-block;
    padding: 0 20px;
}

.page-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 5px;
    bottom: 5px;
    width: 5px;
    background: linear-gradient(to bottom, #28a745, #20c997);
    border-radius: 3px;
}

/* Форма создания аукциона */
.auction-form-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
}

@media (max-width: 1200px) {
    .auction-form-container {
        grid-template-columns: 1fr;
    }
}

/* Левая часть: Форма */
.form-section {
    background: #ffffff;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e1e5eb;
}

.section-title {
    font-size: 22px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f8f9fa;
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-margin {
    margin-top: 40px;
}

.section-icon {
    color: #28a745;
    font-size: 20px;
    width: 24px;
}

/* Поля формы */
.form-group {
    margin-bottom: 25px;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    color: #495057;
    font-weight: 600;
    font-size: 15px;
}

.form-label.required::after {
    content: ' *';
    color: #dc3545;
}

.form-input {
    width: 100%;
    padding: 14px 16px;
    background: #ffffff;
    border: 2px solid #dee2e6;
    border-radius: 10px;
    color: #212529;
    font-size: 15px;
    transition: all 0.3s;
}

.form-input:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.form-input::placeholder {
    color: #adb5bd;
}

.form-textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.5;
}

/* Загрузка изображений */
.image-upload-area {
    border: 3px dashed #dee2e6;
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    background: #f8f9fa;
    transition: all 0.3s;
    cursor: pointer;
    margin-bottom: 15px;
}

.image-upload-area:hover {
    border-color: #28a745;
    background: #f0f9f0;
}

.upload-icon {
    font-size: 48px;
    color: #6c757d;
    margin-bottom: 15px;
}

.upload-text {
    color: #495057;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
}

.upload-hint {
    color: #6c757d;
    font-size: 14px;
}

.preview-images {
    display: flex;
    gap: 15px;
    margin-top: 15px;
    flex-wrap: wrap;
}

.preview-image {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    background: #e9ecef;
    overflow: hidden;
    border: 2px solid #dee2e6;
}

.image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-size: 24px;
}

/* Селекты */
.select-wrapper {
    position: relative;
}

.select-wrapper::after {
    content: '▼';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    pointer-events: none;
    font-size: 12px;
}

.form-select {
    width: 100%;
    padding: 14px 16px;
    background: #ffffff;
    border: 2px solid #dee2e6;
    border-radius: 10px;
    color: #212529;
    font-size: 15px;
    appearance: none;
    cursor: pointer;
    transition: all 0.3s;
}

.form-select:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

/* Параметры торгов */
.auction-params {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.params-margin {
    margin-top: 20px;
}

@media (max-width: 768px) {
    .auction-params {
        grid-template-columns: 1fr;
    }
}

.param-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #dee2e6;
    transition: all 0.3s;
}

.param-card:hover {
    border-color: #28a745;
    background: #f0f9f0;
}

.param-title {
    font-size: 16px;
    font-weight: 600;
    color: #495057;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.param-icon {
    color: #28a745;
    font-size: 16px;
    width: 18px;
}

/* Чекбоксы */
.checkbox-group {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.checkbox-input {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #28a745;
}

.checkbox-label {
    color: #495057;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
}

/* Правая часть: Предпросмотр */
.preview-section {
    background: #ffffff;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e1e5eb;
    position: sticky;
    top: 100px;
    align-self: start;
}

@media (max-width: 1200px) {
    .preview-section {
        position: static;
    }
}

.preview-title {
    font-size: 20px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f8f9fa;
}

.preview-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.preview-image-placeholder {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.preview-icon {
    font-size: 48px;
    color: #6c757d;
}

.preview-item-title {
    font-size: 18px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 10px;
}

.preview-item-desc {
    color: #495057;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
}

.preview-details {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
}

.preview-detail {
    background: #ffffff;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 13px;
    color: #495057;
    border: 1px solid #dee2e6;
}

.auction-status {
    color: #28a745;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.preview-subtitle {
    color: #495057;
    margin-bottom: 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.success-icon {
    color: #28a745;
}

.warning-icon {
    color: #dc3545;
}

.tips-list,
.rules-list {
    color: #6c757d;
    font-size: 14px;
    line-height: 1.6;
    padding-left: 20px;
}

.tips-list li,
.rules-list li {
    margin-bottom: 8px;
}

.tips-list li:last-child,
.rules-list li:last-child {
    margin-bottom: 0;
}

/* Кнопки действий */
.form-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
    padding-top: 25px;
    border-top: 2px solid #f8f9fa;
}

@media (max-width: 768px) {
    .form-actions {
        flex-direction: column;
    }
}

.submit-button {
    flex: 1;
    padding: 16px;
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.5px;
}

.submit-button:hover {
    background: linear-gradient(135deg, #218838, #1aa179);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

.cancel-button {
    padding: 16px 30px;
    background: #ffffff;
    color: #495057;
    border: 2px solid #dee2e6;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

.cancel-button:hover {
    background: #f8f9fa;
    border-color: #dc3545;
    color: #dc3545;
}

/* Подсказки */
.form-hint {
    font-size: 13px;
    color: #6c757d;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.small-margin {
    margin-top: 8px;
}

.hint-icon {
    color: #28a745;
    font-size: 12px;
}

/* Футер */
.footer {
    background: #ffffff;
    border-top: 2px solid #e1e5eb;
    padding: 25px 0;
    text-align: center;
    color: #6c757d;
    font-size: 15px;
}

/* Адаптивность */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }
    
    .header-content {
        flex-direction: column;
        gap: 15px;
        padding: 10px 0;
    }
    
    .header-left,
    .header-center,
    .header-right {
        width: 100%;
        justify-content: center;
    }
    
    .header-left {
        order: 1;
    }
    
    .header-center {
        order: 0;
    }
    
    .header-right {
        order: 2;
    }
    
    .back-button {
        padding: 8px 16px;
        font-size: 13px;
    }
    
    .logo {
        font-size: 22px;
    }
    
    .page-title {
        font-size: 26px;
    }
    
    .form-section,
    .preview-section {
        padding: 20px;
    }
    
    .section-title {
        font-size: 20px;
    }
    
    .image-upload-area {
        padding: 25px 15px;
    }
    
    .upload-text {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .page-title {
        font-size: 22px;
        padding: 0 10px;
    }
    
    .logo {
        font-size: 20px;
        gap: 8px;
    }
    
    .logo-icon {
        font-size: 24px;
    }
    
    .user-name {
        font-size: 14px;
    }
    
    .back-button {
        padding: 6px 12px;
        font-size: 12px;
    }
}
</style>