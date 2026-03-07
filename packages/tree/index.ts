/**
 * Tree 组件入口文件 - Element Plus 规范
 */

import Tree from './Tree.vue';
import TreeNode from './TreeNode.vue';

export { Tree as AleTree, TreeNode as AleTreeNode };
export type {
  TreeProps,
  TreeEmits,
  TreeExpose,
  TreeData,
  TreeNode,
  TreeOptionProps,
  TreeNodeProps,
  FilterNodeMethodFunction,
  AllowDragFunction,
  AllowDropFunction,
  LoadFunction,
  RenderContentFunction,
  DropType,
} from './tree.type';

export default Tree;
