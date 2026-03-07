/**
 * Tree 组件常量定义
 */

import type { InjectionKey } from 'vue';
import type { TreeContext } from './types';

/**
 * Tree 上下文注入 key
 */
export const TREE_CONTEXT_KEY: InjectionKey<TreeContext> = Symbol('treeContext');
