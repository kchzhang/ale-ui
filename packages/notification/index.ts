import { h, render, type VNode } from 'vue';
import NotificationComponent from './Notification.vue';
import type {
  NotificationOptions,
  NotificationInstance,
  NotificationGlobalMethod,
  NotificationType
} from './types';

// 通知 ID 计数器
let notificationId = 0;
// 存储所有通知实例
const instances: Map<string, VNode> = new Map();
// 存储位置对应的通知实例
const positionInstances: Map<string, string[]> = new Map();

/**
 * 获取通知位置
 */
const getNotificationPosition = (options: NotificationOptions): string => {
  return options.position || 'top-right';
};

/**
 * 计算偏移量
 */
const getOffset = (position: string): number => {
  const positionList = positionInstances.get(position) || [];
  return 20 + positionList.length * 90; // 每个通知大约 90px 高度（包含间距）
};

/**
 * 创建通知
 */
const createNotification = (options: NotificationOptions): NotificationInstance => {
  const id = `notification-${++notificationId}`;
  const position = getNotificationPosition(options);
  const offset = getOffset(position);

  // 创建容器
  const container = document.createElement('div');
  document.body.appendChild(container);

  // 创建 vnode
  const vnode = h(NotificationComponent, {
    ...options,
    id,
    offset,
    visible: true,
    onClose: () => {
      closeNotification(id);
      options.onClose?.();
    },
    onClick: () => {
      options.onClick?.();
    },
    onDestroy: () => {
      destroyNotification(id, container, vnode);
    }
  });

  // 渲染
  render(vnode, container);

  // 存储实例
  instances.set(id, vnode);

  // 更新位置列表
  if (!positionInstances.has(position)) {
    positionInstances.set(position, []);
  }
  positionInstances.get(position)!.push(id);

  // 返回实例方法
  return {
    close: () => closeNotification(id)
  };
};

/**
 * 关闭通知
 */
const closeNotification = (id: string) => {
  const vnode = instances.get(id);
  if (vnode) {
    // 更新组件的 visible 属性
    if (vnode.component?.props) {
      vnode.component.props.visible = false;
    }
    // 不调用 exposed.close 以避免循环调用
  }
};

/**
 * 销毁通知
 */
const destroyNotification = (id: string, container: HTMLElement, _vnode: VNode) => {
  // 从实例列表中移除
  instances.delete(id);

  // 从位置列表中移除
  for (const [position, ids] of positionInstances.entries()) {
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
      // 更新该位置其他通知的偏移量
      updateOffsets(position);
      break;
    }
  }

  // 卸载组件
  render(null, container);

  // 移除容器
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
};

/**
 * 更新指定位置所有通知的偏移量
 */
const updateOffsets = (position: string) => {
  const ids = positionInstances.get(position) || [];
  ids.forEach((id, index) => {
    const vnode = instances.get(id);
    if (vnode && vnode.component) {
      const newOffset = 20 + index * 90;
      vnode.component.props.offset = newOffset;
    }
  });
};

/**
 * 关闭所有通知
 */
const closeAll = () => {
  instances.forEach((_vnode, id) => {
    closeNotification(id);
  });
};

/**
 * 创建类型化通知方法
 */
const createTypedNotification = (type: NotificationType) => {
  return (options: NotificationOptions | string): NotificationInstance => {
    if (typeof options === 'string') {
      options = { message: options };
    }
    return createNotification({ ...options, type });
  };
};

/**
 * Notification 全局方法
 */
const Notification: NotificationGlobalMethod = Object.assign(
  (options: NotificationOptions | string): NotificationInstance => {
    if (typeof options === 'string') {
      options = { message: options };
    }
    return createNotification(options);
  },
  {
    success: createTypedNotification('success'),
    warning: createTypedNotification('warning'),
    error: createTypedNotification('error'),
    info: createTypedNotification('info'),
    closeAll
  }
);

export { Notification };
export { default as NotificationComponent } from './Notification.vue';

export type {
  NotificationOptions,
  NotificationInstance,
  NotificationGlobalMethod,
  NotificationType,
  NotificationPosition,
  NotificationProps
} from './types';

export default Notification;
