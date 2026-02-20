<template>
  <div class="auctions-page">
    <!-- Шапка с балансом -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">
            <i class="fas fa-stopwatch logo-icon"></i>
            Timedid
          </router-link>
          <div class="user-balance" @click="showBalanceDetails">
            <i class="fas fa-wallet"></i>
            Баланс: <span class="balance-amount">{{ formatBalance(balance) }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Основное содержимое -->
    <main class="main-content">
      <div class="container">
        <!-- Заголовок страницы -->
        <div class="page-header">
          <h1 class="page-title">Активные торги</h1>
          <router-link to="/profile" class="back-button">
            <i class="bt_create_torg"></i> Создать приложение
          </router-link>
          <router-link to="/" class="back-button">
            <i class="fas fa-arrow-left"></i> Вернуться в профиль
          </router-link>
        </div>

        <!-- Фильтры -->
        <div class="filters-bar">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Поиск по лотам..." 
              v-model="searchQuery"
              @input="handleSearch"
            >
          </div>
          
          <select class="filter-select" v-model="selectedCategory" @change="filterAuctions">
            <option value="all">Все категории</option>
            <option value="real-estate">Недвижимость</option>
            <option value="cars">Автомобили</option>
            <option value="electronics">Электроника</option>
            <option value="antiques">Антиквариат</option>
          </select>
          
          <select class="filter-select" v-model="selectedSort" @change="sortAuctions">
            <option value="date-desc">Сортировка: по дате</option>
            <option value="date-asc">Сначала старые</option>
            <option value="price-asc">По цене (возрастание)</option>
            <option value="price-desc">По цене (убывание)</option>
          </select>
          
          <div class="stats-counter">
            <i class="fas fa-bullhorn"></i>
            {{ filteredAuctions.length }} активных лотов
          </div>
        </div>

        <!-- Сетка торгов -->
        <div class="auctions-grid">
          <div 
            v-for="auction in filteredAuctions" 
            :key="auction.id" 
            class="auction-card"
            @click="goToAuction(auction.id)"
          >
            <div class="auction-image-container">
              <div class="image-placeholder" :style="{ background: auction.imageGradient }">
                <i :class="auction.icon"></i>
              </div>
              <div class="time-badge">
                <i class="fas fa-clock"></i> {{ formatTimeLeft(auction.timeLeft) }}
              </div>
            </div>
            
            <div class="auction-content">
              <!-- Владелец -->
              <div class="owner-info">
                <div class="owner-avatar">{{ getInitials(auction.ownerName) }}</div>
                <div class="owner-details">
                  <div class="owner-name">{{ auction.ownerName }}</div>
                  <div class="owner-rating">
                    <i class="fas fa-star rating-star"></i>
                    {{ auction.rating }} ({{ auction.reviews }} отзывов) • {{ auction.sellerInfo }}
                  </div>
                </div>
              </div>

              <!-- Название -->
              <h3 class="auction-title">{{ auction.title }}</h3>

              <!-- Описание -->
              <div class="auction-description">
                "{{ auction.description }}"
              </div>

              <!-- Время торгов -->
              <div class="auction-time">
                <div class="time-row">
                  <div class="time-label">
                    <i class="fas fa-play time-icon"></i>
                    Начало торгов:
                  </div>
                  <div class="time-value">{{ formatDate(auction.startTime) }}</div>
                </div>
                <div class="time-row">
                  <div class="time-label">
                    <i class="fas fa-flag-checkered time-icon"></i>
                    Конец торгов:
                  </div>
                  <div class="time-value">{{ formatDate(auction.endTime) }}</div>
                </div>
              </div>

              <!-- Детали -->
              <div class="auction-details">
                <span 
                  v-for="detail in auction.details" 
                  :key="detail.text" 
                  class="detail-item"
                >
                  <i :class="detail.icon"></i>
                  {{ detail.text }}
                </span>
              </div>

              <!-- Кнопка -->
              <button class="details-button" @click.stop="participateInAuction(auction.id)">
                <i class="fas fa-gavel"></i> Участвовать в торгах
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Футер -->
    <footer class="footer">
      <div class="container">
        <p>© {{ currentYear }} Timedid. Все права защищены. Торгуйте ответственно.</p>
        <div class="footer-links">
          <router-link to="/rules">Правила торгов</router-link>
          <router-link to="/privacy">Конфиденциальность</router-link>
          <router-link to="/support">Поддержка</router-link>
          <router-link to="/about">О компании</router-link>
          <router-link to="/blog">Блог</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Реактивные данные
const balance = ref(47850)
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedSort = ref('date-desc')
const currentYear = ref(new Date().getFullYear())

// Данные аукционов
const auctions = ref([
  {
    id: 1,
    category: 'real-estate',
    title: 'Продаю дом 19 квадратных метров в Подмосковье',
    description: 'Продаю уютный дом в экологически чистом районе. Построен в 2018 году, все коммуникации подведены. Идеально подходит для летнего отдыха или постоянного проживания. Рядом лес и озеро. Торги начинаются с минимальной ставки.',
    ownerName: 'Сергей Петров',
    rating: 4.8,
    reviews: 42,
    sellerInfo: 'Продавец 3 года',
    startTime: '2026-01-07T18:08:00',
    endTime: '2026-01-15T19:00:00',
    timeLeft: { days: 3, hours: 12, minutes: 8, seconds: 45 },
    icon: 'fas fa-home',
    imageGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    details: [
      { icon: 'fas fa-ruler-combined', text: '19 м²' },
      { icon: 'fas fa-bed', text: '1 спальня' },
      { icon: 'fas fa-map-marker-alt', text: 'Московская обл.' },
      { icon: 'fas fa-tree', text: 'Участок 4 сотки' }
    ]
  },
  {
    id: 2,
    category: 'cars',
    title: 'Toyota Camry 2018 года в идеальном состоянии',
    description: 'Продаю свой Toyota Camry 2018 года. Машина в отличном состоянии, весь сервис у официального дилера. Никаких ДТП, один владелец. Салон как новый, дополнительно установлена мультимедиа с CarPlay. Продаю из-за переезда в другую страну.',
    ownerName: 'Анна Кузнецова',
    rating: 4.9,
    reviews: 67,
    sellerInfo: 'Продавец 5 лет',
    startTime: '2026-01-08T10:00:00',
    endTime: '2026-01-18T20:00:00',
    timeLeft: { days: 8, hours: 10, minutes: 0, seconds: 22 },
    icon: 'fas fa-car',
    imageGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    details: [
      { icon: 'fas fa-tachometer-alt', text: '85 000 км' },
      { icon: 'fas fa-gas-pump', text: 'Бензин 2.5' },
      { icon: 'fas fa-cog', text: 'Автомат' },
      { icon: 'fas fa-palette', text: 'Черный металлик' }
    ]
  },
  {
    id: 3,
    category: 'antiques',
    title: 'Коллекция редких монет СССР 1920-1990 годов',
    description: 'Продаю личную коллекцию из 45 редких монет СССР. Все монеты в отличном состоянии, многие - proof quality. В коллекции присутствуют редкие экземпляры 1924, 1947 и 1958 годов. Каждая монета хранилась в индивидуальном капсуле. Полный каталог прилагается.',
    ownerName: 'Владимир Морозов',
    rating: 5.0,
    reviews: 23,
    sellerInfo: 'Коллекционер',
    startTime: '2026-01-09T14:30:00',
    endTime: '2026-01-16T12:00:00',
    timeLeft: { days: 5, hours: 21, minutes: 30, seconds: 15 },
    icon: 'fas fa-coins',
    imageGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    details: [
      { icon: 'fas fa-coins', text: '45 монет' },
      { icon: 'fas fa-history', text: '1920-1990 гг.' },
      { icon: 'fas fa-certificate', text: 'Сертификаты' },
      { icon: 'fas fa-box-open', text: 'В капсулах' }
    ]
  },
  {
    id: 4,
    category: 'antiques',
    title: 'Винтажная гитара Gibson Les Paul 1978 года',
    description: 'Продаю винтажную гитару Gibson Les Paul Custom 1978 года. Инструмент в коллекционном состоянии, все оригинальные детали. Звук насыщенный, характерный для винтажных Les Paul. Продаю из-за сокращения коллекции. К гитаре прилагается оригинальный кейс и документация.',
    ownerName: 'Екатерина Смирнова',
    rating: 4.7,
    reviews: 31,
    sellerInfo: 'Антиквар',
    startTime: '2026-01-10T09:00:00',
    endTime: '2026-01-20T18:00:00',
    timeLeft: { days: 10, hours: 9, minutes: 0, seconds: 0 },
    icon: 'fas fa-guitar',
    imageGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    details: [
      { icon: 'fas fa-calendar-alt', text: '1978 год' },
      { icon: 'fas fa-guitar', text: 'Gibson Les Paul' },
      { icon: 'fas fa-palette', text: 'Черный' },
      { icon: 'fas fa-music', text: 'Оригинальный звук' }
    ]
  }
])

// Таймер для обновления времени
let timer

onMounted(() => {
  timer = setInterval(() => {
    auctions.value.forEach(auction => {
      // Обновляем время для демонстрации
      if (auction.timeLeft.seconds > 0) {
        auction.timeLeft.seconds--
      } else {
        auction.timeLeft.seconds = 59
        if (auction.timeLeft.minutes > 0) {
          auction.timeLeft.minutes--
        } else {
          auction.timeLeft.minutes = 59
          if (auction.timeLeft.hours > 0) {
            auction.timeLeft.hours--
          } else {
            auction.timeLeft.hours = 23
            if (auction.timeLeft.days > 0) {
              auction.timeLeft.days--
            }
          }
        }
      }
    })
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// Вычисляемые свойства
const filteredAuctions = computed(() => {
  let result = auctions.value.filter(auction => {
    // Фильтрация по категории
    if (selectedCategory.value !== 'all' && auction.category !== selectedCategory.value) {
      return false
    }
    
    // Фильтрация по поиску
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return auction.title.toLowerCase().includes(query) ||
             auction.description.toLowerCase().includes(query) ||
             auction.ownerName.toLowerCase().includes(query)
    }
    
    return true
  })
  
  // Сортировка
  switch (selectedSort.value) {
    case 'date-asc':
      result.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      break
    case 'price-asc':
      // Здесь можно добавить сортировку по цене, если добавим price в данные
      break
    case 'price-desc':
      // Здесь можно добавить сортировку по цене, если добавим price в данные
      break
    case 'date-desc':
    default:
      result.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
  }
  
  return result
})

// Методы
const formatBalance = (amount) => {
  return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(',', '')
}

const formatTimeLeft = (time) => {
  return `${time.days} дней ${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const showBalanceDetails = () => {
  // Можно добавить модальное окно с деталями баланса
  alert(`Ваш текущий баланс: ${formatBalance(balance.value)}`)
}

const handleSearch = () => {
  // Дебаунс можно добавить при необходимости
  console.log('Search query:', searchQuery.value)
}

const filterAuctions = () => {
  console.log('Selected category:', selectedCategory.value)
}

const sortAuctions = () => {
  console.log('Selected sort:', selectedSort.value)
}

const goToAuction = (auctionId) => {
  router.push(`/auction/${auctionId}`)
}

const participateInAuction = (auctionId) => {
  // Здесь логика участия в аукционе
  alert(`Участие в аукционе ${auctionId}`)
  // Можно открыть модальное окно или перейти на страницу аукциона
}
</script>

<style scoped>
/* Базовые стили */
.auctions-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
  background: #f5f7fa;
  color: #212529;
  min-height: 100vh;
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
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
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
  font-size: 26px;
  font-weight: 800;
  color: #212529;
  text-decoration: none;
  transition: color 0.3s;
}

.logo:hover {
  color: #28a745;
}

.logo-icon {
  color: #28a745;
  text-shadow: 0 2px 5px rgba(40, 167, 69, 0.2);
}

/* Баланс пользователя */
.user-balance {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #212529;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s;
}

.user-balance:hover {
  border-color: #28a745;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
}

.balance-amount {
  color: #28a745;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  font-size: 17px;
}

/* Основное содержимое */
.main-content {
  padding: 30px 0 50px;
  flex: 1;
}

/* Заголовок страницы */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e1e5eb;
}
.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #212529;
  position: relative;
  padding-left: 15px;
}

.page-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
  width: 5px;
  background: #28a745;
  border-radius: 3px;
}

/* Кнопка возврата */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #ffffff;
  color: #495057;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  font-size: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background: #f8f9fa;
  border-color: #28a745;
  color: #28a745;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(40, 167, 69, 0.15);
}

/* Фильтры и поиск */
.filters-bar {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5eb;
}

.search-box {
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px 15px;
  border: 1px solid #dee2e6;
  transition: border-color 0.3s;
}

.search-box:focus-within {
  border-color: #28a745;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #212529;
  outline: none;
  padding: 5px 10px;
}

.search-icon {
  color: #6c757d;
}

.filter-select {
  padding: 10px 15px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: #ffffff;
  color: #495057;
  font-weight: 500;
  min-width: 150px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filter-select:hover {
  border-color: #28a745;
}

.stats-counter {
  background: #28a745;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Сетка торгов */
.auctions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
}

/* Карточка аукциона */
.auction-card {
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e5eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
}

.auction-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: #28a745;
}

.auction-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #28a745, #20c997);
  opacity: 0;
  transition: opacity 0.3s;
}

.auction-card:hover::before {
  opacity: 1;
}

.bt_create_torg i{
  color: green;
}

/* Изображение */
.auction-image-container {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.image-placeholder i {
  font-size: 60px;
  opacity: 0.9;
}

.time-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(33, 37, 41, 0.9);
  color: white;
  padding: 8px 15px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(5px);
}

/* Контент карточки */
.auction-content {
  padding: 25px;
}

/* Информация о владельце */
.owner-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
}

.owner-avatar {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #495057 0%, #212529 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.owner-details {
  flex: 1;
}

.owner-name {
  font-weight: 700;
  color: #212529;
  font-size: 16px;
  margin-bottom: 3px;
}

.owner-rating {
  font-size: 13px;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 5px;
}

.rating-star {
  color: #ffc107;
}

/* Название лота */
.auction-title {
  font-size: 20px;
  font-weight: 800;
  color: #212529;
  margin-bottom: 15px;
  line-height: 1.4;
}

/* Описание от пользователя */
.auction-description {
  color: #495057;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #dee2e6;
}

/* Время торгов */
.auction-time {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 20px;
  border: 1px solid #dee2e6;
}

.time-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 15px;
  align-items: center;
}

.time-row:last-child {
  margin-bottom: 0;
}

.time-label {
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.time-value {
  color: #212529;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  font-size: 15px;
}

.time-icon {
  color: #28a745;
  width: 18px;
}

/* Детали лота */
.auction-details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
}

.detail-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #f8f9fa;
  padding: 8px 14px;
  border-radius: 25px;
  font-size: 14px;
  color: #495057;
  border: 1px solid #dee2e6;
  transition: all 0.2s;
}

.detail-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.detail-icon {
  color: #28a745;
}

/* Кнопка подробнее */
.details-button {
  width: 100%;
  padding: 14px;
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
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.details-button:hover {
  background: linear-gradient(135deg, #218838, #1aa179);
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(40, 167, 69, 0.3);
}

/* Футер */
.footer {
  background: #ffffff;
  border-top: 2px solid #e1e5eb;
  padding: 25px 0;
  text-align: center;
  color: #6c757d;
  font-size: 15px;
  margin-top: auto;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 15px;
}

.footer-links a {
  color: #495057;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #28a745;
  text-decoration: underline;
}

/* Адаптив */
@media (max-width: 1200px) {
  .auctions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .container {
    padding: 0 15px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .auctions-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .page-header {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
  
  .filters-bar {
    flex-direction: column;
  }
  
  .search-box {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 26px;
  }
  
  .auction-image-container {
    height: 200px;
  }
  
  .auction-content {
    padding: 20px;
  }
  
  .owner-info {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>