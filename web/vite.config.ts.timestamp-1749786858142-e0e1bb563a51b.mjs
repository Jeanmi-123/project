// vite.config.ts
import { loadEnv } from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/vite/dist/node/index.js";
import { resolve } from "path";

// build/utils.ts
import dotenv from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/dotenv/lib/main.js";
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

// build/vite/plugin/index.ts
import Components from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/unplugin-vue-components/dist/resolvers.js";
import topLevelAwait from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/vite-plugin-top-level-await/exports/import.mjs";
import setupExtend from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import vue from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// build/vite/plugin/html.ts
import { createHtmlPlugin } from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/vite-plugin-html/dist/index.mjs";

// package.json
var package_default = {
  name: "hotgo",
  type: "module",
  version: "2.16.10",
  author: {
    name: "MengShuai",
    email: "133814250@qq.com",
    url: "https://github.com/bufanyun/hotgo"
  },
  private: true,
  scripts: {
    bootstrap: "pnpm install",
    serve: "pnpm run dev",
    dev: "vite",
    build: "vite build && esno ./build/script/postBuild.ts",
    "build:no-cache": "pnpm clean:cache && pnpm run build",
    report: "cross-env REPORT=true pnpm run build",
    preview: "pnpm run build && vite preview",
    "preview:dist": "vite preview",
    "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
    "clean:lib": "rimraf node_modules",
    deploy: "gh-pages -d dist",
    "lint:eslint": 'eslint "{src,mock}/**/*.{vue,ts,tsx}" --fix',
    "lint:prettier": 'prettier --write --loglevel warn "src/**/*.{js,json,tsx,css,less,scss,vue,html,md}"',
    "lint:stylelint": 'stylelint --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
    "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js",
    "lint:pretty": "pretty-quick --staged",
    "build typecheck": "vuedx-typecheck . && vite build",
    "test prod gzip": "http-server dist --cors --gzip -c-1"
  },
  dependencies: {
    "@vicons/antd": "^0.12.0",
    "@vicons/ionicons5": "^0.12.0",
    "@vue/runtime-core": "^3.4.38",
    "@vueup/vue-quill": "^1.2.0",
    "@vueuse/core": "^11.0.3",
    axios: "^1.7.7",
    "blueimp-md5": "^2.19.0",
    "date-fns": "^3.6.0",
    echarts: "^5.5.1",
    "element-resize-detector": "^1.2.4",
    fingerprintjs2: "^2.1.4",
    "highlight.js": "^11.10.0",
    "lodash-es": "^4.17.21",
    "mint-filter": "^4.0.3",
    mitt: "^3.0.1",
    "naive-ui": "^2.41.0",
    pinia: "^2.2.2",
    "pinyin-pro": "^3.24.2",
    "print-js": "^1.6.0",
    "qrcode.vue": "3.4.1",
    qs: "^6.13.0",
    "quill-image-uploader": "^1.3.0",
    "quill-magic-url": "^4.2.0",
    "spark-md5": "^3.0.2",
    "throttle-debounce": "^5.0.2",
    vfonts: "^0.0.3",
    vue: "^3.4.38",
    "vue-router": "^4.4.3",
    "vue-types": "^5.1.3",
    "vue-waterfall-plugin-next": "^2.6.0",
    "vue3-json-viewer": "^2.2.2",
    vuedraggable: "^4.1.0",
    "weixin-js-sdk": "^1.6.5"
  },
  devDependencies: {
    "@commitlint/cli": "^19.4.1",
    "@commitlint/config-conventional": "^19.4.1",
    "@eslint/eslintrc": "^3.1.0",
    "@types/fs-extra": "^11.0.4",
    "@types/lodash-es": "^4.17.12",
    "@types/node": "^22.5.2",
    "@typescript-eslint/eslint-plugin": "^8.4.0",
    "@typescript-eslint/parser": "^8.4.0",
    "@vitejs/plugin-vue": "^5.1.3",
    "@vitejs/plugin-vue-jsx": "^4.0.1",
    "@vue/compiler-sfc": "^3.4.38",
    "@vue/eslint-config-typescript": "^13.0.0",
    autoprefixer: "^10.4.20",
    chalk: "^5.3.0",
    commitizen: "^4.3.0",
    "core-js": "^3.38.1",
    "cross-env": "^7.0.3",
    "crypto-js": "^4.2.0",
    dotenv: "^16.4.5",
    eslint: "^9.9.1",
    "eslint-config-prettier": "^9.1.0",
    "eslint-define-config": "2.1.0",
    "eslint-plugin-jest": "^28.8.2",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-vue": "^9.28.0",
    esno: "^4.7.0",
    "fs-extra": "^11.2.0",
    "gh-pages": "^6.1.1",
    husky: "^9.1.5",
    jest: "^29.7.0",
    less: "^4.2.0",
    "less-loader": "^12.2.0",
    "lint-staged": "^15.2.10",
    mockjs: "^1.1.0",
    "npm-check-updates": "^17.1.1",
    postcss: "^8.4.44",
    prettier: "^3.3.3",
    "pretty-quick": "^4.0.0",
    rimraf: "^6.0.1",
    stylelint: "^16.9.0",
    "stylelint-config-prettier": "^9.0.5",
    "stylelint-config-standard": "^36.0.1",
    "stylelint-order": "^6.0.4",
    "stylelint-scss": "^6.5.1",
    tailwindcss: "^3.4.10",
    typescript: "^5.5.4",
    "unplugin-vue-components": "^0.27.4",
    vite: "^5.4.2",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-mock": "^3.0.2",
    "vite-plugin-require-transform": "^1.0.21",
    "vite-plugin-style-import": "^2.0.0",
    "vite-plugin-top-level-await": "^1.4.4",
    "vite-plugin-vue-setup-extend": "^0.4.0",
    "vue-demi": "^0.14.10",
    "vue-draggable-next": "^2.2.1",
    "vue-eslint-parser": "^9.4.3",
    vuedraggable: "^4.1.0"
  },
  "lint-staged": {
    "*.{vue,js,ts,tsx}": "eslint --fix"
  },
  config: {
    commitizen: {
      path: "./node_modules/cz-customizable"
    }
  },
  keywords: [
    "hotgo",
    "hg",
    "gf",
    "goframe",
    "vue",
    "naive-ui",
    "naive-ui-admin",
    "vue3",
    "ts",
    "tsx",
    "admin",
    "typescript"
  ],
  repository: {
    type: "git",
    url: "git+https://github.com/bufanyun/hotgo.git"
  },
  license: "MIT",
  bugs: {
    url: "https://github.com/bufanyun/hotgo/issues"
  },
  homepage: "https://github.com/bufanyun/hotgo",
  engines: {
    node: ">=16"
  }
};

// build/constant.ts
var GLOB_CONFIG_FILE_NAME = "app.config.js";
var OUTPUT_DIR = "dist";

// build/vite/plugin/html.ts
function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;
  const path = VITE_PUBLIC_PATH.endsWith("/") ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;
  const getAppConfigSrc = () => {
    return `${path || "/"}${GLOB_CONFIG_FILE_NAME}?v=${package_default.version}-${(/* @__PURE__ */ new Date()).getTime()}`;
  };
  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE
      },
      // Embed the generated app.config.js file
      tags: isBuild ? [
        {
          tag: "script",
          attrs: {
            src: getAppConfigSrc()
          }
        }
      ] : []
    }
  });
}

// build/vite/plugin/compress.ts
import compressPlugin from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/vite-plugin-compression/dist/index.mjs";
function configCompressPlugin(compress, deleteOriginFile = false) {
  const compressList = compress.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}

// build/vite/plugin/index.ts
function createVitePlugins(viteEnv, isBuild) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const vitePlugins = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // 按需引入NaiveUi且自动创建组件声明
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()]
    }),
    // 支持顶级wait
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`
    })
  ];
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  if (isBuild) {
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }
  vitePlugins.push(setupExtend());
  return vitePlugins;
}

// build/vite/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// vite.config.ts
import { format } from "file:///Users/jeanmiliu/JeanmiProject/hotgo%20Project/hotgo-2.0/web/node_modules/date-fns/index.mjs";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss")
};
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
var vite_config_default = ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } = viteEnv;
  const isBuild = command === "build";
  return {
    base: VITE_PUBLIC_PATH,
    esbuild: {},
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/"
        },
        {
          find: "@",
          replacement: pathResolve("src") + "/"
        }
      ],
      dedupe: ["vue"]
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          additionalData: `@import "src/styles/var.less";`
        }
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
      // proxy: {
      //     '/api': {
      //         target: '',
      //         changeOrigin: true,
      //         rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      //     }
      // }
    },
    optimizeDeps: {
      include: [],
      exclude: ["vue-demi"]
    },
    build: {
      target: "es2015",
      cssTarget: "chrome80",
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 3e3
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaHRtbC50cyIsICJwYWNrYWdlLmpzb24iLCAiYnVpbGQvY29uc3RhbnQudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vY29tcHJlc3MudHMiLCAiYnVpbGQvdml0ZS9wcm94eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2plYW5taWxpdS9KZWFubWlQcm9qZWN0L2hvdGdvJTIwUHJvamVjdC9ob3Rnby0yLjAvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnLCBDb25maWdFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tICcuL2J1aWxkL3V0aWxzJztcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC92aXRlL3BsdWdpbic7XG5pbXBvcnQgeyBPVVRQVVRfRElSIH0gZnJvbSAnLi9idWlsZC9jb25zdGFudCc7XG5pbXBvcnQgeyBjcmVhdGVQcm94eSB9IGZyb20gJy4vYnVpbGQvdml0ZS9wcm94eSc7XG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmNvbnN0IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSA9IHBrZztcblxuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICBwa2c6IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSxcbiAgbGFzdEJ1aWxkVGltZTogZm9ybWF0KG5ldyBEYXRlKCksICd5eXl5LU1NLWRkIEhIOm1tOnNzJyksXG59O1xuXG5mdW5jdGlvbiBwYXRoUmVzb2x2ZShkaXI6IHN0cmluZykge1xuICByZXR1cm4gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLicsIGRpcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0ICh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpO1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xuICBjb25zdCB2aXRlRW52ID0gd3JhcHBlckVudihlbnYpO1xuICBjb25zdCB7IFZJVEVfUFVCTElDX1BBVEgsIFZJVEVfUE9SVCwgVklURV9QUk9YWSB9ID0gdml0ZUVudjtcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCc7XG4gIHJldHVybiB7XG4gICAgYmFzZTogVklURV9QVUJMSUNfUEFUSCxcbiAgICBlc2J1aWxkOiB7fSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL1xcLyNcXC8vLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgndHlwZXMnKSArICcvJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aFJlc29sdmUoJ3NyYycpICsgJy8nLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGRlZHVwZTogWyd2dWUnXSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzQnVpbGQpLFxuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfSU5GT19fOiBKU09OLnN0cmluZ2lmeShfX0FQUF9JTkZPX18pLFxuICAgICAgX19WVUVfT1BUSU9OU19BUElfXzogdHJ1ZSxcbiAgICAgIF9fVlVFX1BST0RfREVWVE9PTFNfXzogZmFsc2UsXG4gICAgICBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX186IHRydWUsXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIG1vZGlmeVZhcnM6IHt9LFxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcInNyYy9zdHlsZXMvdmFyLmxlc3NcIjtgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIHBvcnQ6IFZJVEVfUE9SVCxcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eShWSVRFX1BST1hZKSxcbiAgICAgIC8vIHByb3h5OiB7XG4gICAgICAvLyAgICAgJy9hcGknOiB7XG4gICAgICAvLyAgICAgICAgIHRhcmdldDogJycsXG4gICAgICAvLyAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIC8vICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcvYXBpL3YxJylcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyB9XG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtdLFxuICAgICAgZXhjbHVkZTogWyd2dWUtZGVtaSddLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgICBjc3NUYXJnZXQ6ICdjaHJvbWU4MCcsXG4gICAgICBvdXREaXI6IE9VVFBVVF9ESVIsXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDMwMDAsXG4gICAgfSxcbiAgfTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2plYW5taWxpdS9KZWFubWlQcm9qZWN0L2hvdGdvJTIwUHJvamVjdC9ob3Rnby0yLjAvd2ViL2J1aWxkL3V0aWxzLnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdwcm9kdWN0aW9uJztcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRvIGdlbmVyYXRlIHBhY2thZ2UgcHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZXBvcnRNb2RlKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gcHJvY2Vzcy5lbnYuUkVQT1JUID09PSAndHJ1ZSc7XG59XG5cbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcbiAgY29uc3QgcmV0OiBhbnkgPSB7fTtcblxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcbiAgICBsZXQgcmVhbE5hbWUgPSBlbnZDb25mW2Vudk5hbWVdLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKTtcbiAgICByZWFsTmFtZSA9IHJlYWxOYW1lID09PSAndHJ1ZScgPyB0cnVlIDogcmVhbE5hbWUgPT09ICdmYWxzZScgPyBmYWxzZSA6IHJlYWxOYW1lO1xuXG4gICAgaWYgKGVudk5hbWUgPT09ICdWSVRFX1BPUlQnKSB7XG4gICAgICByZWFsTmFtZSA9IE51bWJlcihyZWFsTmFtZSk7XG4gICAgfVxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QUk9YWScpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICB9XG4gICAgcmV0W2Vudk5hbWVdID0gcmVhbE5hbWU7XG4gICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vKipcbiAqIEdldCB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIHN0YXJ0aW5nIHdpdGggdGhlIHNwZWNpZmllZCBwcmVmaXhcbiAqIEBwYXJhbSBtYXRjaCBwcmVmaXhcbiAqIEBwYXJhbSBjb25mRmlsZXMgZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnZDb25maWcobWF0Y2ggPSAnVklURV9HTE9CXycsIGNvbmZGaWxlcyA9IFsnLmVudicsICcuZW52LnByb2R1Y3Rpb24nXSkge1xuICBsZXQgZW52Q29uZmlnID0ge307XG4gIGNvbmZGaWxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVudiA9IGRvdGVudi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGl0ZW0pKSk7XG4gICAgICBlbnZDb25maWcgPSB7IC4uLmVudkNvbmZpZywgLi4uZW52IH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH0pO1xuXG4gIE9iamVjdC5rZXlzKGVudkNvbmZpZykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChgXigke21hdGNofSlgKTtcbiAgICBpZiAoIXJlZy50ZXN0KGtleSkpIHtcbiAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoZW52Q29uZmlnLCBrZXkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBlbnZDb25maWc7XG59XG5cbi8qKlxuICogR2V0IG1lbWJlciByb290IGRpcmVjdG9yeVxuICogQHBhcmFtIGRpciBmaWxlIHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RQYXRoKC4uLmRpcjogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAuLi5kaXIpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamVhbm1pbGl1L0plYW5taVByb2plY3QvaG90Z28gUHJvamVjdC9ob3Rnby0yLjAvd2ViL2J1aWxkL3ZpdGUvcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamVhbm1pbGl1L0plYW5taVByb2plY3QvaG90Z28gUHJvamVjdC9ob3Rnby0yLjAvd2ViL2J1aWxkL3ZpdGUvcGx1Z2luL2luZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyUyMFByb2plY3QvaG90Z28tMi4wL3dlYi9idWlsZC92aXRlL3BsdWdpbi9pbmRleC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IE5haXZlVWlSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgdG9wTGV2ZWxBd2FpdCBmcm9tICd2aXRlLXBsdWdpbi10b3AtbGV2ZWwtYXdhaXQnO1xuaW1wb3J0IHNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcbmltcG9ydCB7IGNvbmZpZ0h0bWxQbHVnaW4gfSBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IHsgY29uZmlnQ29tcHJlc3NQbHVnaW4gfSBmcm9tICcuL2NvbXByZXNzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnY6IFZpdGVFbnYsIGlzQnVpbGQ6IGJvb2xlYW4pIHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTLCBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRSB9ID0gdml0ZUVudjtcblxuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbiB8IFBsdWdpbltdKVtdID0gW1xuICAgIC8vIGhhdmUgdG9cbiAgICB2dWUoKSxcbiAgICAvLyBoYXZlIHRvXG4gICAgdnVlSnN4KCksXG5cbiAgICAvLyBcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjVOYWl2ZVVpXHU0RTE0XHU4MUVBXHU1MkE4XHU1MjFCXHU1RUZBXHU3RUM0XHU0RUY2XHU1OEYwXHU2NjBFXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6IHRydWUsXG4gICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKV0sXG4gICAgfSksXG5cbiAgICAvLyBcdTY1MkZcdTYzMDFcdTk4NzZcdTdFQTd3YWl0XG4gICAgdG9wTGV2ZWxBd2FpdCh7XG4gICAgICAvLyBUaGUgZXhwb3J0IG5hbWUgb2YgdG9wLWxldmVsIGF3YWl0IHByb21pc2UgZm9yIGVhY2ggY2h1bmsgbW9kdWxlXG4gICAgICBwcm9taXNlRXhwb3J0TmFtZTogJ19fdGxhJyxcbiAgICAgIC8vIFRoZSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBpbXBvcnQgbmFtZXMgb2YgdG9wLWxldmVsIGF3YWl0IHByb21pc2UgaW4gZWFjaCBjaHVuayBtb2R1bGVcbiAgICAgIHByb21pc2VJbXBvcnROYW1lOiAoaSkgPT4gYF9fdGxhXyR7aX1gLFxuICAgIH0pLFxuICBdO1xuXG4gIC8vIHZpdGUtcGx1Z2luLWh0bWxcbiAgdml0ZVBsdWdpbnMucHVzaChjb25maWdIdG1sUGx1Z2luKHZpdGVFbnYsIGlzQnVpbGQpKTtcblxuICBpZiAoaXNCdWlsZCkge1xuICAgIC8vIHJvbGx1cC1wbHVnaW4tZ3ppcFxuICAgIHZpdGVQbHVnaW5zLnB1c2goXG4gICAgICBjb25maWdDb21wcmVzc1BsdWdpbihWSVRFX0JVSUxEX0NPTVBSRVNTLCBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRSlcbiAgICApO1xuICB9XG5cbiAgdml0ZVBsdWdpbnMucHVzaChzZXR1cEV4dGVuZCgpKTtcblxuICByZXR1cm4gdml0ZVBsdWdpbnM7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdml0ZS9wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdml0ZS9wbHVnaW4vaHRtbC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamVhbm1pbGl1L0plYW5taVByb2plY3QvaG90Z28lMjBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdml0ZS9wbHVnaW4vaHRtbC50c1wiOy8qKlxuICogUGx1Z2luIHRvIG1pbmltaXplIGFuZCB1c2UgZWpzIHRlbXBsYXRlIHN5bnRheCBpbiBpbmRleC5odG1sLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FubmN3Yi92aXRlLXBsdWdpbi1odG1sXG4gKi9cbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcbmltcG9ydCBwa2cgZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7IEdMT0JfQ09ORklHX0ZJTEVfTkFNRSB9IGZyb20gJy4uLy4uL2NvbnN0YW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0h0bWxQbHVnaW4oZW52OiBWaXRlRW52LCBpc0J1aWxkOiBib29sZWFuKSB7XG4gIGNvbnN0IHsgVklURV9HTE9CX0FQUF9USVRMRSwgVklURV9QVUJMSUNfUEFUSCB9ID0gZW52O1xuXG4gIGNvbnN0IHBhdGggPSBWSVRFX1BVQkxJQ19QQVRILmVuZHNXaXRoKCcvJykgPyBWSVRFX1BVQkxJQ19QQVRIIDogYCR7VklURV9QVUJMSUNfUEFUSH0vYDtcblxuICBjb25zdCBnZXRBcHBDb25maWdTcmMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGAke3BhdGggfHwgJy8nfSR7R0xPQl9DT05GSUdfRklMRV9OQU1FfT92PSR7cGtnLnZlcnNpb259LSR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YDtcbiAgfTtcblxuICByZXR1cm4gY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgbWluaWZ5OiBpc0J1aWxkLFxuICAgIGluamVjdDoge1xuICAgICAgLy8gSW5qZWN0IGRhdGEgaW50byBlanMgdGVtcGxhdGVcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXG4gICAgICB9LFxuICAgICAgLy8gRW1iZWQgdGhlIGdlbmVyYXRlZCBhcHAuY29uZmlnLmpzIGZpbGVcbiAgICAgIHRhZ3M6IGlzQnVpbGRcbiAgICAgICAgPyBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGFnOiAnc2NyaXB0JyxcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHNyYzogZ2V0QXBwQ29uZmlnU3JjKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICAgICAgOiBbXSxcbiAgICB9LFxuICB9KTtcbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcImhvdGdvXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInZlcnNpb25cIjogXCIyLjE2LjEwXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJNZW5nU2h1YWlcIixcbiAgICBcImVtYWlsXCI6IFwiMTMzODE0MjUwQHFxLmNvbVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2J1ZmFueXVuL2hvdGdvXCJcbiAgfSxcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJib290c3RyYXBcIjogXCJwbnBtIGluc3RhbGxcIixcbiAgICBcInNlcnZlXCI6IFwicG5wbSBydW4gZGV2XCIsXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGQgJiYgZXNubyAuL2J1aWxkL3NjcmlwdC9wb3N0QnVpbGQudHNcIixcbiAgICBcImJ1aWxkOm5vLWNhY2hlXCI6IFwicG5wbSBjbGVhbjpjYWNoZSAmJiBwbnBtIHJ1biBidWlsZFwiLFxuICAgIFwicmVwb3J0XCI6IFwiY3Jvc3MtZW52IFJFUE9SVD10cnVlIHBucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwicG5wbSBydW4gYnVpbGQgJiYgdml0ZSBwcmV2aWV3XCIsXG4gICAgXCJwcmV2aWV3OmRpc3RcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcImNsZWFuOmNhY2hlXCI6IFwicmltcmFmIG5vZGVfbW9kdWxlcy8uY2FjaGUvICYmIHJpbXJhZiBub2RlX21vZHVsZXMvLnZpdGVcIixcbiAgICBcImNsZWFuOmxpYlwiOiBcInJpbXJhZiBub2RlX21vZHVsZXNcIixcbiAgICBcImRlcGxveVwiOiBcImdoLXBhZ2VzIC1kIGRpc3RcIixcbiAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IFxcXCJ7c3JjLG1vY2t9LyoqLyoue3Z1ZSx0cyx0c3h9XFxcIiAtLWZpeFwiLFxuICAgIFwibGludDpwcmV0dGllclwiOiBcInByZXR0aWVyIC0td3JpdGUgLS1sb2dsZXZlbCB3YXJuIFxcXCJzcmMvKiovKi57anMsanNvbix0c3gsY3NzLGxlc3Msc2Nzcyx2dWUsaHRtbCxtZH1cXFwiXCIsXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCAtLWZpeCBcXFwiKiovKi57dnVlLGxlc3MscG9zdGNzcyxjc3Msc2Nzc31cXFwiIC0tY2FjaGUgLS1jYWNoZS1sb2NhdGlvbiBub2RlX21vZHVsZXMvLmNhY2hlL3N0eWxlbGludC9cIixcbiAgICBcImxpbnQ6bGludC1zdGFnZWRcIjogXCJsaW50LXN0YWdlZCAtYyAuLy5odXNreS9saW50c3RhZ2VkcmMuanNcIixcbiAgICBcImxpbnQ6cHJldHR5XCI6IFwicHJldHR5LXF1aWNrIC0tc3RhZ2VkXCIsXG4gICAgXCJidWlsZCB0eXBlY2hlY2tcIjogXCJ2dWVkeC10eXBlY2hlY2sgLiAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJ0ZXN0IHByb2QgZ3ppcFwiOiBcImh0dHAtc2VydmVyIGRpc3QgLS1jb3JzIC0tZ3ppcCAtYy0xXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHZpY29ucy9hbnRkXCI6IFwiXjAuMTIuMFwiLFxuICAgIFwiQHZpY29ucy9pb25pY29uczVcIjogXCJeMC4xMi4wXCIsXG4gICAgXCJAdnVlL3J1bnRpbWUtY29yZVwiOiBcIl4zLjQuMzhcIixcbiAgICBcIkB2dWV1cC92dWUtcXVpbGxcIjogXCJeMS4yLjBcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMS4wLjNcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNy43XCIsXG4gICAgXCJibHVlaW1wLW1kNVwiOiBcIl4yLjE5LjBcIixcbiAgICBcImRhdGUtZm5zXCI6IFwiXjMuNi4wXCIsXG4gICAgXCJlY2hhcnRzXCI6IFwiXjUuNS4xXCIsXG4gICAgXCJlbGVtZW50LXJlc2l6ZS1kZXRlY3RvclwiOiBcIl4xLjIuNFwiLFxuICAgIFwiZmluZ2VycHJpbnRqczJcIjogXCJeMi4xLjRcIixcbiAgICBcImhpZ2hsaWdodC5qc1wiOiBcIl4xMS4xMC4wXCIsXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibWludC1maWx0ZXJcIjogXCJeNC4wLjNcIixcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcbiAgICBcIm5haXZlLXVpXCI6IFwiXjIuNDEuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4yLjJcIixcbiAgICBcInBpbnlpbi1wcm9cIjogXCJeMy4yNC4yXCIsXG4gICAgXCJwcmludC1qc1wiOiBcIl4xLjYuMFwiLFxuICAgIFwicXJjb2RlLnZ1ZVwiOiBcIjMuNC4xXCIsXG4gICAgXCJxc1wiOiBcIl42LjEzLjBcIixcbiAgICBcInF1aWxsLWltYWdlLXVwbG9hZGVyXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJxdWlsbC1tYWdpYy11cmxcIjogXCJeNC4yLjBcIixcbiAgICBcInNwYXJrLW1kNVwiOiBcIl4zLjAuMlwiLFxuICAgIFwidGhyb3R0bGUtZGVib3VuY2VcIjogXCJeNS4wLjJcIixcbiAgICBcInZmb250c1wiOiBcIl4wLjAuM1wiLFxuICAgIFwidnVlXCI6IFwiXjMuNC4zOFwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjQuM1wiLFxuICAgIFwidnVlLXR5cGVzXCI6IFwiXjUuMS4zXCIsXG4gICAgXCJ2dWUtd2F0ZXJmYWxsLXBsdWdpbi1uZXh0XCI6IFwiXjIuNi4wXCIsXG4gICAgXCJ2dWUzLWpzb24tdmlld2VyXCI6IFwiXjIuMi4yXCIsXG4gICAgXCJ2dWVkcmFnZ2FibGVcIjogXCJeNC4xLjBcIixcbiAgICBcIndlaXhpbi1qcy1zZGtcIjogXCJeMS42LjVcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY29tbWl0bGludC9jbGlcIjogXCJeMTkuNC4xXCIsXG4gICAgXCJAY29tbWl0bGludC9jb25maWctY29udmVudGlvbmFsXCI6IFwiXjE5LjQuMVwiLFxuICAgIFwiQGVzbGludC9lc2xpbnRyY1wiOiBcIl4zLjEuMFwiLFxuICAgIFwiQHR5cGVzL2ZzLWV4dHJhXCI6IFwiXjExLjAuNFwiLFxuICAgIFwiQHR5cGVzL2xvZGFzaC1lc1wiOiBcIl40LjE3LjEyXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi41LjJcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjguNC4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjguNC4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4xLjNcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeNC4wLjFcIixcbiAgICBcIkB2dWUvY29tcGlsZXItc2ZjXCI6IFwiXjMuNC4zOFwiLFxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXR5cGVzY3JpcHRcIjogXCJeMTMuMC4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMFwiLFxuICAgIFwiY2hhbGtcIjogXCJeNS4zLjBcIixcbiAgICBcImNvbW1pdGl6ZW5cIjogXCJeNC4zLjBcIixcbiAgICBcImNvcmUtanNcIjogXCJeMy4zOC4xXCIsXG4gICAgXCJjcm9zcy1lbnZcIjogXCJeNy4wLjNcIixcbiAgICBcImNyeXB0by1qc1wiOiBcIl40LjIuMFwiLFxuICAgIFwiZG90ZW52XCI6IFwiXjE2LjQuNVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuOS4xXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXG4gICAgXCJlc2xpbnQtZGVmaW5lLWNvbmZpZ1wiOiBcIjIuMS4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWplc3RcIjogXCJeMjguOC4yXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjUuMi4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiOiBcIl45LjI4LjBcIixcbiAgICBcImVzbm9cIjogXCJeNC43LjBcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxuICAgIFwiZ2gtcGFnZXNcIjogXCJeNi4xLjFcIixcbiAgICBcImh1c2t5XCI6IFwiXjkuMS41XCIsXG4gICAgXCJqZXN0XCI6IFwiXjI5LjcuMFwiLFxuICAgIFwibGVzc1wiOiBcIl40LjIuMFwiLFxuICAgIFwibGVzcy1sb2FkZXJcIjogXCJeMTIuMi4wXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjEwXCIsXG4gICAgXCJtb2NranNcIjogXCJeMS4xLjBcIixcbiAgICBcIm5wbS1jaGVjay11cGRhdGVzXCI6IFwiXjE3LjEuMVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuNDRcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMy4zXCIsXG4gICAgXCJwcmV0dHktcXVpY2tcIjogXCJeNC4wLjBcIixcbiAgICBcInJpbXJhZlwiOiBcIl42LjAuMVwiLFxuICAgIFwic3R5bGVsaW50XCI6IFwiXjE2LjkuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjAuNVwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZFwiOiBcIl4zNi4wLjFcIixcbiAgICBcInN0eWxlbGludC1vcmRlclwiOiBcIl42LjAuNFwiLFxuICAgIFwic3R5bGVsaW50LXNjc3NcIjogXCJeNi41LjFcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjUuNFwiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNy40XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4yXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tbW9ja1wiOiBcIl4zLjAuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tcmVxdWlyZS10cmFuc2Zvcm1cIjogXCJeMS4wLjIxXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnRcIjogXCJeMi4wLjBcIixcbiAgICBcInZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdFwiOiBcIl4xLjQuNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZFwiOiBcIl4wLjQuMFwiLFxuICAgIFwidnVlLWRlbWlcIjogXCJeMC4xNC4xMFwiLFxuICAgIFwidnVlLWRyYWdnYWJsZS1uZXh0XCI6IFwiXjIuMi4xXCIsXG4gICAgXCJ2dWUtZXNsaW50LXBhcnNlclwiOiBcIl45LjQuM1wiLFxuICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiXjQuMS4wXCJcbiAgfSxcbiAgXCJsaW50LXN0YWdlZFwiOiB7XG4gICAgXCIqLnt2dWUsanMsdHMsdHN4fVwiOiBcImVzbGludCAtLWZpeFwiXG4gIH0sXG4gIFwiY29uZmlnXCI6IHtcbiAgICBcImNvbW1pdGl6ZW5cIjoge1xuICAgICAgXCJwYXRoXCI6IFwiLi9ub2RlX21vZHVsZXMvY3otY3VzdG9taXphYmxlXCJcbiAgICB9XG4gIH0sXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiaG90Z29cIixcbiAgICBcImhnXCIsXG4gICAgXCJnZlwiLFxuICAgIFwiZ29mcmFtZVwiLFxuICAgIFwidnVlXCIsXG4gICAgXCJuYWl2ZS11aVwiLFxuICAgIFwibmFpdmUtdWktYWRtaW5cIixcbiAgICBcInZ1ZTNcIixcbiAgICBcInRzXCIsXG4gICAgXCJ0c3hcIixcbiAgICBcImFkbWluXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCJcbiAgXSxcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdCtodHRwczovL2dpdGh1Yi5jb20vYnVmYW55dW4vaG90Z28uZ2l0XCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vYnVmYW55dW4vaG90Z28vaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9idWZhbnl1bi9ob3Rnb1wiLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MTZcIlxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvY29uc3RhbnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2plYW5taWxpdS9KZWFubWlQcm9qZWN0L2hvdGdvJTIwUHJvamVjdC9ob3Rnby0yLjAvd2ViL2J1aWxkL2NvbnN0YW50LnRzXCI7LyoqXG4gKiBUaGUgbmFtZSBvZiB0aGUgY29uZmlndXJhdGlvbiBmaWxlIGVudGVyZWQgaW4gdGhlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IEdMT0JfQ09ORklHX0ZJTEVfTkFNRSA9ICdhcHAuY29uZmlnLmpzJztcblxuZXhwb3J0IGNvbnN0IE9VVFBVVF9ESVIgPSAnZGlzdCc7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdml0ZS9wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdml0ZS9wbHVnaW4vY29tcHJlc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2plYW5taWxpdS9KZWFubWlQcm9qZWN0L2hvdGdvJTIwUHJvamVjdC9ob3Rnby0yLjAvd2ViL2J1aWxkL3ZpdGUvcGx1Z2luL2NvbXByZXNzLnRzXCI7LyoqXG4gKiBVc2VkIHRvIHBhY2thZ2UgYW5kIG91dHB1dCBnemlwLiBOb3RlIHRoYXQgdGhpcyBkb2VzIG5vdCB3b3JrIHByb3Blcmx5IGluIFZpdGUsIHRoZSBzcGVjaWZpYyByZWFzb24gaXMgc3RpbGwgYmVpbmcgaW52ZXN0aWdhdGVkXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXG4gKi9cbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5cbmltcG9ydCBjb21wcmVzc1BsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdDb21wcmVzc1BsdWdpbihcbiAgY29tcHJlc3M6ICdnemlwJyB8ICdicm90bGknIHwgJ25vbmUnLFxuICBkZWxldGVPcmlnaW5GaWxlID0gZmFsc2Vcbik6IFBsdWdpbiB8IFBsdWdpbltdIHtcbiAgY29uc3QgY29tcHJlc3NMaXN0ID0gY29tcHJlc3Muc3BsaXQoJywnKTtcblxuICBjb25zdCBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdO1xuXG4gIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIGNvbXByZXNzUGx1Z2luKHtcbiAgICAgICAgZXh0OiAnLmd6JyxcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIGNvbXByZXNzUGx1Z2luKHtcbiAgICAgICAgZXh0OiAnLmJyJyxcbiAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgICBkZWxldGVPcmlnaW5GaWxlLFxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIHJldHVybiBwbHVnaW5zO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamVhbm1pbGl1L0plYW5taVByb2plY3QvaG90Z28gUHJvamVjdC9ob3Rnby0yLjAvd2ViL2J1aWxkL3ZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWFubWlsaXUvSmVhbm1pUHJvamVjdC9ob3RnbyBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdml0ZS9wcm94eS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamVhbm1pbGl1L0plYW5taVByb2plY3QvaG90Z28lMjBQcm9qZWN0L2hvdGdvLTIuMC93ZWIvYnVpbGQvdml0ZS9wcm94eS50c1wiOy8qKlxuICogVXNlZCB0byBwYXJzZSB0aGUgLmVudi5kZXZlbG9wbWVudCBwcm94eSBjb25maWd1cmF0aW9uXG4gKi9cbmltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSAndml0ZSc7XG5cbnR5cGUgUHJveHlJdGVtID0gW3N0cmluZywgc3RyaW5nXTtcblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXTtcblxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnMgJiB7IHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHN0cmluZyB9PjtcblxuY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvLztcblxuLyoqXG4gKiBHZW5lcmF0ZSBwcm94eVxuICogQHBhcmFtIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XG4gIGNvbnN0IHJldDogUHJveHlUYXJnZXRMaXN0ID0ge307XG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XG4gICAgY29uc3QgaXNIdHRwcyA9IGh0dHBzUkUudGVzdCh0YXJnZXQpO1xuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h0dHAtcGFydHkvbm9kZS1odHRwLXByb3h5I29wdGlvbnNcbiAgICByZXRbcHJlZml4XSA9IHtcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgd3M6IHRydWUsXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxuICAgICAgLy8gaHR0cHMgaXMgcmVxdWlyZSBzZWN1cmU9ZmFsc2VcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSksXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZTtBQUN4QixTQUFTLGVBQWU7OztBQ0F4QixPQUFPLFlBQVk7QUFrQlosU0FBUyxXQUFXLFNBQThCO0FBQ3ZELFFBQU0sTUFBVyxDQUFDO0FBRWxCLGFBQVcsV0FBVyxPQUFPLEtBQUssT0FBTyxHQUFHO0FBQzFDLFFBQUksV0FBVyxRQUFRLE9BQU8sRUFBRSxRQUFRLFFBQVEsSUFBSTtBQUNwRCxlQUFXLGFBQWEsU0FBUyxPQUFPLGFBQWEsVUFBVSxRQUFRO0FBRXZFLFFBQUksWUFBWSxhQUFhO0FBQzNCLGlCQUFXLE9BQU8sUUFBUTtBQUFBLElBQzVCO0FBQ0EsUUFBSSxZQUFZLGNBQWM7QUFDNUIsVUFBSTtBQUNGLG1CQUFXLEtBQUssTUFBTSxRQUFRO0FBQUEsTUFDaEMsU0FBUyxPQUFPO0FBQUEsTUFBQztBQUFBLElBQ25CO0FBQ0EsUUFBSSxPQUFPLElBQUk7QUFDZixZQUFRLElBQUksT0FBTyxJQUFJO0FBQUEsRUFDekI7QUFDQSxTQUFPO0FBQ1Q7OztBQ3RDQSxPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZOzs7QUNGbkIsU0FBUyx3QkFBd0I7OztBQ0pqQztBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsUUFBVTtBQUFBLElBQ1IsTUFBUTtBQUFBLElBQ1IsT0FBUztBQUFB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
