import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('../views/ComponentsView.vue'),
    children: [
      {
        path: '/components/button',
        name: 'Button',
        component: () => import('../views/components/ButtonView.vue')
      },
      {
        path: '/components/badge',
        name: 'Badge',
        component: () => import('../views/components/BadgeView.vue')
      },
      {
        path: '/components/card',
        name: 'Card',
        component: () => import('../views/components/CardView.vue')
      },
      {
        path: '/components/input',
        name: 'Input',
        component: () => import('../views/components/InputView.vue')
      },
      {
        path: '/components/code-block',
        name: 'CodeBlock',
        component: () => import('../views/components/CodeBlockView.vue')
      },
      {
        path: '/components/select',
        name: 'Select',
        component: () => import('../views/components/SelectView.vue')
      },
      {
        path: '/components/checkbox',
        name: 'Checkbox',
        component: () => import('../views/components/CheckboxView.vue')
      },
      {
        path: '/components/radio',
        name: 'Radio',
        component: () => import('../views/components/RadioView.vue')
      },
      {
        path: '/components/switch',
        name: 'Switch',
        component: () => import('../views/components/SwitchView.vue')
      },
      {
        path: '/components/dialog',
        name: 'Dialog',
        component: () => import('../views/components/DialogView.vue')
      },
      {
        path: '/components/message',
        name: 'Message',
        component: () => import('../views/components/MessageView.vue')
      },
      {
        path: '/components/notification',
        name: 'Notification',
        component: () => import('../views/components/NotificationView.vue')
      },
      {
        path: '/components/loading',
        name: 'Loading',
        component: () => import('../views/components/LoadingView.vue')
      },
      {
        path: '/components/tabs',
        name: 'Tabs',
        component: () => import('../views/components/TabsView.vue')
      },
      {
        path: '/components/form',
        name: 'Form',
        component: () => import('../views/components/FormView/index.vue')
      },
      {
        path: '/components/tag',
        name: 'Tag',
        component: () => import('../views/components/TagView.vue')
      },
      {
        path: '/components/list',
        name: 'List',
        component: () => import('../views/components/ListView.vue')
      },
      {
        path: '/components/table',
        name: 'Table',
        component: () => import('../views/components/TableView.vue')
      },
      {
        path: '/components/pagination',
        name: 'Pagination',
        component: () => import('../views/components/PaginationView.vue')
      },
      {
        path: '/components/infinite-scroll',
        name: 'InfiniteScroll',
        component: () => import('../views/components/InfiniteScrollView.vue')
      },
      {
        path: '/components/tree',
        name: 'Tree',
        component: () => import('../views/components/TreeView.vue')
      },
      {
        path: '/components/scroll',
        name: 'Scroll',
        component: () => import('../views/components/ScrollView.vue')
      },
      {
        path: '/components/cascader',
        name: 'Cascader',
        component: () => import('../views/components/CascaderView/index.vue')
      },
      {
        path: '/components/upload',
        name: 'Upload',
        component: () => import('../views/components/UploadView.vue')
      },
      {
        path: '/components/progress',
        name: 'Progress',
        component: () => import('../views/components/ProgressView.vue')
      },
      {
        path: '/components/time-picker',
        name: 'TimePicker',
        component: () => import('../views/components/TimePickerView.vue')
      },
      {
        path: '/components/split',
        name: 'Split',
        component: () => import('../views/components/SplitView.vue')
      }
    ]
  },
  {
    path: '/button-demo',
    name: 'ButtonDemo',
    component: () => import('../views/ButtonDemoView.vue')
  },
  {
    path: '/variables-demo',
    name: 'VariablesDemo',
    component: () => import('../views/VariablesDemoView.vue')
  },
  // 临时路由：其他组件占位符
  {
    path: '/components/:id',
    name: 'ComponentDemo',
    component: () => import('../views/components/ComingSoonView.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/ale-ui/'),
  routes
});

export default router;
