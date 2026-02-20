<template>
    <div class="main-wrapper">
        <!-- Левая часть -->
        <div class="welcome-side">
            <div class="logo">
                <i class="fas fa-stopwatch logo-icon"></i>
                <div>
                    Timedid
                    <div class="tagline">Ваша ставка — финальная</div>
                </div>
            </div>
            
            <h1 class="welcome-title">Станьте частью сообщества</h1>
            <p class="welcome-text">
                Присоединяйтесь к уникальным торгам, где каждая секунда на счету. Создайте аккаунт и начните выигрывать лоты уже сегодня.
            </p>
            
            <ul class="features">
                <li><i class="fas fa-check-circle feature-icon"></i> Быстрая регистрация</li>
                <li><i class="fas fa-shield-alt feature-icon"></i> Защита персональных данных</li>
                <li><i class="fas fa-bolt feature-icon"></i> Мгновенный доступ к торгам</li>
                <li><i class="fas fa-gem feature-icon"></i> Эксклюзивные предложения для новых пользователей</li>
                <li><i class="fas fa-headset feature-icon"></i> Поддержка 24/7</li>
            </ul>
        </div>
        
        <!-- Правая часть - Форма регистрации -->
        <div class="register-side">
            <h2 class="register-title">Создание аккаунта</h2>
            
            <form @submit.prevent="handleRegistration">
                <div class="form-grid">
                    <!-- Фамилия -->
                    <div class="input-group">
                        <label class="input-label">Фамилия *</label>
                        <input 
                            type="text" 
                            class="input-field" 
                            placeholder="Иванов" 
                            v-model="formData.surname"
                            required
                        >
                    </div>
                    
                    <!-- Имя -->
                    <div class="input-group">
                        <label class="input-label">Имя *</label>
                        <input 
                            type="text" 
                            class="input-field" 
                            placeholder="Иван" 
                            v-model="formData.name"
                            required
                        >
                    </div>
                    
                    <!-- Отчество -->
                    <div class="input-group full-width">
                        <label class="input-label">Отчество</label>
                        <div class="patronymic-wrapper">
                            <input 
                                type="text" 
                                class="input-field" 
                                id="patronymic" 
                                placeholder="Иванович"
                                v-model="formData.lastName"
                                :disabled="noPatronymic"
                            >
                            <label class="no-patronymic">
                                <input 
                                    type="checkbox" 
                                    id="noPatronymic"
                                    v-model="noPatronymic"
                                > Нет отчества
                            </label>
                        </div>
                    </div>
                    
                    <!-- Email -->
                    <div class="input-group full-width">
                        <label class="input-label">Электронная почта *</label>
                        <input 
                            type="email" 
                            class="input-field" 
                            placeholder="example@timedid.ru" 
                            v-model="formData.email"
                            required
                        >
                    </div>
                    
                    <!-- Номер кошелька -->
                    <div class="input-group full-width">
                        <label class="input-label">Номер кошелька *</label>
                        <input 
                            type="text" 
                            class="input-field" 
                            placeholder="A1B2C3D4E5" 
                            v-model="formData.wallet"
                            pattern="[A-Za-z0-9]+"
                            required
                        >
                        <div class="wallet-hint">Только английские буквы и цифры</div>
                    </div>
                    
                    <!-- Пароль -->
                    <div class="input-group">
                        <label class="input-label">Пароль *</label>
                        <input 
                            type="password" 
                            class="input-field" 
                            id="password" 
                            placeholder="Не менее 8 символов" 
                            v-model="formData.password"
                            required
                        >
                        <div class="password-requirements">Минимум 8 символов, включая цифры</div>
                    </div>
                    
                    <!-- Повтор пароля -->
                    <div class="input-group">
                        <label class="input-label">Повторите пароль *</label>
                        <input 
                            type="password" 
                            class="input-field" 
                            id="confirmPassword" 
                            placeholder="Повторите пароль"
                            v-model="confirmPassword"
                            required
                        >
                    </div>
                </div>
                
                <!-- Сообщение об ошибке -->
                <div v-if="errorMessage" class="error-message">
                    <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
                </div>
                
                <!-- Сообщение об успехе -->
                <div v-if="successMessage" class="success-message">
                    <i class="fas fa-check-circle"></i> {{ successMessage }}
                </div>
                
                <button 
                    type="submit" 
                    class="register-button"
                    :disabled="isLoading"
                >
                    <i class="fas fa-user-plus"></i> 
                    {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
                </button>
                
                <div class="auth-link">
                    
                    <a href="#" @click.prevent="goToAuth">
                        <i class="fas fa-sign-in-alt"></i>Уже есть аккаунт? Авторизация
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegistrationView',
    data() {
        return {
            formData: {
                surname: '',
                name: '',
                lastName: '',
                email: '',
                wallet: '',
                password: ''
            },
            confirmPassword: '',
            noPatronymic: false,
            isLoading: false,
            errorMessage: '',
            successMessage: ''
        }
    },
    watch: {
        // Если чекбокс "Нет отчества" отмечен, очищаем поле отчества
        noPatronymic(val) {
            if (val) {
                this.formData.lastName = ''
            }
        }
    },
    methods: {
        async handleRegistration() {
            // Валидация
            if (!this.formData.surname || !this.formData.name || !this.formData.email || 
                !this.formData.wallet || !this.formData.password) {
                this.errorMessage = 'Заполните все обязательные поля'
                return
            }

            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(this.formData.email)) {
                this.errorMessage = 'Введите корректный email адрес'
                return
            }

            // Валидация пароля
            if (this.formData.password.length < 8) {
                this.errorMessage = 'Пароль должен содержать минимум 8 символов'
                return
            }

            // Проверка совпадения паролей
            if (this.formData.password !== this.confirmPassword) {
                this.errorMessage = 'Пароли не совпадают'
                return
            }

            // Валидация кошелька (только буквы и цифры)
            const walletRegex = /^[A-Za-z0-9]+$/
            if (!walletRegex.test(this.formData.wallet)) {
                this.errorMessage = 'Номер кошелька должен содержать только английские буквы и цифры'
                return
            }

            this.isLoading = true
            this.errorMessage = ''
            this.successMessage = ''

            try {
                // Подготовка данных для отправки
                const registrationData = {
                    wallet: this.formData.wallet,
                    name: this.formData.name,
                    surname: this.formData.surname,
                    lastName: this.noPatronymic ? '' : this.formData.lastName,
                    password: this.formData.password,
                    email: this.formData.email,
                    createAccountData: new Date().toISOString()
                }

                // Отправка запроса на регистрацию
                const response = await axios.post(
                    'http://localhost:5006/api/User_/Registration', 
                    registrationData
                )

                // Успешная регистрация
                if (response.status === 200) {
                    this.successMessage = 'Регистрация прошла успешно! Перенаправление...'
                    
                    // Сохраняем данные пользователя
                    localStorage.setItem('user', JSON.stringify(response.data))
                    
                    // Перенаправляем на страницу авторизации через 2 секунды
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 2000)
                }
            } catch (error) {
                // Обработка ошибок
                if (error.response) {
                    // Сервер вернул ошибку
                    if (error.response.status === 400) {
                        this.errorMessage = error.response.data || 'Пользователь с такими данными уже зарегистрирован'
                    } else {
                        this.errorMessage = 'Ошибка сервера. Попробуйте позже'
                    }
                } else if (error.request) {
                    this.errorMessage = 'Сервер недоступен. Проверьте подключение'
                } else {
                    this.errorMessage = 'Произошла ошибка при регистрации'
                }
                console.error('Registration error:', error)
            } finally {
                this.isLoading = false
            }
        },

        goToAuth() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* Основной контейнер */
.main-wrapper {
    display: flex;
    width: 100%;
    max-width: 1100px;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid #e9ecef;
    min-height: 650px;
}

/* Левая часть - Приветствие */
.welcome-side {
    flex: 1;
    background: linear-gradient(160deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 40px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #e9ecef;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 35px;
    font-size: 26px;
    font-weight: 800;
    color: #212529;
}

.logo-icon {
    color: #495057;
}

.tagline {
    font-size: 14px;
    color: #6c757d;
    letter-spacing: 1px;
    margin-top: 5px;
    font-weight: 400;
}

.welcome-title {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    color: #212529;
}

.welcome-text {
    color: #495057;
    line-height: 1.6;
    margin-bottom: 25px;
    font-size: 15px;
}

.features {
    list-style: none;
}

.features li {
    padding: 10px 0;
    color: #495057;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e9ecef;
    font-size: 14px;
}

.features li:last-child {
    border-bottom: none;
}

.feature-icon {
    color: #495057;
    width: 18px;
    text-align: center;
}

/* Правая часть - Форма регистрации */
.register-side {
    flex: 1.2;
    padding: 40px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #ffffff;
}

.register-title {
    font-size: 26px;
    margin-bottom: 25px;
    color: #212529;
    text-align: center;
    font-weight: 600;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-bottom: 20px;
}

.full-width {
    grid-column: 1 / -1;
}

.input-group {
    margin-bottom: 0;
}

.input-label {
    display: block;
    margin-bottom: 6px;
    color: #495057;
    font-weight: 500;
    font-size: 13px;
}

.input-field {
    width: 100%;
    padding: 14px 16px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    color: #212529;
    font-size: 15px;
    transition: all 0.3s;
}

.input-field:focus {
    outline: none;
    border-color: #adb5bd;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(108, 117, 125, 0.1);
}

.input-field:disabled {
    background: #e9ecef;
    cursor: not-allowed;
}

.input-field::placeholder {
    color: #adb5bd;
    font-size: 14px;
}

.patronymic-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.patronymic-wrapper input {
    flex: 1;
}

.no-patronymic {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    font-size: 13px;
    color: #6c757d;
    cursor: pointer;
}

.no-patronymic input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.password-requirements {
    font-size: 12px;
    color: #6c757d;
    margin-top: 5px;
    line-height: 1.4;
}

.wallet-hint {
    font-size: 12px;
    color: #6c757d;
    margin-top: 5px;
    font-style: italic;
}

.register-button {
    padding: 16px;
    background: #212529;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 25px;
    width: 100%;
}

.register-button:hover:not(:disabled) {
    background: #343a40;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(33, 37, 41, 0.15);
}

.register-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.auth-link {
    margin-top: 25px;
    text-align: center;
    font-size: 14px;
    color: #6c757d;
}

.auth-link a {
    color: #495057;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.auth-link a:hover {
    color: #212529;
    text-decoration: underline;
}

/* Сообщения об ошибках и успехе */
.error-message {
    margin-top: 20px;
    padding: 12px;
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 8px;
    color: #721c24;
    font-size: 14px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.success-message {
    margin-top: 20px;
    padding: 12px;
    background: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 8px;
    color: #155724;
    font-size: 14px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

/* Адаптив */
@media (max-width: 900px) {
    .main-wrapper {
        flex-direction: column;
        max-width: 550px;
        border-radius: 12px;
    }
    
    .welcome-side {
        padding: 30px 25px;
        border-right: none;
        border-bottom: 1px solid #e9ecef;
    }
    
    .register-side {
        padding: 30px 25px;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .logo {
        justify-content: center;
    }
    
    .welcome-title, .register-title {
        text-align: center;
        font-size: 24px;
    }
    
    .features li {
        font-size: 13px;
        padding: 8px 0;
    }
}

@media (max-width: 480px) {
    body {
        padding: 15px;
    }
    
    .main-wrapper {
        min-height: auto;
    }
    
    .welcome-side, .register-side {
        padding: 25px 20px;
    }
    
    .logo {
        font-size: 22px;
        margin-bottom: 25px;
    }
    
    .welcome-title {
        font-size: 20px;
    }
    
    .register-title {
        font-size: 20px;
    }
    
    .input-field {
        padding: 12px 14px;
        font-size: 14px;
    }
    
    .patronymic-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .no-patronymic {
        align-self: flex-start;
    }
}
</style>