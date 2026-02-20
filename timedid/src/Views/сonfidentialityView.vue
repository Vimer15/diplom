<template>
  <div class="privacy-page">
    <!-- Кнопка возврата в левом верхнем углу -->
    <button class="back-button" @click="goToProfile">
      <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Назад
    </button>

    <div class="container">
      <!-- Заголовок -->
      <header class="header">
        <h1 class="title">Политика конфиденциальности</h1>
        <p class="subtitle">Ваша анонимность и безопасность — наш главный приоритет</p>
      </header>

      <!-- Основной контент -->
      <main class="content">
        <!-- Введение -->
        <section class="section intro">
          <div class="intro-card">
            <div class="intro-icon">🔐</div>
            <h2>Добро пожаловать в безопасную среду</h2>
            <p>Наша блокчейн-платформа построена на принципах максимальной конфиденциальности и децентрализации. Здесь вы контролируете свои данные.</p>
          </div>
        </section>

        <!-- Ключевые принципы -->
        <section class="section principles">
          <h2 class="section-title">Наши основные принципы</h2>
          <div class="principles-grid">
            <div class="principle-card">
              <div class="card-icon">👤</div>
              <h3>100% Анонимность</h3>
              <p>Мы не запрашиваем и не храним ваши личные данные: имя, email, телефон или документы</p>
              <div class="highlight-badge">Гарантия</div>
            </div>
            <div class="principle-card">
              <div class="card-icon">🔗</div>
              <h3>Блокчейн-безопасность</h3>
              <p>Все транзакции записываются в неизменяемый блокчейн, обеспечивая прозрачность без раскрытия личности</p>
              <div class="highlight-badge">Технология</div>
            </div>
            <div class="principle-card">
              <div class="card-icon">🌐</div>
              <h3>Децентрализация</h3>
              <p>Нет центрального сервера — ваши данные распределены по сети, что исключает единую точку отказа</p>
              <div class="highlight-badge">Архитектура</div>
            </div>
          </div>
        </section>

        <!-- Как это работает -->
        <section class="section workflow">
          <h2 class="section-title">Как обеспечивается ваша приватность</h2>
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Псевдонимные идентификаторы</h3>
                <p>Вместо имени используется криптографический хеш-адрес (например: 0x1a2b...c3d4). Невозможно установить связь между адресом и вашей личностью.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Zero-Knowledge Proofs</h3>
                <p>Технология "доказательства с нулевым разглашением" позволяет подтвердить информацию, не раскрывая сами данные.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Сквозное шифрование</h3>
                <p>Все сообщения и данные шифруются на вашем устройстве ключами, которые есть только у вас и получателя.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Юридическая информация -->
        <section class="section legal">
          <h2 class="section-title">Правовые основы</h2>
          <div class="legal-grid">
            <div class="legal-card">
              <div class="legal-icon">⚖️</div>
              <h3>GDPR и анонимные данные</h3>
              <p>Согласно <strong>статье 11 GDPR</strong>, положения о защите данных не применяются к анонимной информации. Мы не обрабатываем персональные данные в понимании GDPR.</p>
            </div>
            <div class="legal-card">
              <div class="legal-icon">📜</div>
              <h3>Регулирование блокчейна</h3>
              <p>Транзакции на блокчейне рассматриваются как криптографические операции и регулируются специальными нормативными актами о цифровых активах.</p>
            </div>
          </div>
          
          <div class="warning-card">
            <div class="warning-header">
              <span class="warning-icon">⚠️</span>
              <h3>Важная ответственность</h3>
            </div>
            <p><strong>Вы — единственный владелец своих приватных ключей.</strong> Платформа не имеет доступа и не хранит ваши ключи. Потеря ключей означает <strong>безвозвратную потерю доступа</strong> к аккаунту и средствам.</p>
          </div>
        </section>

        <!-- Что мы не делаем -->
        <section class="section donts">
          <h2 class="section-title">Чего мы НЕ делаем</h2>
          <div class="donts-list">
            <div class="dont-item">
              <div class="dont-icon">❌</div>
              <div>
                <h3>Не собираем личные данные</h3>
                <p>Не запрашиваем паспортные данные, место жительства, телефон или email</p>
              </div>
            </div>
            <div class="dont-item">
              <div class="dont-icon">❌</div>
              <div>
                <h3>Не отслеживаем ваши действия</h3>
                <p>Не используем куки для отслеживания поведения на платформе</p>
              </div>
            </div>
            <div class="dont-item">
              <div class="dont-icon">❌</div>
              <div>
                <h3>Не передаем данные третьим лицам</h3>
                <p>Нет данных для передачи — нет и самой возможности их передать</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Футер -->
      <footer class="footer">
        <div class="footer-content">
          <p class="footer-note">Эта страница существует для вашего спокойствия. Торгуйте безопасно.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  
  data() {
    return {
      currentDate: new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  
  methods: {
    goToProfile() {
      this.$router.push('/prof');
    }
  }
}
</script>

<style scoped>
.privacy-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  color: #333;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  position: relative;
}

/* Кнопка возврата в левом верхнем углу */
.back-button {
  position: fixed;
  top: 30px;
  left: 30px;
  background: #ffffff;
  color: #333;
  border: 2px solid #e0e0e0;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background: #f0f0f0;
  border-color: #333;
  transform: translateX(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.back-icon {
  width: 20px;
  height: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Заголовок */
.header {
  text-align: center;
  padding: 80px 0 60px;
  margin-bottom: 40px;
}

.title {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.3rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Общие стили секций */
.section {
  margin-bottom: 80px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: #1a1a1a;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #333, #666);
  border-radius: 2px;
}

/* Введение */
.intro-card {
  background: white;
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  max-width: 800px;
  margin: 0 auto;
}

.intro-icon {
  font-size: 4rem;
  margin-bottom: 30px;
}

.intro-card h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.intro-card p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
}

/* Принципы */
.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.principle-card {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.principle-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #e0e0e0;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 25px;
}

.principle-card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.principle-card p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.highlight-badge {
  display: inline-block;
  background: #f0f0f0;
  color: #333;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 10px;
}

/* Как это работает */
.workflow-steps {
  max-width: 800px;
  margin: 0 auto;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 50px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.step-number {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #333, #666);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
}

.step-content h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.step-content p {
  color: #555;
  line-height: 1.7;
}

/* Юридическая информация */
.legal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.legal-card {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.legal-icon {
  font-size: 2.5rem;
  margin-bottom: 25px;
}

.legal-card h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.legal-card p {
  color: #555;
  line-height: 1.7;
}

.warning-card {
  background: linear-gradient(135deg, #fff8e1, #ffecb3);
  border: 2px solid #ffb300;
  border-radius: 20px;
  padding: 40px;
  margin-top: 40px;
}

.warning-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.warning-icon {
  font-size: 2rem;
}

.warning-card h3 {
  font-size: 1.5rem;
  color: #e65100;
  margin: 0;
}

.warning-card p {
  color: #555;
  line-height: 1.7;
  font-size: 1.1rem;
}

/* Что мы не делаем */
.donts-list {
  max-width: 800px;
  margin: 0 auto;
}

.dont-item {
  display: flex;
  align-items: flex-start;
  gap: 25px;
  margin-bottom: 30px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.dont-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.dont-item h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.dont-item p {
  color: #555;
  line-height: 1.6;
}

/* Поддержка */
.support-card {
  background: white;
  border-radius: 24px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  max-width: 700px;
  margin: 0 auto;
}

.support-icon {
  font-size: 3rem;
  margin-bottom: 30px;
}

.support-card h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.support-card p {
  color: #555;
  line-height: 1.7;
  margin-bottom: 15px;
}

.support-note {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  font-size: 1rem;
  margin-top: 25px;
}

/* Футер */
.footer {
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid #e0e0e0;
}

.footer-content {
  text-align: center;
}

.update-date {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.footer-note {
  color: #666;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Адаптивность */
@media (max-width: 768px) {
  .back-button {
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    font-size: 0.95rem;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .principles-grid,
  .legal-grid {
    grid-template-columns: 1fr;
  }
  
  .step {
    flex-direction: column;
    gap: 20px;
    padding: 30px;
  }
  
  .step-number {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .intro-card,
  .support-card {
    padding: 40px 25px;
  }
  
  .dont-item {
    padding: 25px 20px;
  }
  
  .warning-card {
    padding: 30px 25px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .header {
    padding: 60px 0 40px;
  }
  
  .back-button {
    top: 15px;
    left: 15px;
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  
  .principle-card,
  .legal-card {
    padding: 30px 20px;
  }
}
</style>