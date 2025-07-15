// vite.config.ts
import react from "file:///D:/Workspace/GUL/w3a-quick-start/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/Workspace/GUL/w3a-quick-start/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  // alias are only to be added when absolutely necessary, these modules are already present in the browser environment
  // resolve: {
  // alias: {
  // crypto: "crypto-browserify",
  // assert: "assert",
  // http: "stream-http",
  // https: "https-browserify",
  // url: "url",
  // zlib: "browserify-zlib",
  // stream: "stream-browserify",
  // },
  // },
  define: {
    global: "globalThis"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3Jrc3BhY2VcXFxcR1VMXFxcXHczYS1xdWljay1zdGFydFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya3NwYWNlXFxcXEdVTFxcXFx3M2EtcXVpY2stc3RhcnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmtzcGFjZS9HVUwvdzNhLXF1aWNrLXN0YXJ0L3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzICovXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICAvLyBhbGlhcyBhcmUgb25seSB0byBiZSBhZGRlZCB3aGVuIGFic29sdXRlbHkgbmVjZXNzYXJ5LCB0aGVzZSBtb2R1bGVzIGFyZSBhbHJlYWR5IHByZXNlbnQgaW4gdGhlIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAgLy8gcmVzb2x2ZToge1xuICAvLyBhbGlhczoge1xuICAvLyBjcnlwdG86IFwiY3J5cHRvLWJyb3dzZXJpZnlcIixcbiAgLy8gYXNzZXJ0OiBcImFzc2VydFwiLFxuICAvLyBodHRwOiBcInN0cmVhbS1odHRwXCIsXG4gIC8vIGh0dHBzOiBcImh0dHBzLWJyb3dzZXJpZnlcIixcbiAgLy8gdXJsOiBcInVybFwiLFxuICAvLyB6bGliOiBcImJyb3dzZXJpZnktemxpYlwiLFxuICAvLyBzdHJlYW06IFwic3RyZWFtLWJyb3dzZXJpZnlcIixcbiAgLy8gfSxcbiAgLy8gfSxcbiAgZGVmaW5lOiB7XG4gICAgZ2xvYmFsOiBcImdsb2JhbFRoaXNcIixcbiAgfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFHN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBYWpCLFFBQVE7QUFBQSxJQUNOLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
