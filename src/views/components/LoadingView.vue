<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Loading 加载</h1>
      <p class="component-demo-view__description">
        加载组件用于页面和区块的加载中状态，支持多种类型、尺寸和主题
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleLoading />
        <AleLoading text="加载中..." />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 加载类型 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">加载类型</h2>
      <div class="component-demo-view__demo" style="gap: 48px;">
        <div class="demo-item">
          <AleLoading type="circular" />
          <span class="demo-label">circular</span>
        </div>
        <div class="demo-item">
          <AleLoading type="spinner" />
          <span class="demo-label">spinner</span>
        </div>
        <div class="demo-item">
          <AleLoading type="dots" />
          <span class="demo-label">dots</span>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="typeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo" style="gap: 48px;">
        <div class="demo-item">
          <AleLoading size="small" text="small" />
        </div>
        <div class="demo-item">
          <AleLoading size="medium" text="medium" />
        </div>
        <div class="demo-item">
          <AleLoading size="large" text="large" />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同主题</h2>
      <div class="component-demo-view__demo" style="gap: 48px;">
        <div class="demo-item">
          <AleLoading theme="primary" text="primary" />
        </div>
        <div class="demo-item">
          <AleLoading theme="success" text="success" />
        </div>
        <div class="demo-item">
          <AleLoading theme="warning" text="warning" />
        </div>
        <div class="demo-item">
          <AleLoading theme="danger" text="danger" />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 垂直排列 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">垂直排列</h2>
      <div class="component-demo-view__demo" style="gap: 48px;">
        <div class="demo-item">
          <AleLoading type="circular" vertical text="加载中" />
        </div>
        <div class="demo-item">
          <AleLoading type="spinner" vertical text="请稍候" />
        </div>
        <div class="demo-item">
          <AleLoading type="dots" vertical text="处理中" />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="verticalCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义颜色</h2>
      <div class="component-demo-view__demo" style="gap: 48px;">
        <div class="demo-item">
          <AleLoading color="#8B5CF6" text="紫色" />
        </div>
        <div class="demo-item">
          <AleLoading color="#EC4899" text="粉色" />
        </div>
        <div class="demo-item">
          <AleLoading color="#14B8A6" text="青色" />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customColorCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 遮罩层用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">遮罩层用法</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary);">
          点击按钮查看遮罩层效果
        </p>
        <div class="overlay-demo">
          <div class="overlay-demo-content">
            <p>这是一个需要加载的内容区域</p>
            <AleButton @click="showOverlay = true">
              显示遮罩层加载
            </AleButton>
          </div>
          <AleLoading
            v-if="showOverlay"
            overlay
            text="数据加载中..."
            @click="showOverlay = false"
          />
        </div>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: var(--color-text-secondary);">
          提示：点击加载遮罩可关闭
        </p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="overlayCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义遮罩层样式 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义遮罩层样式</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch; gap: 24px;">
        <div class="overlay-custom-demo">
          <p style="margin: 0 0 12px 0; color: var(--color-text-secondary);">
            使用 overlayOpacity 调整透明度（0.3）
          </p>
          <div class="overlay-demo" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div class="overlay-demo-content">
              <p style="color: white;">彩色背景区域</p>
              <AleButton theme="default" @click="showOverlayOpacity = true">
                半透明遮罩
              </AleButton>
            </div>
            <AleLoading
              v-if="showOverlayOpacity"
              overlay
              :overlay-opacity="0.3"
              text="半透明遮罩..."
              theme="primary"
              @click="showOverlayOpacity = false"
            />
          </div>
        </div>

        <div class="overlay-custom-demo">
          <p style="margin: 0 0 12px 0; color: var(--color-text-secondary);">
            使用 overlayBackground 自定义颜色
          </p>
          <div class="overlay-demo">
            <div class="overlay-demo-content">
              <p>普通内容区域</p>
              <AleButton @click="showOverlayBg = true">
                深色遮罩
              </AleButton>
            </div>
            <AleLoading
              v-if="showOverlayBg"
              overlay
              overlay-background="rgba(0, 0, 0, 0.7)"
              text="深色遮罩加载..."
              color="#ffffff"
              @click="showOverlayBg = false"
            />
          </div>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="overlayCustomCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 全屏加载 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">全屏加载</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary);">
          全屏加载会覆盖整个视口，常用于页面初始化或全局操作
        </p>
        <AleButton type="primary" @click="showFullscreen = true">
          显示全屏加载（2秒后自动关闭）
        </AleButton>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="fullscreenCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 延迟显示 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">延迟显示</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary);">
          设置 delay 属性可以延迟显示加载状态，避免快速操作时的闪烁
        </p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <AleButton @click="toggleDelayedLoading">
            {{ delayedLoading ? '停止加载' : '开始加载（延迟500ms）' }}
          </AleButton>
          <AleLoading
            v-if="delayedLoading"
            :delay="500"
            text="延迟显示"
          />
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="delayCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">实际应用场景</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <div class="data-table-demo">
          <div class="table-header">
            <span>用户列表</span>
            <AleButton
              size="small"
              :loading="tableLoading"
              @click="refreshTable"
            >
              刷新
            </AleButton>
          </div>
          <div class="table-body" style="position: relative; min-height: 200px;">
            <table v-if="!tableLoading" class="demo-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>姓名</th>
                  <th>邮箱</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <AleBadge :type="user.status === 'active' ? 'success' : 'info'">
                      {{ user.status === 'active' ? '活跃' : '离线' }}
                    </AleBadge>
                  </td>
                </tr>
              </tbody>
            </table>
            <AleLoading
              v-else
              overlay
              type="spinner"
              text="加载数据中..."
            />
          </div>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="tableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 全屏加载 -->
    <Teleport to="body">
      <AleLoading
        v-if="showFullscreen"
        fullscreen
        type="spinner"
        text="正在加载页面..."
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { AleLoading, AleButton, AleBadge } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 遮罩层演示
const showOverlay = ref(false);
const showOverlayOpacity = ref(false);
const showOverlayBg = ref(false);

// 全屏加载演示
const showFullscreen = ref(false);

// 延迟加载演示
const delayedLoading = ref(false);
const toggleDelayedLoading = () => {
  if (delayedLoading.value) {
    delayedLoading.value = false;
  } else {
    delayedLoading.value = true;
  }
};

// 表格加载演示
const tableLoading = ref(false);
const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive' },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: 'active' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 'active' }
]);

const refreshTable = async () => {
  tableLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  tableLoading.value = false;
};

// 自动关闭全屏加载
watch(showFullscreen, (val) => {
  if (val) {
    setTimeout(() => {
      showFullscreen.value = false;
    }, 2000);
  }
});

// 代码示例
const basicCode = `<template>
  <!-- 纯图标 -->
  <AleLoading />
  
  <!-- 带文字 -->
  <AleLoading text="加载中..." />
</template>

<script setup lang="ts">
import { AleLoading } from 'ale-ui';
<\/script>`;

const typeCode = `<template>
  <AleLoading type="circular" />
  <AleLoading type="spinner" />
  <AleLoading type="dots" />
</template>`;

const sizeCode = `<template>
  <AleLoading size="small" text="small" />
  <AleLoading size="medium" text="medium" />
  <AleLoading size="large" text="large" />
</template>`;

const themeCode = `<template>
  <AleLoading theme="primary" text="primary" />
  <AleLoading theme="success" text="success" />
  <AleLoading theme="warning" text="warning" />
  <AleLoading theme="danger" text="danger" />
</template>`;

const verticalCode = `<template>
  <AleLoading type="circular" vertical text="加载中" />
  <AleLoading type="spinner" vertical text="请稍候" />
  <AleLoading type="dots" vertical text="处理中" />
</template>`;

const customColorCode = `<template>
  <AleLoading color="#8B5CF6" text="紫色" />
  <AleLoading color="#EC4899" text="粉色" />
  <AleLoading color="#14B8A6" text="青色" />
</template>`;

const overlayCode = `<template>
  <div class="overlay-demo">
    <div class="content">
      <p>需要加载的内容</p>
      <AleButton @click="showOverlay = true">
        显示遮罩层加载
      </AleButton>
    </div>
    <AleLoading
      v-if="showOverlay"
      overlay
      text="数据加载中..."
      @click="showOverlay = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const showOverlay = ref(false);
<\/script>`;

const overlayCustomCode = `<template>
  <!-- 使用 overlayOpacity 调整透明度 -->
  <AleLoading
    v-if="showLoading"
    overlay
    :overlay-opacity="0.3"
    text="半透明遮罩..."
  />

  <!-- 使用 overlayBackground 自定义颜色 -->
  <AleLoading
    v-if="showLoading"
    overlay
    overlay-background="rgba(0, 0, 0, 0.7)"
    text="深色遮罩加载..."
    color="#ffffff"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showLoading = ref(false);
<\/script>`;

const fullscreenCode = `<template>
  <AleButton @click="showFullscreen = true">
    显示全屏加载
  </AleButton>
  
  <Teleport to="body">
    <AleLoading
      v-if="showFullscreen"
      fullscreen
      type="spinner"
      text="正在加载页面..."
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const showFullscreen = ref(false);
<\/script>`;

const delayCode = `<template>
  <AleButton @click="delayedLoading = !delayedLoading">
    {{ delayedLoading ? '停止' : '开始（延迟500ms）' }}
  </AleButton>
  <AleLoading
    v-if="delayedLoading"
    :delay="500"
    text="延迟显示"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const delayedLoading = ref(false);
<\/script>`;

const tableCode = `<template>
  <div class="data-table">
    <div class="table-header">
      <span>用户列表</span>
      <AleButton
        :loading="tableLoading"
        @click="refreshTable"
      >
        刷新
      </AleButton>
    </div>
    <div class="table-body">
      <table v-if="!tableLoading">
        <!-- 表格内容 -->
      </table>
      <AleLoading
        v-else
        overlay
        type="spinner"
        text="加载数据中..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const tableLoading = ref(false);

const refreshTable = async () => {
  tableLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  tableLoading.value = false;
};
<\/script>`;
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
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.component-demo-view__code {
  margin-top: 24px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.overlay-demo {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 200px;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-demo-content {
  text-align: center;
}

.overlay-demo-content p {
  margin: 0 0 16px 0;
  color: var(--color-text-secondary);
}

.combo-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  min-width: 160px;
}

.combo-demo h4 {
  margin: 0 0 16px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.data-table-demo {
  width: 100%;
  border: 1px solid var(--color-border-base);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--color-gray-50);
  border-bottom: 1px solid var(--color-border-base);
  font-weight: 500;
}

.table-body {
  padding: 0;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
}

.demo-table th,
.demo-table td {
  padding: 12px 20px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.demo-table th {
  font-weight: 500;
  color: var(--color-text-secondary);
  font-size: 13px;
  text-transform: uppercase;
}

.demo-table td {
  color: var(--color-text-primary);
}

.demo-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
