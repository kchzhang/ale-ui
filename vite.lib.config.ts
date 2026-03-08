import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    // TypeScript 声明文件生成配置
    dts({
      entryRoot: 'packages',
      include: ['packages/**/*.ts', 'packages/**/*.vue'],
      exclude: ['packages/**/__tests__/**'],
      outDir: 'dist-lib',
      staticImport: true,
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.lib.json'
    })
  ],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'AleUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `ale-ui.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      // 完整外部化 Vue 相关依赖，避免打包进库文件
      external: [
        'vue',
        /^@vue\//,  // 包含 @vue/runtime-core, @vue/shared 等
        /^vue\//    // 包含 vue/jsx-runtime 等
      ],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: 'style.[ext]'
      }
    },
    outDir: 'dist-lib',
    cssCodeSplit: false,
    minify: false,
    sourcemap: true
  },
  resolve: {
    alias: {
      'ale-ui': resolve(__dirname, './packages'),
      '@': resolve(__dirname, './src')
    }
  }
});
