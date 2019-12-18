<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他标签</li>
      <li @click="closeAllTags(selectedTag)">关闭全部标签</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import Routes from '@conf/routes.js'
export default {
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews () {
      return this.$store.getters['tagsView/getVisitedViews']
    },
    cachedViews () {
      return this.$store.getters['tagsView.getCachedViews']
    }
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path
    },
    filterAffixTags (routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = route.path
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags () {
      const affixTags = (this.affixTags = this.filterAffixTags(Routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          // this.$store.dispatch('tagsView/addVisitedView', tag)
          this.$store.dispatch('tagsView/setView', { view: tag, type: 'ADD' })
        }
      }
    },
    addTags () {
      const { name } = this.$route
      if (name) {
        // this.$store.dispatch('tagsView/addView', this.$route)
        this.$store.dispatch('tagsView/setView', {
          view: this.$route,
          type: 'ADD'
        })
      }
      return false
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              // this.$store.dispatch('tagsView/updateVisitedView', this.$route)
              this.$store.dispatch('tagsView/setView', {
                view: this.$route,
                type: 'UPDATE'
              })
            }
            break
          }
        }
      })
    },
    refreshSelectedTag (view) {
      // this.$store.dispatch('tagsView/delCachedView', view)
      this.$store.dispatch('tagsView/setView', {
        view,
        type: 'DEL'
      })
      setTimeout(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: fullPath
          })
        })
      }, 60)
    },
    closeSelectedTag (view) {
      this.$store.dispatch('tagsView/setView', {
        type: 'DEL',
        view
      })
      setTimeout(() => {
        if (this.isActive(view)) {
          this.toLastView(this.visitedViews, view)
        }
      }, 60)
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/setView', {
        view: this.selectedTag,
        type: 'DEL_OTHER'
      })

      setTimeout(() => {
        this.moveToCurrentTag()
      }, 60)
    },
    closeAllTags (view) {
      this.$store.dispatch('tagsView/setView', { type: 'DEL_ALL' })
      setTimeout(() => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(this.visitedViews, view)
      }, 60)
    },
    toLastView (visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
