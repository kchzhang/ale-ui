import { h, render, type VNode } from 'vue';
import MessageComponent from './Message.vue';
import type {
  MessageOptions,
  MessageInstance,
  MessageGlobalMethod,
  MessageType
} from './types';

// 消息 ID 计数器
let messageId = 0;
// 存储所有消息实例
const instances: Map<string, VNode> = new Map();
// 存储位置对应的消息实例
const positionInstances: Map<string, string[]> = new Map();

/**
 * 获取消息位置
 */
const getMessagePosition = (options: MessageOptions): string => {
  return options.position || 'top';
};

/**
 * 计算偏移量
 */
const getOffset = (position: string): number => {
  const positionList = positionInstances.get(position) || [];
  return 20 + positionList.length * 60; // 每个消息大约 60px 高度（包含间距）
};

/**
 * 创建消息
 */
const createMessage = (options: MessageOptions): MessageInstance => {
  const id = `message-${++messageId}`;
  const position = getMessagePosition(options);
  const offset = getOffset(position);

  // 创建容器
  const container = document.createElement('div');
  document.body.appendChild(container);

  // 创建 vnode
  const vnode = h(MessageComponent, {
    ...options,
    id,
    offset,
    visible: true,
    onClose: () => {
      closeMessage(id);
      options.onClose?.();
    },
    onDestroy: () => {
      destroyMessage(id, container, vnode);
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
    close: () => closeMessage(id)
  };
};

/**
 * 关闭消息
 */
const closeMessage = (id: string) => {
  const vnode = instances.get(id);
  if (vnode && vnode.component) {
    // 更新组件的 visible 属性，触发组件关闭动画
    vnode.component.props.visible = false;
    // 注意：不要调用 exposed.close()，因为 onClose 回调会处理
  }
};

/**
 * 销毁消息
 */
const destroyMessage = (id: string, container: HTMLElement, _vnode: VNode) => {
  // 从实例列表中移除
  instances.delete(id);
  
  // 从位置列表中移除
  for (const [position, ids] of positionInstances.entries()) {
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
      // 更新该位置其他消息的偏移量
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
 * 更新指定位置所有消息的偏移量
 */
const updateOffsets = (position: string) => {
  const ids = positionInstances.get(position) || [];
  ids.forEach((id, index) => {
    const vnode = instances.get(id);
    if (vnode && vnode.component) {
      const newOffset = 20 + index * 60;
      vnode.component.props.offset = newOffset;
    }
  });
};

/**
 * 关闭所有消息
 */
const closeAll = () => {
  instances.forEach((_vnode, id) => {
    closeMessage(id);
  });
};

/**
 * 创建类型化消息方法
 */
const createTypedMessage = (type: MessageType) => {
  return (options: MessageOptions | string): MessageInstance => {
    if (typeof options === 'string') {
      options = { message: options };
    }
    return createMessage({ ...options, type });
  };
};

/**
 * Message 全局方法
 */
const Message: MessageGlobalMethod = Object.assign(
  (options: MessageOptions | string): MessageInstance => {
    if (typeof options === 'string') {
      options = { message: options };
    }
    return createMessage(options);
  },
  {
    success: createTypedMessage('success'),
    warning: createTypedMessage('warning'),
    error: createTypedMessage('error'),
    info: createTypedMessage('info'),
    closeAll
  }
);

export { Message };
export { default as MessageComponent } from './Message.vue';

export type {
  MessageOptions,
  MessageInstance,
  MessageGlobalMethod,
  MessageType,
  MessagePosition,
  MessageProps
} from './types';

export default Message;
