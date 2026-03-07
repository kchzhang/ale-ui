<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">InfiniteScroll 滚动加载</h1>
      <p class="component-demo-view__description">
        滚动到底部自动加载更多数据，支持自定义加载状态、完成状态和错误状态
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <div class="infinite-scroll-demo">
          <AleInfiniteScroll
            :status="basicStatus"
            :loading-text="'加载中...'"
            :finished-text="'没有更多了'"
            @load="handleBasicLoad"
          >
            <div class="demo-list">
              <div
                v-for="item in basicList"
                :key="item.id"
                class="demo-list-item"
              >
                {{ item.text }}
              </div>
            </div>
          </AleInfiniteScroll>
        </div>
        <div class="demo-actions">
          <AleButton size="small" @click="resetBasic">
            重置列表
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 加载完成状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">加载完成状态</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <div class="infinite-scroll-demo">
          <AleInfiniteScroll
            :status="finishedStatus"
            :finished-text="'已经全部加载完毕'"
          >
            <div class="demo-list">
              <div
                v-for="item in finishedList"
                :key="item.id"
                class="demo-list-item"
              >
                {{ item.text }}
              </div>
            </div>
          </AleInfiniteScroll>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="finishedCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 错误状态与重试 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">错误状态与重试</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary);">
          点击"模拟错误"查看错误状态，点击错误提示可重试
        </p>
        <div class="infinite-scroll-demo">
          <AleInfiniteScroll
            :status="errorStatus"
            :error-text="'加载失败，请重试'"
            :retry-text="'点击重试'"
            @load="handleErrorLoad"
          >
            <div class="demo-list">
              <div
                v-for="item in errorList"
                :key="item.id"
                class="demo-list-item"
              >
                {{ item.text }}
              </div>
            </div>
          </AleInfiniteScroll>
        </div>
        <div class="demo-actions">
          <AleButton size="small" @click="simulateError">
            模拟错误
          </AleButton>
          <AleButton size="small" @click="resetError">
            重置
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="errorCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义加载文本 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义加载文本</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <div class="infinite-scroll-demo">
          <AleInfiniteScroll
            :status="customStatus"
            :loading-text="'正在获取数据...'"
            :finished-text="'—— 到底了 ——'"
            @load="handleCustomLoad"
          >
            <div class="demo-list">
              <div
                v-for="item in customList"
                :key="item.id"
                class="demo-list-item"
              >
                {{ item.text }}
              </div>
            </div>
          </AleInfiniteScroll>
        </div>
        <div class="demo-actions">
          <AleButton size="small" @click="resetCustom">
            重置列表
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary);">
          禁用后滚动到底部不会触发加载
        </p>
        <div class="infinite-scroll-demo">
          <AleInfiniteScroll
            :status="disabledStatus"
            :disabled="isDisabled"
            @load="handleDisabledLoad"
          >
            <div class="demo-list">
              <div
                v-for="item in disabledList"
                :key="item.id"
                class="demo-list-item"
              >
                {{ item.text }}
              </div>
            </div>
          </AleInfiniteScroll>
        </div>
        <div class="demo-actions">
          <AleButton size="small" @click="toggleDisabled">
            {{ isDisabled ? '启用' : '禁用' }}
          </AleButton>
          <AleButton size="small" @click="resetDisabled">
            重置列表
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 水平方向 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">水平方向</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary);">
          设置 direction="horizontal" 实现水平滚动加载
        </p>
        <div class="infinite-scroll-demo horizontal">
          <AleInfiniteScroll
            :status="horizontalStatus"
            direction="horizontal"
            @load="handleHorizontalLoad"
          >
            <div class="demo-list horizontal">
              <div
                v-for="item in horizontalList"
                :key="item.id"
                class="demo-list-item horizontal"
              >
                {{ item.text }}
              </div>
            </div>
          </AleInfiniteScroll>
        </div>
        <div class="demo-actions">
          <AleButton size="small" @click="resetHorizontal">
            重置列表
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="horizontalCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 图片无限加载 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">图片无限加载</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <p style="margin: 0 0 16px 0; color: var(--color-text-secondary);">
          滚动到距离底部 300px 时触发，每次随机生成 10 张卡片，永无止境
        </p>
        <div class="image-gallery-demo">
          <AleInfiniteScroll
            ref="imageScrollRef"
            :status="imageStatus"
            :offset="300"
            :immediate="true"
            @load="loadMoreImages"
          >
            <div class="image-grid">
              <div
                v-for="image in imageList"
                :key="image.id"
                class="image-card"
              >
                <div class="image-wrapper" :style="{ backgroundColor: image.color }">
                  <span class="image-placeholder">{{ image.id }}</span>
                </div>
                <div class="image-info">
                  <div class="image-title">{{ image.title }}</div>
                  <div class="image-meta">
                    <span>{{ image.author }}</span>
                    <span>{{ image.likes }} ❤️</span>
                  </div>
                </div>
              </div>
            </div>
          </AleInfiniteScroll>
        </div>
        <div class="demo-actions">
          <AleButton size="small" @click="refreshImages">
            刷新重置
          </AleButton>
          <AleButton size="small" @click="loadImagesImmediately">
            立即加载
          </AleButton>
          <AleTag type="primary" size="small">
            已加载 {{ imageList.length }} 张图片
          </AleTag>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="imageGalleryCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">实际应用场景</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: stretch;">
        <div class="user-list-demo">
          <div class="list-header">
            <span>用户列表</span>
            <AleButton
              size="small"
              :loading="userStatus === 'loading'"
              @click="refreshUsers"
            >
              刷新
            </AleButton>
          </div>
          <div class="list-body">
            <AleInfiniteScroll
              :status="userStatus"
              :offset="50"
              @load="loadMoreUsers"
            >
              <div class="user-list">
                <div
                  v-for="user in userList"
                  :key="user.id"
                  class="user-item"
                >
                  <div class="user-avatar">{{ user.name?.[0] || '?' }}</div>
                  <div class="user-info">
                    <div class="user-name">{{ user.name }}</div>
                    <div class="user-email">{{ user.email }}</div>
                  </div>
                  <AleTag
                    :type="user.status === 'active' ? 'success' : 'info'"
                    size="small"
                  >
                    {{ user.status === 'active' ? '活跃' : '离线' }}
                  </AleTag>
                </div>
              </div>
            </AleInfiniteScroll>
          </div>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="userListCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- API 说明 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">API 说明</h2>
      <div class="api-table-wrapper">
        <h3>Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>status</td>
              <td>当前状态（受控模式）</td>
              <td>'idle' | 'loading' | 'finished' | 'error'</td>
              <td>-</td>
            </tr>
            <tr>
              <td>defaultStatus</td>
              <td>默认状态（非受控模式）</td>
              <td>'idle' | 'loading' | 'finished' | 'error'</td>
              <td>'idle'</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>direction</td>
              <td>滚动方向</td>
              <td>'vertical' | 'horizontal'</td>
              <td>'vertical'</td>
            </tr>
            <tr>
              <td>offset</td>
              <td>触发加载的距离阈值（像素）</td>
              <td>number</td>
              <td>100</td>
            </tr>
            <tr>
              <td>immediate</td>
              <td>是否立即执行一次检查</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>loadingText</td>
              <td>加载中提示文本</td>
              <td>string</td>
              <td>'加载中...'</td>
            </tr>
            <tr>
              <td>finishedText</td>
              <td>加载完成提示文本</td>
              <td>string</td>
              <td>'没有更多了'</td>
            </tr>
            <tr>
              <td>errorText</td>
              <td>加载失败提示文本</td>
              <td>string</td>
              <td>'加载失败'</td>
            </tr>
            <tr>
              <td>retryText</td>
              <td>重试按钮文本</td>
              <td>string</td>
              <td>'点击重试'</td>
            </tr>
            <tr>
              <td>customClass</td>
              <td>自定义类名</td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <h3>Events</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>事件名</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>load</td>
              <td>触发加载时</td>
              <td>-</td>
            </tr>
            <tr>
              <td>update:status</td>
              <td>状态变化时</td>
              <td>(status: InfiniteScrollStatus)</td>
            </tr>
          </tbody>
        </table>

        <h3>Methods</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>check</td>
              <td>检查是否需要加载</td>
              <td>-</td>
            </tr>
            <tr>
              <td>setLoading</td>
              <td>设置状态为加载中</td>
              <td>-</td>
            </tr>
            <tr>
              <td>setFinished</td>
              <td>设置状态为完成</td>
              <td>-</td>
            </tr>
            <tr>
              <td>setError</td>
              <td>设置状态为错误</td>
              <td>-</td>
            </tr>
            <tr>
              <td>reset</td>
              <td>重置状态</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInfiniteScroll, AleButton, AleTag } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';
import type { InfiniteScrollStatus } from 'ale-ui';

// ==================== 基础用法 ====================
const basicStatus = ref<InfiniteScrollStatus>('idle');
const basicList = ref<{ id: number; text: string }[]>([]);
let basicId = 1;

const handleBasicLoad = () => {
  basicStatus.value = 'loading';
  setTimeout(() => {
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: basicId++,
      text: `列表项 ${basicId - 1}`
    }));
    basicList.value.push(...newItems);
    basicStatus.value = basicList.value.length >= 20 ? 'finished' : 'idle';
  }, 1000);
};

const resetBasic = () => {
  basicId = 1;
  basicList.value = [];
  basicStatus.value = 'idle';
  // 重新加载
  setTimeout(() => handleBasicLoad(), 100);
};

// ==================== 加载完成状态 ====================
const finishedStatus = ref<InfiniteScrollStatus>('finished');
const finishedList = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    text: `已完成列表项 ${i + 1}`
  }))
);

// ==================== 错误状态 ====================
const errorStatus = ref<InfiniteScrollStatus>('idle');
const errorList = ref<{ id: number; text: string }[]>([]);
let errorId = 1;
let shouldError = false;

const handleErrorLoad = () => {
  errorStatus.value = 'loading';
  setTimeout(() => {
    if (shouldError) {
      errorStatus.value = 'error';
      shouldError = false;
    } else {
      const newItems = Array.from({ length: 3 }, (_, i) => ({
        id: errorId++,
        text: `列表项 ${errorId - 1}`
      }));
      errorList.value.push(...newItems);
      errorStatus.value = errorList.value.length >= 15 ? 'finished' : 'idle';
    }
  }, 800);
};

const simulateError = () => {
  shouldError = true;
  errorStatus.value = 'idle';
  handleErrorLoad();
};

const resetError = () => {
  errorId = 1;
  errorList.value = [];
  errorStatus.value = 'idle';
  shouldError = false;
  handleErrorLoad();
};

// ==================== 自定义文本 ====================
const customStatus = ref<InfiniteScrollStatus>('idle');
const customList = ref<{ id: number; text: string }[]>([]);
let customId = 1;

const handleCustomLoad = () => {
  customStatus.value = 'loading';
  setTimeout(() => {
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: customId++,
      text: `自定义列表项 ${customId - 1}`
    }));
    customList.value.push(...newItems);
    customStatus.value = customList.value.length >= 15 ? 'finished' : 'idle';
  }, 1000);
};

const resetCustom = () => {
  customId = 1;
  customList.value = [];
  customStatus.value = 'idle';
  setTimeout(() => handleCustomLoad(), 100);
};

// ==================== 禁用状态 ====================
const isDisabled = ref(false);
const disabledStatus = ref<InfiniteScrollStatus>('idle');
const disabledList = ref<{ id: number; text: string }[]>([]);
let disabledId = 1;

const handleDisabledLoad = () => {
  disabledStatus.value = 'loading';
  setTimeout(() => {
    const newItems = Array.from({ length: 5 }, (_, i) => ({
      id: disabledId++,
      text: `禁用列表项 ${disabledId - 1}`
    }));
    disabledList.value.push(...newItems);
    disabledStatus.value = disabledList.value.length >= 15 ? 'finished' : 'idle';
  }, 1000);
};

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};

const resetDisabled = () => {
  disabledId = 1;
  disabledList.value = [];
  disabledStatus.value = 'idle';
  setTimeout(() => handleDisabledLoad(), 100);
};

// ==================== 水平方向 ====================
const horizontalStatus = ref<InfiniteScrollStatus>('idle');
const horizontalList = ref<{ id: number; text: string }[]>([]);
let horizontalId = 1;

const handleHorizontalLoad = () => {
  horizontalStatus.value = 'loading';
  setTimeout(() => {
    const newItems = Array.from({ length: 3 }, (_, i) => ({
      id: horizontalId++,
      text: `卡片 ${horizontalId - 1}`
    }));
    horizontalList.value.push(...newItems);
    horizontalStatus.value = horizontalList.value.length >= 12 ? 'finished' : 'idle';
  }, 800);
};

const resetHorizontal = () => {
  horizontalId = 1;
  horizontalList.value = [];
  horizontalStatus.value = 'idle';
  setTimeout(() => handleHorizontalLoad(), 100);
};

// ==================== 图片瀑布流示例 ====================
const imageScrollRef = ref<{ check: () => void } | null>(null);
const imageStatus = ref<InfiniteScrollStatus>('idle');
const imageList = ref<
  { id: number; title: string; author: string; likes: number; color: string }[]
>([]);
let imageId = 1;

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

const imageTitles = [
  '山间晨雾', '城市夜景', '海边日落', '森林小径',
  '雪山之巅', '田园风光', '星空璀璨', '古镇风情'
];

const authors = ['摄影师小王', '光影大师', '旅行家', '自然观察者', '艺术家'];

const loadMoreImages = () => {
  imageStatus.value = 'loading';
  setTimeout(() => {
    const newImages = Array.from({ length: 10 }, () => {
      const id = imageId++;
      // 随机选择标题、作者和颜色
      const randomTitle = imageTitles[Math.floor(Math.random() * imageTitles.length)]!;
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)]!;
      const randomColor = colors[Math.floor(Math.random() * colors.length)]!;
      return {
        id,
        title: `${randomTitle} ${id}`,
        author: randomAuthor,
        likes: Math.floor(Math.random() * 500) + 50,
        color: randomColor
      };
    });
    imageList.value.push(...newImages);
    // 无限加载：永远不设置 finished 状态
    imageStatus.value = 'idle';
  }, 600);
};

const refreshImages = () => {
  imageId = 1;
  imageList.value = [];
  imageStatus.value = 'idle';
  setTimeout(() => loadMoreImages(), 100);
};

const loadImagesImmediately = () => {
  if (imageScrollRef.value) {
    imageScrollRef.value.check();
  }
};

// ==================== 用户列表示例 ====================
const userStatus = ref<InfiniteScrollStatus>('idle');
const userList = ref<
  { id: number; name: string; email: string; status: 'active' | 'inactive' }[]
>([]);
let userId = 1;

const names = ['张三', '李四', '王五', '赵六', '陈七', '刘八', '杨九', '周十'];

const loadMoreUsers = () => {
  userStatus.value = 'loading';
  setTimeout(() => {
    const newUsers = Array.from({ length: 5 }, (_, i) => {
      const id = userId++;
      const name = names[(id - 1) % names.length];
      return {
        id,
        name: `${name}-${Math.ceil(id / names.length)}`,
        email: `${name?.toLowerCase()}${Math.ceil(id / names.length)}@example.com`,
        status: Math.random() > 0.3 ? ('active' as const) : ('inactive' as const)
      };
    });
    userList.value.push(...newUsers);
    userStatus.value = userList.value.length >= 30 ? 'finished' : 'idle';
  }, 1200);
};

const refreshUsers = () => {
  userId = 1;
  userList.value = [];
  userStatus.value = 'idle';
  loadMoreUsers();
};

// ==================== 代码示例 ====================
const basicCode = `<template>
  <AleInfiniteScroll
    :status="status"
    @load="handleLoad"
  >
    <div class="list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInfiniteScroll } from 'ale-ui';
import type { InfiniteScrollStatus } from 'ale-ui';

const status = ref<InfiniteScrollStatus>('idle');
const list = ref([]);

const handleLoad = () => {
  status.value = 'loading';
  // 模拟异步加载
  setTimeout(() => {
    // 加载数据...
    if (list.value.length >= 20) {
      status.value = 'finished';
    } else {
      status.value = 'idle';
    }
  }, 1000);
};
<\/script>`;

const finishedCode = `<template>
  <AleInfiniteScroll
    :status="'finished'"
    :finished-text="'已经全部加载完毕'"
  >
    <div class="list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>`;

const errorCode = `<template>
  <AleInfiniteScroll
    :status="status"
    :error-text="'加载失败，请重试'"
    @load="handleLoad"
  >
    <div class="list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InfiniteScrollStatus } from 'ale-ui';

const status = ref<InfiniteScrollStatus>('idle');

const handleLoad = () => {
  status.value = 'loading';
  fetchData()
    .then(() => {
      status.value = 'idle';
    })
    .catch(() => {
      status.value = 'error';
    });
};
<\/script>`;

const customCode = `<template>
  <AleInfiniteScroll
    :status="status"
    :loading-text="'正在获取数据...'"
    :finished-text="'—— 到底了 ——'"
    @load="handleLoad"
  >
    <!-- 列表内容 -->
  </AleInfiniteScroll>
</template>`;

const disabledCode = `<template>
  <AleInfiniteScroll
    :status="status"
    :disabled="isDisabled"
    @load="handleLoad"
  >
    <!-- 列表内容 -->
  </AleInfiniteScroll>
  <button @click="isDisabled = !isDisabled">
    {{ isDisabled ? '启用' : '禁用' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InfiniteScrollStatus } from 'ale-ui';

const isDisabled = ref(false);
const status = ref<InfiniteScrollStatus>('idle');
<\/script>`;

const horizontalCode = `<template>
  <AleInfiniteScroll
    :status="status"
    direction="horizontal"
    @load="handleLoad"
  >
    <div class="horizontal-list">
      <div v-for="item in list" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </AleInfiniteScroll>
</template>`;

const userListCode = `<template>
  <AleInfiniteScroll
    :status="userStatus"
    :offset="50"
    @load="loadMoreUsers"
  >
    <div class="user-list">
      <div v-for="user in userList" :key="user.id" class="user-item">
        <div class="user-avatar">{{ user.name?.[0] || '?' }}</div>
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-email">{{ user.email }}</div>
        </div>
        <AleTag :type="user.status === 'active' ? 'success' : 'info'">
          {{ user.status === 'active' ? '活跃' : '离线' }}
        </AleTag>
      </div>
    </div>
  </AleInfiniteScroll>
</template>`;

const imageGalleryCode = `<template>
  <AleInfiniteScroll
    ref="imageScrollRef"
    :status="imageStatus"
    :offset="300"
    @load="loadMoreImages"
  >
    <div class="image-grid">
      <div
        v-for="image in imageList"
        :key="image.id"
        class="image-card"
      >
        <div class="image-wrapper" :style="{ backgroundColor: image.color }">
          <span>{{ image.id }}</span>
        </div>
        <div class="image-info">
          <div class="image-title">{{ image.title }}</div>
          <div class="image-meta">
            <span>{{ image.author }}</span>
            <span>{{ image.likes }} ❤️</span>
          </div>
        </div>
      </div>
    </div>
  </AleInfiniteScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { InfiniteScrollStatus } from 'ale-ui';

const imageScrollRef = ref();
const imageStatus = ref<InfiniteScrollStatus>('idle');
const imageList = ref([]);
let imageId = 1;

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
const titles = ['风景', '人物', '建筑', '美食', '动物'];
const authors = ['摄影师A', '摄影师B', '摄影师C'];

// 无限加载：每次随机生成10个卡片
const loadMoreImages = () => {
  imageStatus.value = 'loading';
  
  setTimeout(() => {
    const newImages = Array.from({ length: 10 }, () => {
      const id = imageId++;
      return {
        id,
        title: titles[Math.floor(Math.random() * titles.length)] + ' ' + id,
        author: authors[Math.floor(Math.random() * authors.length)]!,
        likes: Math.floor(Math.random() * 500) + 50,
        color: colors[Math.floor(Math.random() * colors.length)]!
      };
    });
    
    imageList.value.push(...newImages);
    imageStatus.value = 'idle'; // 保持 idle，不设置 finished
  }, 600);
};
<\/script>`;

// 初始化加载
handleBasicLoad();
handleErrorLoad();
handleCustomLoad();
handleDisabledLoad();
handleHorizontalLoad();
loadMoreImages();
loadMoreUsers();
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

/* 演示区域样式 */
.infinite-scroll-demo {
  width: 100%;
  max-height: 300px;
  overflow: auto;
  border: 1px solid var(--color-border-base);
  border-radius: var(--radius-md);
  background: var(--color-bg-base);
}

.infinite-scroll-demo.horizontal {
  max-height: 150px;
}

.demo-list {
  padding: 0;
}

.demo-list.horizontal {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.demo-list-item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-light);
  color: var(--color-text-primary);
}

.demo-list-item:last-child {
  border-bottom: none;
}

.demo-list-item.horizontal {
  border: 1px solid var(--color-border-base);
  border-radius: var(--radius-md);
  min-width: 120px;
  text-align: center;
  background: var(--color-bg-elevated);
}

.demo-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

/* 用户列表样式 */
.user-list-demo {
  width: 100%;
  border: 1px solid var(--color-border-base);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--color-gray-50);
  border-bottom: 1px solid var(--color-border-base);
  font-weight: 500;
}

.list-body {
  max-height: 300px;
  overflow: auto;
}

.user-list {
  padding: 0;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--color-border-light);
}

.user-item:last-child {
  border-bottom: none;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 500;
  color: var(--color-text-primary);
}

.user-email {
  font-size: 13px;
  color: var(--color-text-secondary);
}

/* 图片瀑布流样式 */
.image-gallery-demo {
  width: 100%;
  max-height: 400px;
  overflow: auto;
  border: 1px solid var(--color-border-base);
  border-radius: var(--radius-md);
  background: var(--color-bg-base);
  padding: 16px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.image-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.image-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.image-wrapper {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.image-placeholder {
  opacity: 0.9;
}

.image-info {
  padding: 12px;
}

.image-title {
  font-weight: 500;
  color: var(--color-text-primary);
  font-size: 14px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* API 表格 */
.api-table-wrapper {
  overflow-x: auto;
}

.api-table-wrapper h3 {
  margin: 24px 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.api-table-wrapper h3:first-child {
  margin-top: 0;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.api-table th,
.api-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.api-table th {
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-gray-50);
}

.api-table td {
  color: var(--color-text-primary);
}

.api-table td code {
  background: var(--color-gray-100);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}
</style>
