import{t as e}from"./CodeBlock-CmDK_EYq.js";import{S as t,h as n,j as r,r as i,v as a,x as o}from"./index-D6beBo5R.js";var s={class:`component-demo-view`},c={class:`component-demo-view__section`},l={class:`component-demo-view__demo`},u={class:`component-demo-view__section`},d={class:`component-demo-view__demo`},f={class:`component-demo-view__section`},p={class:`component-demo-view__demo`},m={class:`component-demo-view__section`},h={class:`component-demo-view__demo`},g={class:`component-demo-view__section`},_={class:`component-demo-view__demo`},v={class:`component-demo-view__section`},y={class:`component-demo-view__demo`},b={class:`component-demo-view__section`},x={class:`component-demo-view__demo`},S={class:`component-demo-view__section`},C={class:`component-demo-view__demo`},w=`import { ref, computed } from 'vue';

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
}`,T=`<template>
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
</style>`,E=`.button {
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
}`,D=`{
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
}`,O=`import { defineComponent, ref, computed, onMounted, watch } from 'vue';
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
});`,k=i(t({__name:`CodeBlockView`,setup(t){return(t,i)=>(r(),a(`div`,s,[i[9]||=n(`div`,{class:`component-demo-view__header`},[n(`h1`,{class:`component-demo-view__title`},`CodeBlock 代码展示`),n(`p`,{class:`component-demo-view__description`},` 精美的代码展示组件，支持语法高亮、代码复制、行号显示等功能 `)],-1),n(`section`,c,[i[0]||=n(`h2`,{class:`component-demo-view__section-title`},`基本用法`,-1),n(`div`,l,[o(e,{code:w,language:`typescript`,title:`TypeScript 代码`})])]),n(`section`,u,[i[1]||=n(`h2`,{class:`component-demo-view__section-title`},`不同语言高亮`,-1),n(`div`,d,[o(e,{code:T,language:`vue`,title:`Vue 组件`}),o(e,{code:E,language:`css`,title:`CSS 样式`}),o(e,{code:D,language:`json`,title:`JSON 数据`})])]),n(`section`,f,[i[2]||=n(`h2`,{class:`component-demo-view__section-title`},`无标题模式`,-1),n(`div`,p,[o(e,{code:w,language:`typescript`,"show-line-numbers":!0})])]),n(`section`,m,[i[3]||=n(`h2`,{class:`component-demo-view__section-title`},`无行号模式`,-1),n(`div`,h,[o(e,{code:w,language:`typescript`,title:`无行号`,"show-line-numbers":!1})])]),n(`section`,g,[i[4]||=n(`h2`,{class:`component-demo-view__section-title`},`亮色主题`,-1),n(`div`,_,[o(e,{code:w,language:`typescript`,title:`亮色主题`,theme:`light`})])]),n(`section`,v,[i[5]||=n(`h2`,{class:`component-demo-view__section-title`},`无复制按钮`,-1),n(`div`,y,[o(e,{code:w,language:`typescript`,title:`只读代码`,"show-copy":!1})])]),n(`section`,b,[i[6]||=n(`h2`,{class:`component-demo-view__section-title`},`长代码展示`,-1),n(`div`,x,[o(e,{code:O,language:`typescript`,title:`完整组件示例`})])]),n(`section`,S,[i[8]||=n(`h2`,{class:`component-demo-view__section-title`},`响应式设计`,-1),n(`div`,C,[i[7]||=n(`p`,{class:`demo-description`},` 调整浏览器窗口大小，查看代码块在不同屏幕尺寸下的自适应效果。 在移动设备上，代码块会自动调整字体大小、内边距和按钮尺寸。 `,-1),o(e,{code:w,language:`typescript`,title:`响应式代码块`})])])]))}}),[[`__scopeId`,`data-v-d268311b`]]);export{k as default};