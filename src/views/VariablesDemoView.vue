<template>
  <div class="variables-demo">
    <div class="demo-section">
      <h2 class="demo-section__title">颜色系统</h2>
      
      <div class="demo-block">
        <h3 class="demo-block__title">主色调</h3>
        <div class="color-grid">
          <div
            v-for="i in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]"
            :key="i"
            class="color-item"
            :style="{ 
              backgroundColor: `var(--color-primary-${i})`, 
              color: i > 400 ? '#ffffff' : '#000000' 
            }"
          >
            <span class="color-item__label">primary-{{ i }}</span>
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__title">功能色</h3>
        <div class="color-grid">
          <div class="color-item" :style="{ backgroundColor: 'var(--color-success)' }">
            <span class="color-item__label">Success</span>
          </div>
          <div class="color-item" :style="{ backgroundColor: 'var(--color-warning)' }">
            <span class="color-item__label">Warning</span>
          </div>
          <div class="color-item" :style="{ backgroundColor: 'var(--color-danger)' }">
            <span class="color-item__label">Danger</span>
          </div>
          <div class="color-item" :style="{ backgroundColor: 'var(--color-info-500)' }">
            <span class="color-item__label">Info</span>
          </div>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__title">中性色</h3>
        <div class="color-grid">
          <div
            v-for="i in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]"
            :key="i"
            class="color-item"
            :style="{ 
              backgroundColor: `var(--color-gray-${i})`, 
              color: i > 400 ? '#ffffff' : '#000000' 
            }"
          >
            <span class="color-item__label">gray-{{ i }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-section__title">字体系统</h2>
      
      <div class="demo-block">
        <h3 class="demo-block__title">字号示例</h3>
        <div class="font-size-demo">
          <p class="font-size-demo__item" :style="{ fontSize: 'var(--font-size-xs)' }">
            Extra Small (12px) - 辅助文本
          </p>
          <p class="font-size-demo__item" :style="{ fontSize: 'var(--font-size-sm)' }">
            Small (13px) - 小号文本
          </p>
          <p class="font-size-demo__item" :style="{ fontSize: 'var(--font-size-base)' }">
            Base (14px) - 基础文本
          </p>
          <p class="font-size-demo__item" :style="{ fontSize: 'var(--font-size-md)' }">
            Medium (16px) - 中号文本
          </p>
          <p class="font-size-demo__item" :style="{ fontSize: 'var(--font-size-lg)' }">
            Large (18px) - 大号文本
          </p>
          <p class="font-size-demo__item" :style="{ fontSize: 'var(--font-size-xl)' }">
            Extra Large (20px) - 特大文本
          </p>
          <p class="font-size-demo__item" :style="{ fontSize: 'var(--font-size-2xl)' }">
            2XL (24px) - 标题
          </p>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__title">字重示例</h3>
        <div class="font-weight-demo">
          <p :style="{ fontWeight: 'var(--font-weight-light)' }">Light (300)</p>
          <p :style="{ fontWeight: 'var(--font-weight-normal)' }">Normal (400)</p>
          <p :style="{ fontWeight: 'var(--font-weight-medium)' }">Medium (500)</p>
          <p :style="{ fontWeight: 'var(--font-weight-semibold)' }">Semibold (600)</p>
          <p :style="{ fontWeight: 'var(--font-weight-bold)' }">Bold (700)</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-section__title">间距系统</h2>
      
      <div class="demo-block">
        <h3 class="demo-block__title">间距示例</h3>
        <div class="spacing-demo">
          <div
            v-for="i in [1, 2, 3, 4, 6, 8]"
            :key="i"
            class="spacing-item"
          >
            <div
              class="spacing-box"
              :style="{ padding: `var(--spacing-${i})` }"
            >
              <span>spacing-{{ i }}</span>
              <span>({{ i * 4 }}px)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-section__title">圆角系统</h2>
      
      <div class="demo-block">
        <h3 class="demo-block__title">圆角示例</h3>
        <div class="radius-demo">
          <div class="radius-item" :style="{ borderRadius: 'var(--radius-none)' }">
            radius-none (0)
          </div>
          <div class="radius-item" :style="{ borderRadius: 'var(--radius-sm)' }">
            radius-sm (2px)
          </div>
          <div class="radius-item" :style="{ borderRadius: 'var(--radius-base)' }">
            radius-base (4px)
          </div>
          <div class="radius-item" :style="{ borderRadius: 'var(--radius-md)' }">
            radius-md (6px)
          </div>
          <div class="radius-item" :style="{ borderRadius: 'var(--radius-lg)' }">
            radius-lg (8px)
          </div>
          <div class="radius-item" :style="{ borderRadius: 'var(--radius-xl)' }">
            radius-xl (12px)
          </div>
          <div class="radius-item radius-circle" :style="{ borderRadius: 'var(--radius-full)' }">
            radius-full (9999px)
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-section__title">阴影系统</h2>
      
      <div class="demo-block">
        <h3 class="demo-block__title">阴影示例</h3>
        <div class="shadow-demo">
          <div class="shadow-item" :style="{ boxShadow: 'var(--shadow-sm)' }">
            shadow-sm
          </div>
          <div class="shadow-item" :style="{ boxShadow: 'var(--shadow-base)' }">
            shadow-base
          </div>
          <div class="shadow-item" :style="{ boxShadow: 'var(--shadow-md)' }">
            shadow-md
          </div>
          <div class="shadow-item" :style="{ boxShadow: 'var(--shadow-lg)' }">
            shadow-lg
          </div>
          <div class="shadow-item" :style="{ boxShadow: 'var(--shadow-xl)' }">
            shadow-xl
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-section__title">语义化颜色使用示例</h2>
      
      <div class="demo-block">
        <h3 class="demo-block__title">实际应用</h3>
        <div class="semantic-demo">
          <button class="semantic-button semantic-button--primary">
            主要按钮
          </button>
          <button class="semantic-button semantic-button--success">
            成功按钮
          </button>
          <button class="semantic-button semantic-button--warning">
            警告按钮
          </button>
          <button class="semantic-button semantic-button--danger">
            危险按钮
          </button>
        </div>

        <div class="semantic-card">
          <h3 class="semantic-card__title">卡片标题</h3>
          <p class="semantic-card__text">
            这是一段示例文本，展示了如何使用语义化颜色变量。
            卡片背景使用 var(--color-bg-base)，边框使用 var(--color-border-light)。
          </p>
          <p class="semantic-card__text semantic-card__text--secondary">
            这是次要文本，使用 var(--color-text-secondary)。
          </p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2 class="demo-section__title">工具类示例</h2>
      
      <div class="demo-block">
        <h3 class="demo-block__title">文本工具类</h3>
        <div class="utility-demo">
          <p class="text-primary">text-primary</p>
          <p class="text-success">text-success</p>
          <p class="text-warning">text-warning</p>
          <p class="text-danger">text-danger</p>
          <p class="text-regular">text-regular</p>
          <p class="text-secondary">text-secondary</p>
        </div>
      </div>

      <div class="demo-block">
        <h3 class="demo-block__title">间距工具类</h3>
        <div class="utility-demo">
          <div class="p-4 bg-white shadow-md rounded-lg mb-4">
            p-4 bg-white shadow-md rounded-lg mb-4
          </div>
          <div class="m-4 p-2 bg-primary text-white rounded-base">
            m-4 p-2 bg-primary text-white rounded-base
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.variables-demo {
  padding: var(--spacing-6);
  max-width: 1200px;
  margin: var(--spacing-0) auto;
}

.demo-section {
  margin-bottom: var(--spacing-12);
}

.demo-section__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
}

.demo-block {
  margin-bottom: var(--spacing-8);
}

.demo-block__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-regular);
  margin-bottom: var(--spacing-4);
}

/* 颜色网格 */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--spacing-3);
}

.color-item {
  padding: var(--spacing-4);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
}

.color-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.color-item__label {
  margin-bottom: var(--spacing-1);
}

.color-item__value {
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

/* 字体演示 */
.font-size-demo {
  background-color: var(--color-bg-base);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
}

.font-size-demo__item {
  margin-bottom: var(--spacing-3);
  color: var(--color-text-primary);
}

.font-weight-demo {
  background-color: var(--color-bg-base);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
}

.font-weight-demo p {
  margin-bottom: var(--spacing-3);
  color: var(--color-text-primary);
}

/* 间距演示 */
.spacing-demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.spacing-item {
  flex-shrink: 0;
}

.spacing-box {
  background-color: var(--color-primary-50);
  border: var(--border-width-base) var(--border-style-solid) var(--color-primary-200);
  border-radius: var(--radius-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-sm);
  color: var(--color-primary-700);
  min-width: 80px;
}

/* 圆角演示 */
.radius-demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.radius-item {
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--color-primary-50);
  border: var(--border-width-base) var(--border-style-solid) var(--color-primary-200);
  color: var(--color-primary-700);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
}

.radius-item:hover {
  background-color: var(--color-primary-100);
}

.radius-circle {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* 阴影演示 */
.shadow-demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-6);
}

.shadow-item {
  padding: var(--spacing-6);
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  min-width: 120px;
}

/* 语义化演示 */
.semantic-demo {
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  flex-wrap: wrap;
}

.semantic-button {
  padding: var(--spacing-3) var(--spacing-6);
  border: var(--border-width-base) var(--border-style-solid) transparent;
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: #ffffff;
  cursor: pointer;
  transition: var(--transition-base);
}

.semantic-button--primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.semantic-button--primary:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.semantic-button--success {
  background-color: var(--color-success);
  border-color: var(--color-success);
}

.semantic-button--success:hover {
  background-color: var(--color-success-hover);
  border-color: var(--color-success-hover);
}

.semantic-button--warning {
  background-color: var(--color-warning);
  border-color: var(--color-warning);
}

.semantic-button--warning:hover {
  background-color: var(--color-warning-hover);
  border-color: var(--color-warning-hover);
}

.semantic-button--danger {
  background-color: var(--color-danger);
  border-color: var(--color-danger);
}

.semantic-button--danger:hover {
  background-color: var(--color-danger-hover);
  border-color: var(--color-danger-hover);
}

.semantic-card {
  background-color: var(--color-bg-base);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.semantic-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
}

.semantic-card__text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text-regular);
  margin-bottom: var(--spacing-3);
}

.semantic-card__text--secondary {
  color: var(--color-text-secondary);
}

/* 工具类演示 */
.utility-demo {
  background-color: var(--color-bg-base);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: var(--border-width-base) var(--border-style-solid) var(--color-border-light);
}

.utility-demo p {
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-base);
}
</style>
