<template>
  <div class="terms-page">
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
        <h1 class="title">Правила использования платформы</h1>
        <p class="subtitle">Ознакомьтесь с условиями работы на нашей блокчейн-торговой площадке</p>
      </header>

      <!-- Основной контент -->
      <main class="content">
        <!-- Быстрый обзор -->
        <section class="section quick-overview">
          <div class="overview-card">
            <div class="overview-icon">📋</div>
            <div class="overview-content">
              <h2>Краткий обзор</h2>
              <p>Перед использованием платформы, пожалуйста, ознакомьтесь с этими правилами. Они обеспечивают безопасную и честную торговую среду для всех участников.</p>
              <div class="last-update">Последнее обновление: {{ currentDate }}</div>
            </div>
          </div>
        </section>

        <!-- Разрешенные действия -->
        <section class="section allowed">
          <div class="section-header">
            <span class="section-badge allowed-badge">✅</span>
            <h2 class="section-title">Что разрешено</h2>
          </div>
          
          <div class="rules-grid">
            <div class="rule-card allowed-card">
              <div class="rule-icon">🔄</div>
              <div class="rule-content">
                <h3>Безопасная торговля</h3>
                <p>Создавать предложения о покупке/продаже цифровых активов между проверенными пользователями</p>
                <ul class="rule-details">
                  <li>Устанавливайте справедливые цены</li>
                  <li>Четко описывайте условия сделки</li>
                  <li>Соблюдайте договоренности</li>
                </ul>
              </div>
            </div>

            <div class="rule-card allowed-card">
              <div class="rule-icon">🔍</div>
              <div class="rule-content">
                <h3>Использование escrow</h3>
                <p>Применять условное депонирование (escrow) для защиты крупных сделок</p>
                <ul class="rule-details">
                  <li>Используйте для сделок от 0.1 ETH</li>
                  <li>Согласовывайте условия escrow заранее</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Запрещенные действия -->
        <section class="section prohibited">
          <div class="section-header">
            <span class="section-badge prohibited-badge">⛔</span>
            <h2 class="section-title">Что запрещено</h2>
          </div>
          
          <div class="rules-grid">
            <div class="rule-card prohibited-card">
              <div class="rule-icon">🚫</div>
              <div class="rule-content">
                <h3>Незаконная деятельность</h3>
                <p>Строго запрещена торговля запрещенными товарами и услугами</p>
                <ul class="rule-details prohibited-list">
                  <li>Оружие и боеприпасы</li>
                  <li>Наркотические вещества</li>
                  <li>Краденое имущество</li>
                  <li>Контрафактная продукция</li>
                  <li>Персональные данные</li>
                </ul>
              </div>
            </div>

            <div class="rule-card prohibited-card">
              <div class="rule-icon">🔄</div>
              <div class="rule-content">
                <h3>Мошенничество</h3>
                <p>Запрещены любые формы обмана и недобросовестного поведения</p>
                <ul class="rule-details prohibited-list">
                  <li>Фишинг и социальная инженерия</li>
                  <li>Поддельные отзывы</li>
                  <li>Схемы быстрого обогащения</li>
                  <li>Несуществующие товары</li>
                  <li>Обманные схемы оплаты</li>
                  <li>Переходить в чаты</li>
                </ul>
              </div>
            </div>

            <div class="rule-card prohibited-card">
              <div class="rule-icon">🤬</div>
              <div class="rule-content">
                <h3>Токсичное поведение</h3>
                <p>Не допускается оскорбительное или дискриминационное поведение</p>
                <ul class="rule-details prohibited-list">
                  <li>Угрозы и запугивание</li>
                  <li>Дискриминация по любым признакам</li>
                  <li>Распространение дезинформации</li>
                  <li>Манипуляции и давление</li>
                </ul>
              </div>
            </div>

            <div class="rule-card prohibited-card">
              <div class="rule-icon">⚖️</div>
              <div class="rule-content">
                <h3>Нарушения безопасности</h3>
                <p>Запрещены действия, угрожающие безопасности платформы</p>
                <ul class="rule-details prohibited-list">
                  <li>Взлом и попытки несанкционированного доступа</li>
                  <li>Распространение вредоносного ПО</li>
                  <li>Атаки на сеть блокчейн</li>
                  <li>Эксплуатация уязвимостей</li>
                  <li>Создание фейковых аккаунтов</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Ответственность пользователей -->
        <section class="section responsibility">
          <h2 class="section-title">Обязанности пользователей</h2>
          
          <div class="responsibility-content">
            <div class="responsibility-card">
              <div class="responsibility-header">
                <span class="responsibility-number">01</span>
                <h3>Проверка контрагентов</h3>
              </div>
              <p>Вы самостоятельно проверяете историю сделок контрагента перед заключением соглашения.</p>
            </div>

            <div class="responsibility-card">
              <div class="responsibility-header">
                <span class="responsibility-number">02</span>
                <h3>Безопасность аккаунта</h3>
              </div>
              <p>Вы несете полную ответственность за сохранность приватных ключей и доступов к вашему кошельку.</p>
            </div>

            <div class="responsibility-card">
              <div class="responsibility-header">
                <span class="responsibility-number">03</span>
                <h3>Соблюдение законов</h3>
              </div>
              <p>Вы обязуетесь соблюдать законодательство вашей страны относительно криптовалют и торговли.</p>
            </div>

            <div class="responsibility-card">
              <div class="responsibility-header">
                <span class="responsibility-number">04</span>
                <h3>Достоверность информации</h3>
              </div>
              <p>Вы предоставляете точную информацию о товарах/услугах и не вводите других пользователей в заблуждение.</p>
            </div>
          </div>
        </section>

        <!-- Важные примечания -->
        <section class="section notes">
          <div class="notes-card">
            <div class="notes-header">
              <span class="notes-icon">💡</span>
              <h3>Важные примечания</h3>
            </div>
            <div class="notes-content">
              <div class="note-item">
                <strong>Децентрализованный характер:</strong> Платформа является инструментом для взаимодействия пользователей. Мы не выступаем посредником в сделках.
              </div>
              <div class="note-item">
                <strong>Невозвратность транзакций:</strong> Все операции в блокчейне необратимы. Проверяйте адреса получателей внимательно.
              </div>
              <div class="note-item">
                <strong>Изменение правил:</strong> Мы оставляем за собой право обновлять эти правила. Актуальная версия всегда доступна на этой странице.
              </div> 
            </div>
          </div>
        </section>

        <!-- Подтверждение -->
        <section class="section confirmation">
          <div class="confirmation-card">
            <div class="confirmation-icon">✓</div>
            <div>
              <h3>Подтверждение согласия</h3>
              <p>Используя нашу платформу, вы подтверждаете, что ознакомились с этими правилами и согласны их соблюдать.</p>
              <p class="confirmation-note">Незнание правил не освобождает от ответственности за их нарушение.</p>
            </div>
          </div>
        </section>
      </main>

      <!-- Футер -->
      <footer class="footer">
        <div class="footer-content">
          <p class="footer-text">Соблюдение этих правил делает торговую площадку безопасной для всех участников.</p>
          <div class="footer-links">
            
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsOfUse',
  
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
.terms-page {
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
  font-size: 3rem;
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

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
}

.section-badge {
  font-size: 2.5rem;
}

.allowed-badge {
  color: #4CAF50;
}

.prohibited-badge {
  color: #f44336;
}

/* Быстрый обзор */
.overview-card {
  background: white;
  border-radius: 24px;
  padding: 50px;
  display: flex;
  align-items: center;
  gap: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  max-width: 1000px;
  margin: 0 auto;
}

.overview-icon {
  font-size: 4rem;
  flex-shrink: 0;
}

.overview-content h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.overview-content p {
  color: #555;
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.last-update {
  color: #888;
  font-size: 0.95rem;
  font-style: italic;
}

/* Сетка правил */
.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.rule-card {
  background: white;
  border-radius: 20px;
  padding: 35px 30px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.4s ease;
}

.rule-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.allowed-card {
  border-top: 4px solid #4CAF50;
}

.prohibited-card {
  border-top: 4px solid #f44336;
}

.rule-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.rule-content h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.rule-content p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.rule-details {
  list-style: none;
  padding-left: 0;
  margin-top: 20px;
}

.rule-details li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
  color: #666;
  line-height: 1.5;
}

.allowed-card .rule-details li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
}

.prohibited-card .rule-details li::before {
  content: "✗";
  position: absolute;
  left: 0;
  color: #f44336;
  font-weight: bold;
}

.prohibited-list li {
  color: #666;
}

/* Ответственность пользователей */
.responsibility-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.responsibility-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

.responsibility-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.responsibility-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #333, #666);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  flex-shrink: 0;
}

.responsibility-card h3 {
  font-size: 1.2rem;
  margin: 0;
  color: #1a1a1a;
}

.responsibility-card p {
  color: #555;
  line-height: 1.7;
}

/* Санкции */
.sanctions-list {
  max-width: 900px;
  margin: 0 auto;
}

.sanction-item {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 30px;
  padding: 35px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.sanction-level {
  flex-shrink: 0;
  width: 200px;
  padding: 12px 20px;
  border-radius: 50px;
  font-weight: 600;
  text-align: center;
}

.warning {
  background: #FFF3CD;
  color: #856404;
  border: 2px solid #FFEAA7;
}

.suspension {
  background: #F8D7DA;
  color: #721C24;
  border: 2px solid #F5C6CB;
}

.permanent {
  background: #343A40;
  color: white;
  border: 2px solid #23272B;
}

.sanction-content h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #1a1a1a;
}

.sanction-content p {
  color: #555;
  line-height: 1.7;
}

/* Важные примечания */
.notes-card {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 24px;
  padding: 50px;
  border: 2px solid #90caf9;
}

.notes-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.notes-icon {
  font-size: 2.5rem;
}

.notes-header h3 {
  font-size: 1.8rem;
  color: #1565C0;
  margin: 0;
}

.notes-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.note-item {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #2196F3;
  color: #333;
  line-height: 1.6;
}

/* Подтверждение */
.confirmation-card {
  background: white;
  border-radius: 24px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 2px solid #4CAF50;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 30px;
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.confirmation-card h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #1a1a1a;
  text-align: left;
}

.confirmation-card p {
  color: #555;
  line-height: 1.7;
  text-align: left;
  margin-bottom: 15px;
}

.confirmation-note {
  color: #666;
  font-style: italic;
  font-size: 0.95rem;
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

.footer-text {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 25px;
  max-width: 600px;
  margin: 0 auto 25px;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.footer-link {
  color: #2196F3;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #0d47a1;
  text-decoration: underline;
}

.footer-separator {
  color: #999;
}

/* Адаптивность */
@media (max-width: 992px) {
  .overview-card {
    flex-direction: column;
    text-align: center;
    padding: 40px 30px;
  }
  
  .confirmation-card {
    flex-direction: column;
    text-align: center;
  }
  
  .confirmation-card h3,
  .confirmation-card p {
    text-align: center;
  }
}

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
  
  .rules-grid,
  .responsibility-content {
    grid-template-columns: 1fr;
  }
  
  .sanction-item {
    flex-direction: column;
    gap: 20px;
    padding: 30px;
  }
  
  .sanction-level {
    width: 100%;
  }
  
  .overview-card,
  .notes-card,
  .confirmation-card {
    padding: 40px 25px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
  
  .footer-separator {
    display: none;
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
  
  .rule-card,
  .responsibility-card {
    padding: 25px 20px;
  }
  
  .section {
    margin-bottom: 60px;
  }
  
  .notes-content {
    gap: 15px;
  }
  
  .note-item {
    padding: 15px;
  }
}
</style>