<template>
  <div class="Sidebar">
    <!-- <h5 class="mb-2">Custom colors</h5> -->
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Avatar /></el-icon>
          <span>个人中心</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><Place /></el-icon>
        <span>用户</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><List /></el-icon>
        <span>文章</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import {} from 'vue'
import { Avatar, Place, List } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped></style>
