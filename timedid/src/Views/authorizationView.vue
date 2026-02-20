<template>
  <div>
    <div class="main-wrapper">
      <!-- Левая часть - WELCOME SIDE (ВЕРНУЛ ПОЛНОСТЬЮ) -->
      <div class="welcome-side">
        <div class="logo">
          <i class="fas fa-stopwatch logo-icon"></i>
          <div>
            Timedid
          </div>
        </div>
        
        <h1 class="welcome-title">Всё решает последняя секунда</h1>
        <p class="welcome-text">
          Timedid — уникальные торги, где товар уходит последней ставке по истечении времени.
        </p>
        
        <ul class="features">
          <li><i class="fas fa-bolt feature-icon"></i> Торги с обратным отсчетом</li>
          <li><i class="fas fa-trophy feature-icon"></i> Побеждает последняя ставка</li>
          <li><i class="fas fa-shield-alt feature-icon"></i> Безопасные сделки</li>
          <li><i class="fas fa-users feature-icon"></i> Прямые переговоры</li>
        </ul>
      </div>
      
      <!-- Правая часть - AUTH SIDE -->
      <div class="auth-side">
        <h2 class="auth-title">Авторизация</h2>
        
        <div class="input-group">
          <label class="input-label">Электронная почта</label>
          <input 
            type="email" 
            class="input-field" 
            placeholder="email@timedid.ru"
            v-model="authData.email"
            @keyup.enter="handleAuthorization"
          >
        </div>
        
        <div class="input-group">
          <label class="input-label">Пароль</label>
          <input 
            type="password" 
            class="input-field" 
            placeholder="Ваш пароль"
            v-model="authData.password"
            @keyup.enter="handleAuthorization"
          >
        </div>
        
        <div class="buttons-group">
          <button 
            class="btn btn-primary enterMain" 
            @click="handleAuthorization"
            :disabled="isLoading"
          >
            <i class="fas fa-sign-in-alt"></i> 
            {{ isLoading ? 'Вход...' : 'Войти в аккаунт' }}
          </button>
          <button 
            class="btn btn-secondary enterRegistration" 
            @click="goToRegistration"
          >
            <i class="fas fa-user-plus"></i> Создать аккаунт
          </button>
        </div>
        
        <!-- Сообщение об ошибке -->
        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        </div>
        
        <div class="auth-links">
          <a href="#" @click.prevent="forgotPassword">
            <i class="fas fa-key"></i> Забыли пароль?
          </a>
          <span class="divider">|</span>
          <a href="#" @click.prevent="help">
            <i class="fas fa-info-circle"></i> Помощь
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AuthorizationView',
  data() {
    return {
      authData: {
        email: '',
        password: ''
      },
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleAuthorization() {
      // Валидация
      if (!this.authData.email || !this.authData.password) {
        this.errorMessage = 'Заполните все поля'
        return
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        // Отправка запроса на авторизацию
        const response = await axios.post('http://localhost:5006/api/User_/Authorization', {
          email: this.authData.email,
          password: this.authData.password
        })

        // Успешная авторизация
        if (response.status === 200) {
          // Сохраняем данные пользователя
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token', Date.now().toString())
          
          // Перенаправляем на профиль
          this.$router.push('/prof')
        }
      } catch (error) {
        // Обработка ошибок
        if (error.response) {
          this.errorMessage = error.response.data || 'Неверный логин или пароль'
        } else if (error.request) {
          this.errorMessage = 'Сервер недоступен. Попробуйте позже'
        } else {
          this.errorMessage = 'Произошла ошибка при авторизации'
        }
      } finally {
        this.isLoading = false
      }
    },

    goToRegistration() {
      this.$router.push('/reg')
    },

    // toGoCreateAccount(){
    //    this.$router.push('/reg')
    // },

    forgotPassword() {
      this.$router.push('/forgot-password')
    },

    help() {
      this.$router.push('/help')
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* Основной контейнер */
.main-wrapper {
    display: flex;
    width: 100%;
    max-width: 1000px;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid #e9ecef;
    min-height: 600px;
}

.welcome-side {
    flex: 1;
    background: linear-gradient(160deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #e9ecef;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
    font-size: 40px;
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
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    color: #212529;
}

.welcome-text {
    color: #495057;
    line-height: 1.6;
    margin-bottom: 30px;
    font-size: 15px;
}

.features {
    list-style: none;
}

.features li {
    padding: 12px 0;
    color: #495057;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #e9ecef;
    font-size: 15px;
}

.features li:last-child {
    border-bottom: none;
}

.feature-icon {
    color: #495057;
    width: 20px;
    text-align: center;
}

/* Правая часть - Форма */
.auth-side {
    flex: 1;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #ffffff;
}

.auth-title {
    font-size: 28px;
    margin-bottom: 30px;
    color: #212529;
    text-align: center;
    font-weight: 600;
}

.input-group {
    margin-bottom: 24px;
}

.input-label {
    display: block;
    margin-bottom: 8px;
    color: #495057;
    font-weight: 500;
    font-size: 14px;
}

.input-field {
    width: 100%;
    padding: 16px 20px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    color: #212529;
    font-size: 16px;
    transition: all 0.3s;
}

.input-field:focus {
    outline: none;
    border-color: #adb5bd;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(108, 117, 125, 0.1);
}

.input-field::placeholder {
    color: #adb5bd;
}

.buttons-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 30px;
}

.btn {
    padding: 16px;
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
}

.btn-primary {
    background: #212529;
    color: #ffffff;
}

.btn-primary:hover {
    background: #343a40;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(33, 37, 41, 0.15);
}

.btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.btn-secondary {
    background: transparent;
    color: #495057;
    border: 1px solid #dee2e6;
}

.btn-secondary:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
    color: #212529;
}

.auth-links {
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
    color: #6c757d;
}

.auth-links a {
    color: #495057;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

.auth-links a:hover {
    color: #212529;
    text-decoration: underline;
}

.divider {
    color: #adb5bd;
    margin: 0 8px;
}

/* Сообщение об ошибке */
.error-message {
    margin-top: 20px;
    padding: 12px;
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 10px;
    color: #721c24;
    font-size: 14px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

/* Адаптив */
@media (max-width: 768px) {
    .main-wrapper {
        flex-direction: column;
        max-width: 450px;
        border-radius: 12px;
    }
    
    .welcome-side {
        padding: 40px 30px;
        border-right: none;
        border-bottom: 1px solid #e9ecef;
    }
    
    .auth-side {
        padding: 40px 30px;
    }
    
    .logo {
        justify-content: center;
    }
    
    .welcome-title, .auth-title {
        text-align: center;
        font-size: 26px;
    }
    
    .features li {
        font-size: 14px;
        padding: 10px 0;
    }
}

@media (max-width: 480px) {
    body {
        padding: 15px;
    }
    
    .main-wrapper {
        min-height: auto;
    }
    
    .welcome-side, .auth-side {
        padding: 30px 20px;
    }
    
    .logo {
        font-size: 24px;
        margin-bottom: 30px;
    }
    
    .welcome-title {
        font-size: 22px;
    }
    
    .auth-title {
        font-size: 22px;
    }
}
</style>