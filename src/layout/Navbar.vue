<template>
  <div class="navbar">
    <!-- 左侧图标 -->
    <div class="icon">
      <el-icon class="el-icon" :size="25"><Fold /></el-icon>
      <el-icon><Expand /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { Fold, Expand } from '@element-plus/icons-vue'
// 左
// <el-icon><Fold /></el-icon>
// 右
// <el-icon><Expand /></el-icon>
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .icon{
    width: 50px;
    height: 50px;
    background-color: #fff;
    text-align: center;
    .el-icon{
      margin-top: 10px;
    }
  }
  .icon :hover{
    background-color: #e5e5e5;
  }
}
</style>
