<template>
  <div class="settings-page">
    <!-- Хедер на весь экран -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <router-link to="/profile" class="back-link">
            <i class="fas fa-arrow-left"></i>
            <span>Назад в профиль</span>
          </router-link>
        </div>
        <div class="header-center">
          <h1 class="page-title">
            <i class="fas fa-cog"></i>
            Настройки аккаунта
          </h1>
        </div>
        <div class="header-right">
          <div class="user-info">
            <span class="user-email">{{ currentEmail }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Основной контент на весь экран -->
    <main class="main-content">
      <div class="settings-container">
        <!-- Секция изменения пароля -->
        <section class="settings-section">
          <div class="section-header">
            <div class="section-title">
              <i class="fas fa-key"></i>
              <h2>Безопасность</h2>
            </div>
            <p class="section-subtitle">Управление паролем и доступом к аккаунту</p>
          </div>

          <div class="settings-form">
            <!-- Изменение пароля -->
            <div class="form-group">
              <div class="form-header" @click="togglePasswordForm">
                <div class="form-title">
                  <h3>Изменить пароль</h3>
                  <p>Последнее изменение: {{ lastPasswordChange }}</p>
                </div>
                <div class="form-toggle">
                  <i class="fas" :class="showPasswordForm ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                </div>
              </div>

              <div v-if="showPasswordForm" class="form-content">
                <!-- Текущий пароль -->
                <div class="input-group">
                  <label for="currentPassword">
                    <i class="fas fa-lock"></i>
                    Текущий пароль
                  </label>
                  <div class="password-input">
                    <input
                      :type="showCurrentPassword ? 'text' : 'password'"
                      id="currentPassword"
                      v-model="passwordForm.current"
                      placeholder="Введите текущий пароль"
                      class="input-field"
                    >
                    <button
                      class="password-toggle"
                      @click="showCurrentPassword = !showCurrentPassword"
                      type="button"
                    >
                      <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <div v-if="passwordErrors.current" class="error-text">
                    {{ passwordErrors.current }}
                  </div>
                </div>

                <!-- Новый пароль -->
                <div class="input-group">
                  <label for="newPassword">
                    <i class="fas fa-key"></i>
                    Новый пароль
                  </label>
                  <div class="password-input">
                    <input
                      :type="showNewPassword ? 'text' : 'password'"
                      id="newPassword"
                      v-model="passwordForm.new"
                      placeholder="Введите новый пароль"
                      class="input-field"
                    >
                    <button
                      class="password-toggle"
                      @click="showNewPassword = !showNewPassword"
                      type="button"
                    >
                      <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <div v-if="passwordErrors.new" class="error-text">
                    {{ passwordErrors.new }}
                  </div>
                  <div class="password-strength">
                    <div class="strength-bar">
                      <div class="strength-fill" :style="{ width: passwordStrength + '%' }"></div>
                    </div>
                    <span class="strength-label">{{ passwordStrengthLabel }}</span>
                  </div>
                </div>

                <!-- Подтверждение пароля -->
                <div class="input-group">
                  <label for="confirmPassword">
                    <i class="fas fa-redo"></i>
                    Подтвердите пароль
                  </label>
                  <div class="password-input">
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      id="confirmPassword"
                      v-model="passwordForm.confirm"
                      placeholder="Повторите новый пароль"
                      class="input-field"
                    >
                    <button
                      class="password-toggle"
                      @click="showConfirmPassword = !showConfirmPassword"
                      type="button"
                    >
                      <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <div v-if="passwordErrors.confirm" class="error-text">
                    {{ passwordErrors.confirm }}
                  </div>
                </div>

                <div class="form-actions">
                  <button
                    class="btn btn-cancel"
                    @click="cancelPasswordChange"
                  >
                    Отмена
                  </button>
                  <button
                    class="btn btn-primary"
                    @click="changePassword"
                    :disabled="!isPasswordFormValid || isChangingPassword"
                  >
                    <i v-if="isChangingPassword" class="fas fa-spinner fa-spin"></i>
                    <span v-else>Изменить пароль</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Секция изменения email -->
        <section class="settings-section">
          <div class="section-header">
            <div class="section-title">
              <i class="fas fa-envelope"></i>
              <h2>Электронная почта</h2>
            </div>
            <p class="section-subtitle">Изменение и подтверждение email адреса</p>
          </div>

          <div class="settings-form">
            <!-- Текущий email -->
            <div class="form-group">
              <div class="form-header">
                <div class="form-title">
                  <h3>Текущий адрес</h3>
                  <p>{{ currentEmail }}</p>
                </div>
              </div>
            </div>

            <!-- Изменение email -->
            <div class="form-group">
              <div class="form-header" @click="toggleEmailForm">
                <div class="form-title">
                  <h3>Изменить email</h3>
                  <p>Требуется подтверждение на обоих адресах</p>
                </div>
                <div class="form-toggle">
                  <i class="fas" :class="showEmailForm ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                </div>
              </div>

              <div v-if="showEmailForm" class="form-content">
                <!-- Шаг 1: Новый email -->
                <div v-if="emailStep === 1" class="email-step">
                  <div class="input-group">
                    <label for="newEmail">
                      <i class="fas fa-at"></i>
                      Новый email адрес
                    </label>
                    <input
                      type="email"
                      id="newEmail"
                      v-model="emailForm.newEmail"
                      placeholder="example@domain.com"
                      class="input-field"
                    >
                    <div v-if="emailErrors.newEmail" class="error-text">
                      {{ emailErrors.newEmail }}
                    </div>
                  </div>

                  <div class="form-actions">
                    <button
                      class="btn btn-cancel"
                      @click="cancelEmailChange"
                    >
                      Отмена
                    </button>
                    <button
                      class="btn btn-primary"
                      @click="sendVerificationCode"
                      :disabled="!isNewEmailValid || isSendingCode"
                    >
                      <i v-if="isSendingCode" class="fas fa-spinner fa-spin"></i>
                      <span v-else>Продолжить</span>
                    </button>
                  </div>
                </div>

                <!-- Шаг 2: Код на старый email -->
                <div v-if="emailStep === 2" class="email-step">
                  <div class="verification-info">
                    <i class="fas fa-mail-bulk"></i>
                    <div class="verification-text">
                      <h4>Проверка текущего email</h4>
                      <p>Код отправлен на {{ currentEmail }}</p>
                      <p class="timer" v-if="codeTimer > 0">
                        Повторная отправка через {{ formatTime(codeTimer) }}
                      </p>
                      <button
                        v-else
                        class="btn-resend"
                        @click="resendCode"
                        :disabled="isResending"
                      >
                        <i v-if="isResending" class="fas fa-spinner fa-spin"></i>
                        <span v-else>Отправить код повторно</span>
                      </button>
                    </div>
                  </div>

                  <div class="input-group">
                    <label>
                      <i class="fas fa-shield-alt"></i>
                      Код подтверждения (6 цифр)
                    </label>
                    <div class="code-inputs">
                      <input
                        v-for="n in 6"
                        :key="n"
                        :ref="el => codeInputs[n-1] = el"
                        type="text"
                        maxlength="1"
                        @input="onCodeInput(n-1, $event)"
                        @keydown.delete="onCodeDelete(n-1, $event)"
                        @paste="onCodePaste"
                        class="code-input"
                      >
                    </div>
                    <div v-if="emailErrors.code" class="error-text">
                      {{ emailErrors.code }}
                    </div>
                  </div>

                  <div class="form-actions">
                    <button
                      class="btn btn-cancel"
                      @click="emailStep = 1"
                    >
                      Назад
                    </button>
                    <button
                      class="btn btn-primary"
                      @click="verifyCurrentEmail"
                      :disabled="!isCodeComplete || isVerifying"
                    >
                      <i v-if="isVerifying" class="fas fa-spinner fa-spin"></i>
                      <span v-else>Подтвердить</span>
                    </button>
                  </div>
                </div>

                <!-- Шаг 3: Код на новый email -->
                <div v-if="emailStep === 3" class="email-step">
                  <div class="verification-info">
                    <i class="fas fa-check-circle"></i>
                    <div class="verification-text">
                      <h4>Текущий email подтверждён</h4>
                      <p>Теперь проверьте новый адрес: {{ emailForm.newEmail }}</p>
                      <p>Код отправлен на новый email</p>
                    </div>
                  </div>

                  <div class="input-group">
                    <label>
                      <i class="fas fa-shield-alt"></i>
                      Код подтверждения с нового email
                    </label>
                    <div class="code-inputs">
                      <input
                        v-for="n in 6"
                        :key="n"
                        :ref="el => newCodeInputs[n-1] = el"
                        type="text"
                        maxlength="1"
                        @input="onNewCodeInput(n-1, $event)"
                        @keydown.delete="onNewCodeDelete(n-1, $event)"
                        @paste="onNewCodePaste"
                        class="code-input"
                      >
                    </div>
                    <div v-if="emailErrors.newCode" class="error-text">
                      {{ emailErrors.newCode }}
                    </div>
                  </div>

                  <div class="form-actions">
                    <button
                      class="btn btn-cancel"
                      @click="resendNewEmailCode"
                      :disabled="isResendingNewCode"
                    >
                      <i v-if="isResendingNewCode" class="fas fa-spinner fa-spin"></i>
                      <span v-else>Отправить код повторно</span>
                    </button>
                    <button
                      class="btn btn-primary"
                      @click="verifyNewEmail"
                      :disabled="!isNewCodeComplete || isVerifyingNew"
                    >
                      <i v-if="isVerifyingNew" class="fas fa-spinner fa-spin"></i>
                      <span v-else>Подтвердить новый email</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Секция настроек уведомлений -->
        <section class="settings-section">
          <div class="section-header">
            <div class="section-title">
              <i class="fas fa-bell"></i>
              <h2>Уведомления</h2>
            </div>
            <p class="section-subtitle">Управление оповещениями и рассылками</p>
          </div>

          <div class="settings-form">
            <div class="form-group">
              <div class="toggle-item">
                <div class="toggle-info">
                  <h3>Email уведомления</h3>
                  <p>Получать уведомления о ставках и аукционах</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="emailNotifications">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="toggle-item">
                <div class="toggle-info">
                  <h3>Двухфакторная аутентификация</h3>
                  <p>Дополнительная защита при входе в аккаунт</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="twoFactorEnabled">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <!-- Кнопки действий -->
        <div class="action-buttons">
          <button class="btn btn-secondary" @click="resetAllSettings">
            <i class="fas fa-undo"></i>
            Сбросить все изменения
          </button>
          <button class="btn btn-success" @click="saveAllSettings">
            <i class="fas fa-save"></i>
            Сохранить все настройки
          </button>
        </div>
      </div>
    </main>

    <!-- Футер -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <span class="footer-copyright">© {{ currentYear }} TimeDid</span>
          <span class="footer-warning">Торгуйте ответственно</span>
        </div>
        <div class="footer-links">
          <router-link to="/help"><i class="fas fa-question-circle"></i> Помощь</router-link>
          <router-link to="/privacy"><i class="fas fa-shield-alt"></i> Конфиденциальность</router-link>
        </div>
      </div>
    </footer>

    <!-- Уведомление об успехе -->
    <div v-if="showNotification" class="notification" :class="notificationType">
      <i :class="notificationIcon"></i>
      <span class="notification-text">{{ notificationMessage }}</span>
      <button class="notification-close" @click="hideNotification">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Основные данные
const currentEmail = ref('ivan.ivanov@example.com')
const lastPasswordChange = ref('15 января 2024')
const currentYear = ref(new Date().getFullYear())

// Форма пароля
const showPasswordForm = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const isChangingPassword = ref(false)

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const passwordErrors = ref({
  current: '',
  new: '',
  confirm: ''
})

// Форма email
const showEmailForm = ref(false)
const emailStep = ref(1)
const isSendingCode = ref(false)
const isResending = ref(false)
const isVerifying = ref(false)
const isResendingNewCode = ref(false)
const isVerifyingNew = ref(false)
const codeTimer = ref(0)
const codeInputs = ref([])
const newCodeInputs = ref([])

const emailForm = ref({
  newEmail: '',
  currentCode: ['', '', '', '', '', ''],
  newCode: ['', '', '', '', '', '']
})

const emailErrors = ref({
  newEmail: '',
  code: '',
  newCode: ''
})

// Настройки
const twoFactorEnabled = ref(true)
const emailNotifications = ref(true)

// Уведомления
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')
const notificationIcon = ref('fas fa-check')

// Вычисляемые свойства
const passwordStrength = computed(() => {
  const password = passwordForm.value.new
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25
  
  return strength
})

const passwordStrengthLabel = computed(() => {
  const strength = passwordStrength.value
  if (strength >= 75) return 'Отличный'
  if (strength >= 50) return 'Хороший'
  if (strength >= 25) return 'Средний'
  return 'Слабый'
})

const isPasswordFormValid = computed(() => {
  return passwordForm.value.current && 
         passwordForm.value.new && 
         passwordForm.value.confirm &&
         passwordForm.value.new === passwordForm.value.confirm &&
         passwordStrength.value >= 50
})

const isNewEmailValid = computed(() => {
  const email = emailForm.value.newEmail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email !== currentEmail.value
})

const isCodeComplete = computed(() => {
  return emailForm.value.currentCode.every(digit => digit !== '')
})

const isNewCodeComplete = computed(() => {
  return emailForm.value.newCode.every(digit => digit !== '')
})

// Методы
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const togglePasswordForm = () => {
  showPasswordForm.value = !showPasswordForm.value
  if (!showPasswordForm.value) {
    resetPasswordForm()
  }
}

const toggleEmailForm = () => {
  showEmailForm.value = !showEmailForm.value
  if (!showEmailForm.value) {
    resetEmailForm()
  }
}

const validatePasswordForm = () => {
  passwordErrors.value = { current: '', new: '', confirm: '' }
  let isValid = true
  
  if (!passwordForm.value.current) {
    passwordErrors.value.current = 'Введите текущий пароль'
    isValid = false
  }
  
  if (!passwordForm.value.new) {
    passwordErrors.value.new = 'Введите новый пароль'
    isValid = false
  } else if (passwordForm.value.new.length < 8) {
    passwordErrors.value.new = 'Пароль должен быть не менее 8 символов'
    isValid = false
  } else if (passwordStrength.value < 50) {
    passwordErrors.value.new = 'Пароль слишком простой'
    isValid = false
  }
  
  if (!passwordForm.value.confirm) {
    passwordErrors.value.confirm = 'Подтвердите пароль'
    isValid = false
  } else if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordErrors.value.confirm = 'Пароли не совпадают'
    isValid = false
  }
  
  return isValid
}

const changePassword = async () => {
  if (!validatePasswordForm()) return
  
  isChangingPassword.value = true
  
  try {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Здесь была бы проверка текущего пароля на сервере
    // if (passwordForm.current !== 'correct_password') {
    //   throw new Error('Неверный текущий пароль')
    // }
    
    showNotificationMessage('Пароль успешно изменён', 'success')
    resetPasswordForm()
    showPasswordForm.value = false
    lastPasswordChange.value = new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    
  } catch (error) {
    passwordErrors.value.current = error.message || 'Ошибка при изменении пароля'
    showNotificationMessage(error.message || 'Ошибка при изменении пароля', 'error')
  } finally {
    isChangingPassword.value = false
  }
}

const cancelPasswordChange = () => {
  resetPasswordForm()
  showPasswordForm.value = false
}

const resetPasswordForm = () => {
  passwordForm.value = { current: '', new: '', confirm: '' }
  passwordErrors.value = { current: '', new: '', confirm: '' }
  showCurrentPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
}

const sendVerificationCode = async () => {
  if (!isNewEmailValid.value) return
  
  isSendingCode.value = true
  emailErrors.value.newEmail = ''
  
  try {
    // Имитация отправки кода
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emailStep.value = 2
    startCodeTimer()
    
    showNotificationMessage(`Код отправлен на ${currentEmail.value}`, 'info')
    
  } catch (error) {
    emailErrors.value.newEmail = 'Ошибка при отправке кода'
    showNotificationMessage('Ошибка при отправке кода', 'error')
  } finally {
    isSendingCode.value = false
  }
}

const startCodeTimer = () => {
  codeTimer.value = 120 // 2 минуты
  const timer = setInterval(() => {
    codeTimer.value--
    if (codeTimer.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const resendCode = async () => {
  isResending.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    startCodeTimer()
    showNotificationMessage('Код отправлен повторно', 'info')
  } finally {
    isResending.value = false
  }
}

const onCodeInput = (index, event) => {
  const value = event.target.value
  if (value && /^[0-9]$/.test(value)) {
    emailForm.value.currentCode[index] = value
    
    if (index < 5) {
      nextTick(() => {
        codeInputs.value[index + 1]?.focus()
      })
    }
  } else {
    emailForm.value.currentCode[index] = ''
  }
}

const onCodeDelete = (index, event) => {
  if (event.key === 'Backspace' && !emailForm.value.currentCode[index] && index > 0) {
    emailForm.value.currentCode[index - 1] = ''
    nextTick(() => {
      codeInputs.value[index - 1]?.focus()
    })
  }
}

const onCodePaste = (event) => {
  const paste = event.clipboardData.getData('text')
  const numbers = paste.replace(/[^0-9]/g, '').split('').slice(0, 6)
  
  numbers.forEach((num, index) => {
    emailForm.value.currentCode[index] = num
  })
  
  if (numbers.length === 6) {
    nextTick(() => {
      codeInputs.value[5]?.focus()
    })
  }
}

const verifyCurrentEmail = async () => {
  isVerifying.value = true
  emailErrors.value.code = ''
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Тестовый код для демо
    const code = emailForm.value.currentCode.join('')
    if (code === '123456') {
      emailStep.value = 3
      showNotificationMessage('Код подтверждён! Проверьте новый email', 'success')
    } else {
      emailErrors.value.code = 'Неверный код подтверждения'
      showNotificationMessage('Неверный код подтверждения', 'error')
    }
    
  } catch (error) {
    emailErrors.value.code = 'Ошибка при проверке кода'
    showNotificationMessage('Ошибка при проверке кода', 'error')
  } finally {
    isVerifying.value = false
  }
}

const verifyNewEmail = async () => {
  isVerifyingNew.value = true
  emailErrors.value.newCode = ''
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Тестовый код для демо
    const code = emailForm.value.newCode.join('')
    if (code === '654321') {
      currentEmail.value = emailForm.value.newEmail
      showNotificationMessage('Email успешно изменён!', 'success')
      resetEmailForm()
      showEmailForm.value = false
    } else {
      emailErrors.value.newCode = 'Неверный код подтверждения'
      showNotificationMessage('Неверный код подтверждения', 'error')
    }
    
  } catch (error) {
    emailErrors.value.newCode = 'Ошибка при проверке кода'
    showNotificationMessage('Ошибка при проверке кода', 'error')
  } finally {
    isVerifyingNew.value = false
  }
}

const resendNewEmailCode = async () => {
  isResendingNewCode.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    showNotificationMessage('Код отправлен повторно на новый email', 'info')
  } finally {
    isResendingNewCode.value = false
  }
}

const cancelEmailChange = () => {
  resetEmailForm()
  showEmailForm.value = false
}

const resetEmailForm = () => {
  emailForm.value = {
    newEmail: '',
    currentCode: ['', '', '', '', '', ''],
    newCode: ['', '', '', '', '', '']
  }
  emailErrors.value = { newEmail: '', code: '', newCode: '' }
  emailStep.value = 1
  codeTimer.value = 0
}

const resetAllSettings = () => {
  if (confirm('Сбросить все несохранённые изменения?')) {
    resetPasswordForm()
    resetEmailForm()
    showPasswordForm.value = false
    showEmailForm.value = false
    twoFactorEnabled.value = true
    emailNotifications.value = true
    showNotificationMessage('Все изменения сброшены', 'info')
  }
}

const saveAllSettings = () => {
  // В реальном приложении здесь отправка всех изменений на сервер
  showNotificationMessage('Все настройки успешно сохранены', 'success')
}

const showNotificationMessage = (message, type = 'success') => {
  notificationMessage.value = message
  notificationType.value = type
  
  if (type === 'success') {
    notificationIcon.value = 'fas fa-check'
  } else if (type === 'error') {
    notificationIcon.value = 'fas fa-exclamation-triangle'
  } else {
    notificationIcon.value = 'fas fa-info-circle'
  }
  
  showNotification.value = true
  
  // Автоматическое скрытие через 5 секунд
  setTimeout(() => {
    hideNotification()
  }, 5000)
}

const hideNotification = () => {
  showNotification.value = false
}

// Методы для нового кода
const onNewCodeInput = (index, event) => {
  const value = event.target.value
  if (value && /^[0-9]$/.test(value)) {
    emailForm.value.newCode[index] = value
    
    if (index < 5) {
      nextTick(() => {
        newCodeInputs.value[index + 1]?.focus()
      })
    }
  } else {
    emailForm.value.newCode[index] = ''
  }
}

const onNewCodeDelete = (index, event) => {
  if (event.key === 'Backspace' && !emailForm.value.newCode[index] && index > 0) {
    emailForm.value.newCode[index - 1] = ''
    nextTick(() => {
      newCodeInputs.value[index - 1]?.focus()
    })
  }
}

const onNewCodePaste = (event) => {
  const paste = event.clipboardData.getData('text')
  const numbers = paste.replace(/[^0-9]/g, '').split('').slice(0, 6)
  
  numbers.forEach((num, index) => {
    emailForm.value.newCode[index] = num
  })
  
  if (numbers.length === 6) {
    nextTick(() => {
      newCodeInputs.value[5]?.focus()
    })
  }
}

onMounted(() => {
  console.log('Settings page mounted')
})
</script>

<style scoped>
/* Базовые стили - черно-белая тема */
.settings-page {
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

/* Хедер на весь экран */
.header {
  position: sticky;
  top: 0;
  background: #ffffff;
  border-bottom: 2px solid #000000;
  padding: 20px 40px;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 100%;
  margin: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: opacity 0.3s;
}

.back-link:hover {
  opacity: 0.7;
}

.back-link i {
  font-size: 18px;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.page-title i {
  font-size: 24px;
  opacity: 0.8;
}

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-info {
  font-size: 14px;
  color: #666666;
  font-weight: 500;
}

/* Основной контент на весь экран */
.main-content {
  flex: 1;
  padding: 40px;
  width: 100%;
}

.settings-container {
  max-width: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Секции настроек */
.settings-section {
  width: 100%;
}

.section-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #000000;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.section-title h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.section-title i {
  font-size: 22px;
}

.section-subtitle {
  color: #666666;
  font-size: 16px;
  margin: 0;
  font-weight: 400;
}

/* Формы настроек */
.settings-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.form-group:hover {
  border-color: #000000;
}

.form-header {
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #f8f8f8;
  transition: background 0.3s;
}

.form-header:hover {
  background: #f0f0f0;
}

.form-title h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.form-title p {
  color: #666666;
  font-size: 14px;
  margin: 0;
}

.form-toggle {
  color: #666666;
  font-size: 18px;
  transition: transform 0.3s;
}

.form-content {
  padding: 25px;
  background: #ffffff;
}

/* Группы ввода */
.input-group {
  margin-bottom: 25px;
}

.input-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
}

.input-group label i {
  width: 16px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  background: #ffffff;
  color: #000000;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #000000;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
}

.password-toggle:hover {
  color: #000000;
}

.error-text {
  color: #ff0000;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
}

.password-strength {
  margin-top: 15px;
}

.strength-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-fill {
  height: 100%;
  background: #000000;
  transition: width 0.3s;
}

.strength-label {
  font-size: 12px;
  color: #666666;
  font-weight: 500;
}

/* Ввод кода подтверждения */
.code-inputs {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.code-input {
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  border: 2px solid #000000;
  border-radius: 8px;
  background: #ffffff;
  color: #000000;
  transition: all 0.3s;
}

.code-input:focus {
  outline: none;
  background: #f8f8f8;
  border-color: #000000;
}

.verification-info {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
}

.verification-info i {
  font-size: 32px;
  color: #000000;
}

.verification-text h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.verification-text p {
  color: #666666;
  margin: 0 0 5px 0;
  font-size: 14px;
}

.timer {
  color: #000000 !important;
  font-weight: 600;
}

.btn-resend {
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  font-size: 14px;
  text-decoration: underline;
}

/* Переключатели */
.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.toggle-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.toggle-info p {
  color: #666666;
  font-size: 14px;
  margin: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0e0e0;
  transition: .4s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .toggle-slider {
  background-color: #000000;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.toggle-slider.round {
  border-radius: 34px;
}

.toggle-slider.round:before {
  border-radius: 50%;
}

/* Кнопки */
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: 2px solid #000000;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  background: #ffffff;
  color: #000000;
  min-width: 120px;
  text-align: center;
}

.btn:hover:not(:disabled) {
  background: #000000;
  color: #ffffff;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #000000;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #333333;
}

.btn-cancel {
  border-color: #666666;
  color: #666666;
}

.btn-cancel:hover:not(:disabled) {
  background: #666666;
  color: #ffffff;
}

.btn-secondary {
  border-color: #666666;
  color: #666666;
}

.btn-secondary:hover {
  background: #666666;
  color: #ffffff;
}

.btn-success {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
}

.btn-success:hover {
  background: #333333;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #000000;
}

/* Футер */
.footer {
  background: #000000;
  color: #ffffff;
  padding: 20px 40px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-copyright {
  font-size: 14px;
  opacity: 0.8;
}

.footer-warning {
  font-size: 12px;
  opacity: 0.6;
}

.footer-links {
  display: flex;
  gap: 30px;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 1;
}

/* Уведомление */
.notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #000000;
  color: #ffffff;
  padding: 20px 25px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 300px;
  max-width: 400px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  z-index: 2000;
  animation: slideIn 0.3s ease;
}

.notification.success {
  background: #000000;
}

.notification.error {
  background: #ff0000;
}

.notification.info {
  background: #666666;
}

.notification i {
  font-size: 20px;
}

.notification-text {
  flex: 1;
  font-weight: 500;
}

.notification-close {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 5px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.notification-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Анимация спиннера */
.fa-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Адаптивность */
@media (max-width: 768px) {
  .header {
    padding: 15px 20px;
  }
  
  .header-content {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .header-center {
    order: -1;
  }
  
  .header-left, .header-right {
    justify-content: center;
  }
  
  .main-content {
    padding: 20px;
  }
  
  .page-title {
    font-size: 22px;
  }
  
  .form-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .form-toggle {
    align-self: flex-end;
  }
  
  .code-input {
    width: 40px;
    height: 50px;
    font-size: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 15px;
  }
  
  .btn {
    width: 100%;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .footer-links {
    gap: 20px;
  }
  
  .notification {
    left: 20px;
    right: 20px;
    min-width: auto;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .code-input {
    width: 35px;
    height: 45px;
    font-size: 18px;
  }
  
  .toggle-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .toggle-switch {
    align-self: flex-end;
  }
}
</style>