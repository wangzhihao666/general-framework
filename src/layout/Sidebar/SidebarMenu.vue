<template>
  <el-menu
    active-text-color="#fff"
    background-color="#304156"
    :default-active="$route.path"
    text-color="#bfcbd9"
    unique-opened
    router
  >
    <sidebar-menu-item
      v-for="item in menuList"
      :key="item"
      :menuList="item"
    ></sidebar-menu-item>
    <!-- <el-menu-item index="/profile">
          <el-icon>
            <svg-icon icon="personnel"></svg-icon>
          </el-icon>
          <span>个人中心</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <svg-icon icon="personnel"></svg-icon>
            </el-icon>
            <span>用户</span>
          </template>
          <el-menu-item index="/user/manage">
            <el-icon>
              <svg-icon icon="personnel-manage"></svg-icon>
            </el-icon>
            <span> 员工管理</span>
          </el-menu-item>
          <el-menu-item index="/user/role">
            <el-icon>
              <svg-icon icon="role"></svg-icon>
            </el-icon>
            <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="/user/permission">
            <el-icon>
              <svg-icon icon="permission"></svg-icon>
            </el-icon>
            <span>权限列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <svg-icon icon="article"></svg-icon>
            </el-icon>
            <span>文章</span>
          </template>
          <el-menu-item index="/article/ranking">
            <el-icon>
              <svg-icon icon="article-ranking"></svg-icon>
            </el-icon>
            <span> 文章排名</span>
          </el-menu-item>
          <el-menu-item index="/article/create">
            <el-icon>
              <svg-icon icon="article-create"></svg-icon>
            </el-icon>
            <span>文章创建</span>
          </el-menu-item>
        </el-sub-menu>
        -->
  </el-menu>
</template>

<script setup>
/**
 * 1. 先定义菜单最终所需要的数据
 *
 * 2. 通过递归组件动态渲染菜单的数据
 *
 * 3. 获取到路由表的所有数据 router.getRoutes() 完整路由表的数据
 *
 * 4. 将路由表的数据过滤成菜单最终所需要的数据
 *
 * 没有children   el-menu-item
 * 有children     el-sub-menu
 */
// import { reactive } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterMenuData } from '../../utils/menu'
import { filterRouters, generateMenus } from '../../utils/router'
import SidebarMenuItem from './SidebarMenuItem'

const router = useRouter()

console.log('routes=>', router.getRoutes())

const menuList = computed(() => {
  const routes = filterRouters(router.getRoutes())
  return filterMenuData(generateMenus(routes))
})
</script>

<style scoped lang="scss"></style>
