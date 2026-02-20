<template>

    <!-- Шапка -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo">
                    <i class="fas fa-stopwatch logo-icon"></i>
                    <div>
                        Timedid
                        <div class="tagline">Ваша ставка — финальная</div>
                    </div>
                </a>
            </div>
        </div>
    </header>

    <!-- Основное содержимое -->
    <div class="container">
        <div class="main-content">
            <!-- Боковая панель -->
            <aside class="sidebar">
                <div class="profile-card">
                    <div class="avatar">КР</div>
                    <div class="user-name">Кушхов Руслан Алимович</div>
                    <div class="user-wallet">
                        <span class="wallet-number">Здесь будет адрес кошелька</span>
                        <button class="wallet-toggle" title="Скрыть/показать">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <nav>
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="#" class="nav-link active">
                                <i class="fas fa-user nav-icon"></i>
                                Профиль
                            </a>
                        </li>
                        <li class="nav-item" @click="goToTorg">
                            <a href="#" class="nav-link">
                                <i class="fas fa-gavel nav-icon"></i>
                                Активные торги
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" >
                                <i class="fas fa-history nav-icon"></i>
                                История ставок
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" @click="GoToSetting()">
                                <i class="fas fa-cog nav-icon"></i>
                                Настройки
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link logout-link">
                                <i class="fas fa-sign-out-alt nav-icon"></i>
                                Выйти из аккаунта
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Основная панель -->
            <main class="main-panel">
                <div class="panel-header">
                    <h1 class="panel-title">Обзор профиля</h1>
                    <a href="#" class="btn">
                        <i class="fas fa-plus"></i> Новый аукцион
                    </a>
                </div>

                <!-- Статистика -->
                <div class="stats-cards">
                    <div class="stat-card">
                        <div class="stat-value">3</div>
                        <div class="stat-label">
                            <i class="fas fa-gavel stat-icon"></i>
                            Активных торгов
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">12</div>
                        <div class="stat-label">
                            <i class="fas fa-trophy stat-icon"></i>
                            Выигранных лотов
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">47 850 ₽</div>
                        <div class="stat-label">
                            <i class="fas fa-wallet stat-icon"></i>
                            Всего потрачено
                        </div>
                    </div>
                    
                </div>

                <!-- Активные торги -->
                <h2 style="margin-bottom: 20px; color: #212529; font-size: 18px;">Активные торги</h2>
                
                <table class="auctions-table">
                    <thead>
                        <tr>
                            <th>Лот</th>
                            <th>Осталось времени</th>
                            <th>Текущая ставка</th>
                            <th>Ваша ставка</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="auction-item">Винтажные наручные часы</td>
                            <td>
                                <div class="auction-time">
                                    <i class="fas fa-clock time-icon"></i>
                                    00:12:34
                                </div>
                            </td>
                            <td class="current-bid">15 200 ₽</td>
                            <td class="current-bid">15 000 ₽</td>
                            <td>
                                <span class="status-badge status-outbid">Перебита</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="auction-item">Коллекционная монета 1897г</td>
                            <td>
                                <div class="auction-time">
                                    <i class="fas fa-clock time-icon"></i>
                                    01:45:22
                                </div>
                            </td>
                            <td class="current-bid">8 500 ₽</td>
                            <td class="current-bid">8 500 ₽</td>
                            <td>
                                <span class="status-badge status-winning">Лидируете</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="auction-item">Смартфон XYZ Pro</td>
                            <td>
                                <div class="auction-time">
                                    <i class="fas fa-clock time-icon"></i>
                                    03:20:15
                                </div>
                            </td>
                            <td class="current-bid">42 300 ₽</td>
                            <td class="current-bid">40 000 ₽</td>
                            <td>
                                <span class="status-badge status-active">Активна</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    </div>

    <!-- Футер -->
    <footer class="footer">
        <div class="container">
            <p>Timedid - заботиться о вашем времени</p>
            <p style="margin-top: 8px; font-size: 12px;">
                <router-link to="/info" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Правила использования</router-link> |
                <router-link to="/confident" style="color: #6c757d; text-decoration: none; margin: 0 10px;">Конфиденциальность</router-link> 
            </p>
        </div>
    </footer>

</template>

<script>
export default {
    methods: {
        goToTorg() {
            window.location.href = '/torg';
        },
        GoToSetting(){
            this.$router.push('/setting')
        }
    }
}
</script>
<style>
/* Базовые стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
    background: #f8f9fa;
    color: #212529;
    min-height: 100vh;
}

/* Контейнер */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}



.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 24px;
    font-weight: 800;
    color: #212529;
    text-decoration: none;
}

.logo-icon {
    color: #495057;
}

.tagline {
    font-size: 14px;
    color: #6c757d;
    letter-spacing: 0.5px;
    margin-top: 2px;
}

/* Основное содержимое */
.main-content {
    display: flex;
    gap: 30px;
    padding: 30px 0;
    min-height: calc(100vh - 120px);
}

/* Боковая панель */
.sidebar {
    width: 400px;
    flex-shrink: 0;
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    height: fit-content;
}

.profile-card {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 25px;
    border-bottom: 1px solid #e9ecef;
}

.avatar {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #495057 0%, #212529 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    color: #ffffff;
    font-size: 28px;
    font-weight: 700;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.user-name {
    font-size: 18px;
    font-weight: 600;
    color: #212529;
    margin-bottom: 5px;
}

.user-wallet {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    color: #6c757d;
    background: #f8f9fa;
    padding: 8px 12px;
    border-radius: 20px;
    margin-top: 10px;
}

.wallet-number {
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
}

.wallet-toggle {
    background: none;
    border: none;
    color: #adb5bd;
    cursor: pointer;
    font-size: 14px;
    padding: 2px;
    transition: color 0.2s;
}

.wallet-toggle:hover {
    color: #495057;
}

.nav-menu {
    list-style: none;
}

.nav-item {
    margin-bottom: 8px;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    color: #495057;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s;
    font-weight: 500;
}

.nav-link:hover {
    background: #f8f9fa;
    color: #212529;
}

.nav-link.active {
    background: #212529;
    color: #ffffff;
}

.nav-link.active:hover {
    background: #343a40;
}

.nav-icon {
    width: 20px;
    text-align: center;
    font-size: 16px;
}

.logout-link {
    color: #dc3545;
    margin-top: 20px;
    border-top: 1px solid #e9ecef;
    padding-top: 20px;
}

.logout-link:hover {
    background: rgba(220, 53, 69, 0.05);
    color: #dc3545;
}

/* Основная панель */
.main-panel {
    flex: 1;
    background: #ffffff;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
    border-radius: 20;
}

.panel-title {
    font-size: 24px;
    font-weight: 600;
    color: #212529;
}

.stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #e9ecef;
    transition: transform 0.2s;
}

.stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 14px;
    color: #6c757d;
    display: flex;
    align-items: center;
    gap: 6px;
}

.stat-icon {
    color: #495057;
}

/* Таблица активных торгов */
.auctions-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.auctions-table th {
    text-align: left;
    padding: 15px;
    background: #f8f9fa;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid #e9ecef;
}

.auctions-table td {
    padding: 15px;
    border-bottom: 1px solid #e9ecef;
    vertical-align: middle;
}

.auction-item {
    font-weight: 500;
    color: #212529;
}

.auction-time {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #6c757d;
    font-size: 14px;
}

.time-icon {
    color: #dc3545;
}

.current-bid {
    font-weight: 600;
    color: #212529;
}

.status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.status-active {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.status-winning {
    background: rgba(0, 123, 255, 0.1);
    color: #007bff;
}

.status-outbid {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}

/* Состояния */
.empty-state {
    text-align: center;
    padding: 50px 20px;
    color: #6c757d;
}

.empty-icon {
    font-size: 48px;
    color: #adb5bd;
    margin-bottom: 15px;
}

.empty-text {
    font-size: 16px;
    margin-bottom: 20px;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #212529;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    font-size: 14px;
}

.btn:hover {
    background: #343a40;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-outline {
    background: transparent;
    color: #495057;
    border: 1px solid #dee2e6;
}

.btn-outline:hover {
    background: #f8f9fa;
    color: #212529;
}

/* Футер */
.footer {
    background: #ffffff;
    border-top: 1px solid #e9ecef;
    padding: 20px 0;
    margin-top: 30px;
    text-align: center;
    color: #6c757d;
    font-size: 14px;
}

/* Адаптив */
@media (max-width: 900px) {
    .main-content {
        flex-direction: column;
    }
    
    .sidebar {
        width: 100%;
    }
    
    .stats-cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .container {
        padding: 0 15px;
    }
    
    .header-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .stats-cards {
        grid-template-columns: 1fr;
    }
    
    .main-panel {
        padding: 20px;
    }
    
    .panel-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }
    
    .auctions-table {
        display: block;
        overflow-x: auto;
    }
}
</style>