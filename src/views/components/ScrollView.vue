<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Scroll 滚动条</h1>
      <p class="component-demo-view__description">
        自定义滚动条组件，支持自定义样式、平滑滚动、虚拟滚动等功能
      </p>
    </div>

    <!-- 基础用法 - 悬停显示滚动条 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法 - 悬停显示滚动条</h2>
      <p class="component-demo-view__section-desc">
        默认情况下滚动条不会显示，只有当鼠标悬停在滚动区域时才会平滑出现。
        这种设计保持了界面的整洁，同时提供了良好的用户体验。
      </p>
      <div class="component-demo-view__demo">
        <AleScroll height="200px" class="demo-scroll hover-demo">
          <div class="demo-content">
            <p v-for="i in 20" :key="i" class="demo-item">
              这是第 {{ i }} 行内容，将鼠标移入此区域查看滚动条效果...
            </p>
          </div>
        </AleScroll>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 主题样式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">主题样式</h2>
      <p class="component-demo-view__section-desc">支持 default、primary、dark 三种主题</p>
      <div class="component-demo-view__demo demo-themes">
        <div class="theme-item">
          <span class="theme-label">Default</span>
          <AleScroll height="150px" theme="default" class="demo-scroll">
            <div class="demo-content">
              <p v-for="i in 10" :key="i" class="demo-item">主题内容 {{ i }}</p>
            </div>
          </AleScroll>
        </div>
        <div class="theme-item">
          <span class="theme-label">Primary</span>
          <AleScroll height="150px" theme="primary" class="demo-scroll">
            <div class="demo-content">
              <p v-for="i in 10" :key="i" class="demo-item">主题内容 {{ i }}</p>
            </div>
          </AleScroll>
        </div>
        <div class="theme-item theme-dark">
          <span class="theme-label">Dark</span>
          <AleScroll height="150px" theme="dark" class="demo-scroll">
            <div class="demo-content dark-content">
              <p v-for="i in 10" :key="i" class="demo-item">主题内容 {{ i }}</p>
            </div>
          </AleScroll>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 尺寸设置 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">尺寸设置</h2>
      <p class="component-demo-view__section-desc">支持 small、medium、large 三种尺寸</p>
      <div class="component-demo-view__demo demo-sizes">
        <div class="size-item">
          <span class="size-label">Small</span>
          <AleScroll height="120px" size="small" class="demo-scroll">
            <div class="demo-content">
              <p v-for="i in 8" :key="i" class="demo-item">小尺寸 {{ i }}</p>
            </div>
          </AleScroll>
        </div>
        <div class="size-item">
          <span class="size-label">Medium</span>
          <AleScroll height="120px" size="medium" class="demo-scroll">
            <div class="demo-content">
              <p v-for="i in 8" :key="i" class="demo-item">中尺寸 {{ i }}</p>
            </div>
          </AleScroll>
        </div>
        <div class="size-item">
          <span class="size-label">Large</span>
          <AleScroll height="120px" size="large" class="demo-scroll">
            <div class="demo-content">
              <p v-for="i in 8" :key="i" class="demo-item">大尺寸 {{ i }}</p>
            </div>
          </AleScroll>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 滚动方向 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">滚动方向</h2>
      <p class="component-demo-view__section-desc">支持垂直、水平和双向滚动</p>
      <div class="component-demo-view__demo demo-directions">
        <div class="direction-item">
          <span class="direction-label">垂直滚动</span>
          <AleScroll height="150px" direction="vertical" class="demo-scroll">
            <div class="demo-content">
              <p v-for="i in 15" :key="i" class="demo-item">垂直内容 {{ i }}</p>
            </div>
          </AleScroll>
        </div>
        <div class="direction-item">
          <span class="direction-label">水平滚动</span>
          <AleScroll width="150px" direction="horizontal" class="demo-scroll horizontal-scroll">
            <div class="demo-content horizontal-content">
              <div v-for="i in 15" :key="i" class="horizontal-item">
                卡片 {{ i }}
              </div>
            </div>
          </AleScroll>
        </div>
        <div class="direction-item">
          <span class="direction-label">双向滚动</span>
          <AleScroll height="150px" width="150px" direction="both" class="demo-scroll">
            <div class="demo-content both-content">
              <div v-for="i in 20" :key="i" class="both-row">
                <span v-for="j in 10" :key="j" class="both-cell">{{ i }}-{{ j }}</span>
              </div>
            </div>
          </AleScroll>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="directionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 布局稳定性演示 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">布局稳定性</h2>
      <p class="component-demo-view__section-desc">
        滚动条的出现和消失不会影响内容布局。下方两个区域内容宽度相同，
        即使左侧滚动条显示/隐藏，内容区域也不会发生跳动。
      </p>
      <div class="component-demo-view__demo">
        <div class="layout-demo">
          <div class="layout-item">
            <span class="layout-label">悬停显示滚动条</span>
            <AleScroll height="150px" class="demo-scroll">
              <div class="demo-content">
                <p v-for="i in 10" :key="i" class="demo-item layout-test-item">
                  内容宽度测试 {{ i }}
                </p>
              </div>
            </AleScroll>
          </div>
          <div class="layout-item">
            <span class="layout-label">始终显示滚动条</span>
            <AleScroll height="150px" always class="demo-scroll">
              <div class="demo-content">
                <p v-for="i in 10" :key="i" class="demo-item layout-test-item">
                  内容宽度测试 {{ i }}
                </p>
              </div>
            </AleScroll>
          </div>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="layoutCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 始终显示滚动条 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">始终显示滚动条</h2>
      <p class="component-demo-view__section-desc">设置 always 属性让滚动条始终可见</p>
      <div class="component-demo-view__demo">
        <AleScroll height="150px" always class="demo-scroll">
          <div class="demo-content">
            <p v-for="i in 10" :key="i" class="demo-item">始终显示滚动条 {{ i }}</p>
          </div>
        </AleScroll>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="alwaysCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 原生滚动条 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">原生滚动条</h2>
      <p class="component-demo-view__section-desc">设置 native 属性使用浏览器原生滚动条</p>
      <div class="component-demo-view__demo">
        <AleScroll height="150px" native class="demo-scroll">
          <div class="demo-content">
            <p v-for="i in 10" :key="i" class="demo-item">原生滚动条样式 {{ i }}</p>
          </div>
        </AleScroll>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="nativeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 滚动控制 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">滚动控制</h2>
      <p class="component-demo-view__section-desc">通过 ref 调用组件方法控制滚动</p>
      <div class="component-demo-view__demo">
        <div class="control-buttons">
          <AleButton size="small" @click="scrollToTop">滚动到顶部</AleButton>
          <AleButton size="small" @click="scrollToBottom">滚动到底部</AleButton>
          <AleButton size="small" @click="scrollToMiddle">滚动到中间</AleButton>
        </div>
        <AleScroll
          ref="controlScrollRef"
          height="200px"
          class="demo-scroll"
          @scroll="handleScroll"
        >
          <div class="demo-content">
            <p v-for="i in 30" :key="i" class="demo-item" :class="{ highlight: i === 15 }">
              第 {{ i }} 行 {{ i === 15 ? '（中间位置）' : '' }}
            </p>
          </div>
        </AleScroll>
        <div class="scroll-info">
          <span>当前位置: {{ scrollPosition.scrollTop.toFixed(0) }}px</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="controlCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 加载更多 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">加载更多</h2>
      <p class="component-demo-view__section-desc">滚动到底部时触发加载更多事件</p>
      <div class="component-demo-view__demo">
        <AleScroll
          height="250px"
          :load-offset="20"
          class="demo-scroll"
          @load-more="handleLoadMore"
          @scroll-to-bottom="handleScrollToBottom"
        >
          <div class="demo-content">
            <div v-for="(item, index) in loadMoreItems" :key="index" class="demo-item load-more-item">
              <span class="item-index">{{ index + 1 }}</span>
              <span class="item-text">{{ item }}</span>
            </div>
            <div v-if="loading" class="loading-indicator">
              <AleLoading size="small" text="加载中..." />
            </div>
            <div v-if="finished" class="finished-indicator">
              没有更多数据了
            </div>
          </div>
        </AleScroll>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="loadMoreCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 大量数据性能测试 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">大量数据性能测试</h2>
      <p class="component-demo-view__section-desc">测试组件在大量数据下的性能表现</p>
      <div class="component-demo-view__demo">
        <div class="performance-info">
          <span>数据量: {{ largeDataCount }} 条</span>
          <AleButton size="small" @click="addMoreData">增加 1000 条</AleButton>
        </div>
        <AleScroll height="300px" class="demo-scroll performance-scroll">
          <div class="demo-content">
            <p v-for="i in largeDataCount" :key="i" class="demo-item">
              数据行 {{ i }} - {{ generateRandomText() }}
            </p>
          </div>
        </AleScroll>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="performanceCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AleScroll, AleButton, AleLoading } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';
import type { ScrollExpose, ScrollPosition } from 'ale-ui';

// 滚动控制
const controlScrollRef = ref<ScrollExpose | null>(null);
const scrollPosition = ref<ScrollPosition>({ scrollTop: 0, scrollLeft: 0 });

const scrollToTop = () => {
  controlScrollRef.value?.scrollToTop();
};

const scrollToBottom = () => {
  controlScrollRef.value?.scrollToBottom();
};

const scrollToMiddle = () => {
  const size = controlScrollRef.value?.getScrollSize();
  if (size) {
    controlScrollRef.value?.scrollTo({
      top: size.scrollHeight / 2 - size.clientHeight / 2,
      behavior: 'smooth'
    });
  }
};

const handleScroll = (position: ScrollPosition) => {
  scrollPosition.value = position;
};

// 加载更多
const loadMoreItems = ref<string[]>([]);
const loading = ref(false);
const finished = ref(false);
let loadCount = 0;

const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) =>
    `数据项 ${loadCount * 20 + i + 1} - ${generateRandomText()}`
  );
};

const handleLoadMore = () => {
  if (loading.value || finished.value) return;

  loading.value = true;
  setTimeout(() => {
    loadCount++;
    const newItems = generateItems(20);
    loadMoreItems.value.push(...newItems);
    loading.value = false;

    if (loadCount >= 5) {
      finished.value = true;
    }
  }, 1000);
};

const handleScrollToBottom = () => {
  console.log('滚动到底部');
};

// 性能测试
const largeDataCount = ref(1000);

const addMoreData = () => {
  largeDataCount.value += 1000;
};

const generateRandomText = () => {
  const texts = [
    '这是一条测试数据',
    'Scroll 组件性能优秀',
    '支持大量数据渲染',
    '滚动流畅无卡顿',
    '自定义滚动条样式',
    '支持多种主题切换',
    '响应式设计适配',
    '支持触摸设备'
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

// 初始化
onMounted(() => {
  loadMoreItems.value = generateItems(20);
});

// 代码示例
const basicCode = `<template>
  <AleScroll height="200px">
    <div class="content">
      <p v-for="i in 20" :key="i">
        这是第 {{ i }} 行内容
      </p>
    </div>
  </AleScroll>
</template>

<script setup lang="ts">
import { AleScroll } from 'ale-ui';
<\/script>`;

const themeCode = `<template>
  <!-- Default 主题 -->
  <AleScroll height="150px" theme="default">
    <div class="content">...</div>
  </AleScroll>

  <!-- Primary 主题 -->
  <AleScroll height="150px" theme="primary">
    <div class="content">...</div>
  </AleScroll>

  <!-- Dark 主题 -->
  <AleScroll height="150px" theme="dark">
    <div class="content">...</div>
  </AleScroll>
</template>`;

const sizeCode = `<template>
  <AleScroll height="120px" size="small">...</AleScroll>
  <AleScroll height="120px" size="medium">...</AleScroll>
  <AleScroll height="120px" size="large">...</AleScroll>
</template>`;

const directionCode = `<template>
  <!-- 垂直滚动 -->
  <AleScroll height="150px" direction="vertical">...</AleScroll>

  <!-- 水平滚动 -->
  <AleScroll direction="horizontal">...</AleScroll>

  <!-- 双向滚动 -->
  <AleScroll height="150px" direction="both">...</AleScroll>
</template>`;

const alwaysCode = `<template>
  <AleScroll height="150px" always>
    <div class="content">...</div>
  </AleScroll>
</template>`;

const nativeCode = `<template>
  <AleScroll height="150px" native>
    <div class="content">...</div>
  </AleScroll>
</template>`;

const controlCode = `<template>
  <AleButton @click="scrollToTop">滚动到顶部</AleButton>
  <AleButton @click="scrollToBottom">滚动到底部</AleButton>
  
  <AleScroll ref="scrollRef" height="200px" @scroll="handleScroll">
    <div class="content">...</div>
  </AleScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ScrollExpose, ScrollPosition } from 'ale-ui';

const scrollRef = ref<ScrollExpose | null>(null);

const scrollToTop = () => scrollRef.value?.scrollToTop();
const scrollToBottom = () => scrollRef.value?.scrollToBottom();
const handleScroll = (position: ScrollPosition) => {
  console.log('滚动位置:', position);
};
<\/script>`;

const loadMoreCode = `<template>
  <AleScroll
    height="250px"
    :load-offset="20"
    @load-more="handleLoadMore"
  >
    <div class="content">
      <div v-for="(item, index) in items" :key="index">
        {{ item }}
      </div>
      <div v-if="loading">加载中...</div>
      <div v-if="finished">没有更多数据了</div>
    </div>
  </AleScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([]);
const loading = ref(false);
const finished = ref(false);

const handleLoadMore = () => {
  if (loading.value || finished.value) return;
  loading.value = true;
  // 加载数据...
};
<\/script>`;

const performanceCode = `<template>
  <AleScroll height="300px">
    <div class="content">
      <p v-for="i in 10000" :key="i">
        数据行 {{ i }}
      </p>
    </div>
  </AleScroll>
</template>`;

const layoutCode = `<template>
  <!-- 悬停显示滚动条 - 不影响布局 -->
  <AleScroll height="150px">
    <div class="content">...</div>
  </AleScroll>

  <!-- 始终显示滚动条 - 不影响布局 -->
  <AleScroll height="150px" always>
    <div class="content">...</div>
  </AleScroll>
</template>`;
</script>

<style scoped>
.component-demo-view {
  max-width: 1000px;
  margin: 0 auto;
}

.component-demo-view__header {
  margin-bottom: 48px;
}

.component-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.component-demo-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.component-demo-view__section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.component-demo-view__section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.component-demo-view__section-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
}

.component-demo-view__demo {
  margin-bottom: 24px;
}

.component-demo-view__code {
  margin-top: 24px;
}

/* Demo 样式 */
.demo-scroll {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  background: var(--color-bg-base);
}

.demo-content {
  padding: 16px;
}

.demo-item {
  padding: 10px 12px;
  margin: 0 0 8px 0;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--color-text-primary);
}

.demo-item:last-child {
  margin-bottom: 0;
}

.demo-item.highlight {
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 500;
}

/* 主题演示 */
.demo-themes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.theme-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.theme-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.theme-dark {
  background: #1f2937;
  padding: 12px;
  border-radius: var(--radius-md);
}

.theme-dark .theme-label {
  color: #9ca3af;
}

.dark-content {
  background: #374151;
}

.dark-content .demo-item {
  background: #4b5563;
  color: #f3f4f6;
}

/* 尺寸演示 */
.demo-sizes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.size-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.size-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* 方向演示 */
.demo-directions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.direction-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.direction-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.horizontal-scroll {
  height: 100px;
}

.horizontal-content {
  display: flex;
  gap: 12px;
  padding: 16px;
  width: max-content;
}

.horizontal-item {
  flex-shrink: 0;
  width: 100px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
  font-size: 14px;
}

.both-content {
  padding: 16px;
  width: max-content;
}

.both-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.both-cell {
  flex-shrink: 0;
  width: 60px;
  padding: 8px;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
  text-align: center;
  font-size: 12px;
}

/* 控制按钮 */
.control-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.scroll-info {
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 加载更多 */
.load-more-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-index {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
}

.item-text {
  flex: 1;
}

.loading-indicator,
.finished-indicator {
  padding: 16px;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 14px;
}

/* 性能测试 */
.performance-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--color-text-secondary);
}

.performance-scroll .demo-item {
  font-family: monospace;
}

/* 布局稳定性演示 */
.layout-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.layout-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layout-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.layout-test-item {
  background: linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-bg-elevated) 100%);
  border-left: 3px solid var(--color-primary);
}

/* 悬停演示特殊样式 */
.hover-demo {
  border: 2px dashed var(--color-border-base);
  transition: border-color 0.3s ease;
}

.hover-demo:hover {
  border-color: var(--color-primary);
}

/* 响应式 */
@media (max-width: 768px) {
  .demo-themes,
  .demo-sizes,
  .demo-directions,
  .layout-demo {
    grid-template-columns: 1fr;
  }

  .component-demo-view__section {
    padding: 20px;
  }
}
</style>
