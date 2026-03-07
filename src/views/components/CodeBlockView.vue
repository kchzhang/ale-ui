<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">CodeBlock 代码展示</h1>
      <p class="component-demo-view__description">
        精美的代码展示组件，支持语法高亮、代码复制、行号显示等功能
      </p>
    </div>

    <!-- 基本用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基本用法</h2>
      <div class="component-demo-view__demo">
        <CodeBlock
          :code="basicCode"
          language="typescript"
          title="TypeScript 代码"
        />
      </div>
    </section>

    <!-- 不同语言 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同语言高亮</h2>
      <div class="component-demo-view__demo">
        <CodeBlock
          :code="vueCode"
          language="vue"
          title="Vue 组件"
        />
        <CodeBlock
          :code="cssCode"
          language="css"
          title="CSS 样式"
        />
        <CodeBlock
          :code="jsonCode"
          language="json"
          title="JSON 数据"
        />
      </div>
    </section>

    <!-- 无标题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">无标题模式</h2>
      <div class="component-demo-view__demo">
        <CodeBlock
          :code="basicCode"
          language="typescript"
          :show-line-numbers="true"
        />
      </div>
    </section>

    <!-- 无行号 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">无行号模式</h2>
      <div class="component-demo-view__demo">
        <CodeBlock
          :code="basicCode"
          language="typescript"
          title="无行号"
          :show-line-numbers="false"
        />
      </div>
    </section>

    <!-- 亮色主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">亮色主题</h2>
      <div class="component-demo-view__demo">
        <CodeBlock
          :code="basicCode"
          language="typescript"
          title="亮色主题"
          theme="light"
        />
      </div>
    </section>

    <!-- 无复制按钮 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">无复制按钮</h2>
      <div class="component-demo-view__demo">
        <CodeBlock
          :code="basicCode"
          language="typescript"
          title="只读代码"
          :show-copy="false"
        />
      </div>
    </section>

    <!-- 长代码 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">长代码展示</h2>
      <div class="component-demo-view__demo">
        <CodeBlock
          :code="longCode"
          language="typescript"
          title="完整组件示例"
        />
      </div>
    </section>

    <!-- 响应式展示 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">响应式设计</h2>
      <div class="component-demo-view__demo">
        <p class="demo-description">
          调整浏览器窗口大小，查看代码块在不同屏幕尺寸下的自适应效果。
          在移动设备上，代码块会自动调整字体大小、内边距和按钮尺寸。
        </p>
        <CodeBlock
          :code="basicCode"
          language="typescript"
          title="响应式代码块"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';

const basicCode = `import { ref, computed } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

export function useUser() {
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  const fetchUser = async (id: number) => {
    isLoading.value = true;
    try {
      const response = await fetch(\`/api/users/\${id}\`);
      user.value = await response.json();
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    isLoading,
    fetchUser
  };
}`;

const vueCode = `<template>
  <div class="user-card">
    <h2>{{ user?.name }}</h2>
    <p>{{ user?.email }}</p>
    <button @click="handleClick">
      点击按钮
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface User {
  name: string;
  email: string;
}

const user = ref<User>({
  name: 'John Doe',
  email: 'john@example.com'
});

const handleClick = () => {
  console.log('Button clicked!');
};
<\/script>

<style scoped>
.user-card {
  padding: 16px;
  border-radius: 8px;
  background: #f5f5f5;
}
</style>`;

const cssCode = `.button {
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  background: var(--color-primary);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0);
}`;

const jsonCode = `{
  "name": "ale-ui",
  "version": "1.0.0",
  "description": "A beautiful Vue 3 UI library",
  "main": "dist/index.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "test": "vitest"
  },
  "dependencies": {
    "vue": "^3.5.0",
    "vue-router": "^5.0.0"
  },
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}`;

const longCode = `import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const router = useRouter();
    const todos = ref<TodoItem[]>([]);
    const filter = ref<'all' | 'active' | 'completed'>('all');
    const newTodo = ref('');

    // 计算属性：过滤后的任务列表
    const filteredTodos = computed(() => {
      switch (filter.value) {
        case 'active':
          return todos.value.filter(todo => !todo.completed);
        case 'completed':
          return todos.value.filter(todo => todo.completed);
        default:
          return todos.value;
      }
    });

    // 计算属性：任务统计
    const stats = computed(() => ({
      total: todos.value.length,
      active: todos.value.filter(t => !t.completed).length,
      completed: todos.value.filter(t => t.completed).length
    }));

    // 添加新任务
    const addTodo = () => {
      if (!newTodo.value.trim()) return;

      todos.value.push({
        id: Date.now(),
        title: newTodo.value.trim(),
        completed: false,
        createdAt: new Date()
      });

      newTodo.value = '';
    };

    // 切换任务状态
    const toggleTodo = (id: number) => {
      const todo = todos.value.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    };

    // 删除任务
    const deleteTodo = (id: number) => {
      const index = todos.value.findIndex(t => t.id === id);
      if (index !== -1) {
        todos.value.splice(index, 1);
      }
    };

    // 清除已完成任务
    const clearCompleted = () => {
      todos.value = todos.value.filter(t => !t.completed);
    };

    // 组件挂载时从本地存储加载任务
    onMounted(() => {
      const saved = localStorage.getItem('todos');
      if (saved) {
        try {
          todos.value = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to load todos:', e);
        }
      }
    });

    // 监听任务列表变化，保存到本地存储
    watch(todos, (newVal) => {
      localStorage.setItem('todos', JSON.stringify(newVal));
    }, { deep: true });

    return {
      todos,
      filteredTodos,
      filter,
      newTodo,
      stats,
      addTodo,
      toggleTodo,
      deleteTodo,
      clearCompleted
    };
  }
});`;
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
  margin: 0 0 12px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: var(--line-height-base);
  margin: 0 0 16px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .component-demo-view {
    padding: 0 var(--spacing-4);
  }

  .component-demo-view__title {
    font-size: 28px;
  }

  .component-demo-view__section {
    padding: 20px;
  }

  .component-demo-view__section-title {
    font-size: 18px;
  }
}
</style>
