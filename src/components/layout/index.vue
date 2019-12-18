<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
// import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  // mixins: [ResizeMixin],
  computed: {
    ...mapGetters({
      opened: 'app/getOpened',
      withoutAnimation: 'app/getWithoutAnimation',
      device: 'app/getDevice',
      needTagsView: 'settings/getTagsView',
      fixedHeader: 'settings/getFixedHeader'
    }),
    classObj () {
      return {
        hideSidebar: !this.opened,
        openSidebar: this.opened,
        withoutAnimation: this.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/setOpened', { type: 'CLOSE' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixin.scss';
@import '~@/assets/scss/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
